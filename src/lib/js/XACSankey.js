import SankeyAdapter from "./adapters/SankeyAdapter.js"

class XACSankey extends HTMLElement {
    #shadow;

    constructor() {
        super();
        this.classes = {
            style: 'xac-style',
            loader: 'xac-loader'
        }
        this.filters = {}
        this.dataCallback = null
        this.organsDict = {}
        this.organsDictByCategory = {}
        this.api = {
            sankey: 'https://entity.api.sennetconsortium.org/datasets/sankey_data',
            token: null,
            ubkg: {
                sap: 'sennet',
                organs: 'https://ontology.api.hubmapconsortium.org/organs?application_context='
            }
        }
        this.containerDimensions = {}
        this.graphData = null
        this.isLoading = true
        this.groupByOrganCategoryKey = 'rui_code'
        this.validFilterMap = {
            group_name: 'dataset_group_name',
            dataset_type: 'dataset_dataset_type',
            organ: 'organ_type',
            status: 'dataset_status'
        }
        this.loading = {
            html: '<div class="c-sankey__loader"></div>',
            callback: null
        }
        this.handleOptions()
        if (this.ops?.useShadow) {
            this.#shadow = this.attachShadow({ mode: "open" })
            this.applyStyles()
        }
        this.fetchData()
    }

    /**
     * Sets the organTypes from UBKG.
     * @returns {Promise<void>}
     */
    async setOrganTypes() {
        const res = await fetch(this.api.ubkg.organs + this.api.ubkg.sap);
        const organs = await res.json()
        for (let o of organs) {
            this.organsDict[o.term.trim().toLowerCase()] = o.category?.term?.trim() || o.term?.trim()

            const cat = o.category?.term?.trim() || o.term.trim()
            this.organsDictByCategory[cat] = this.organsDictByCategory[cat] || new Set()
            this.organsDictByCategory[cat].add(o[this.groupByOrganCategoryKey]?.trim())
        }
    }

    /**
     * Gets corresponding organ category from organ type. Example Lung (Left) -> Lung.
     * @param {string} str The organ type
     * @returns {string|*}
     */
    getOrganHierarchy(str) {
        if (!str) return str
        let res = this.organsDict[str.trim().toLowerCase()]
        // fallback incase of missing unkg data
        if (!res) {
            const r = new RegExp(/.+?(?=\()/)
            res = str.match(r)
            return res && res.length ? res[0].trim() : str
        }
        return res
    }

    /**
     * Appends stylesheet to exposed shadow dom.
     */
    applyStyles() {
        if (!this.styleSheetPath) {
            console.warn('XACSankey.applyStyles No stylesheet provided.')
            return
        }
        let s = document.createElement('link')
        s.className = this.classes.style
        s.type = 'text/css';
        s.rel = 'stylesheet';
        s.href = this.styleSheetPath
        this.#shadow?.appendChild(s)
    }

    /**
     * Retrieves options set via the element's options attr.
     */
    handleOptions() {
        this.ops = this.getAttribute('options')
        if (this.ops) {
            try {
                this.ops = JSON.parse(atob(this.ops))
                this.setOptions(this.ops)
            } catch (e) {
                console.error('XACSankey', e)
            }
        } else {
            this.ops = {}
        }
    }

    /**
     * Returns request headers.
     * @returns {{headers: {"Content-Type": string}}}
     */
    getHeaders() {
        let h = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (this.api.token) {
            h.headers.Authorization = `Bearer ${this.api.token}`
        }
        return h
    }

    /**
     * Removes null values from obj.
     * @param obj
     */
    purgeObject(obj) {
        for (let i in obj) {
            if (obj[i] === null) {
                delete obj[i]
            }
        }
    }

    /**
     * Sets options to this instance.
     * @param {object} ops
     */
    setOptions(ops) {
        if (ops.filters) {
            this.filters = ops.filters
            this.purgeObject(this.filters)
        }
        this.groupByOrganCategoryKey = ops.groupByOrganCategoryKey || this.groupByOrganCategoryKey

        if (ops.loading) {
            Object.assign(this.loading, ops.loading)
        }
        if (ops.api) {
            Object.assign(this.api, ops.api)
        }
        if (ops.dataCallback) {
            this.dataCallback = ops.dataCallback
        }
        if (ops.onNodeClickCallback) {
            this.onNodeClickCallback = ops.onNodeClickCallback
        }
        if (ops.onLabelClickCallback) {
            this.onLabelClickCallback = ops.onLabelClickCallback
        }
        if (ops.validFilterMap) {
            Object.assign(this.validFilterMap, ops.validFilterMap)
            this.purgeObject(this.validFilterMap)
        }
        if (ops.d3) {
            this.d3 = ops.d3
        }
        if (ops.styleSheetPath) {
            this.styleSheetPath = ops.styleSheetPath
            this.#shadow?.querySelector(`.${this.classes.style}`)?.remove()
            this.applyStyles()
        }
        this.useEffect()
    }

    /**
     * Modifies the component attr so that attributeChangedCallback can be triggered.
     * @param {string} attr Name of a watche attribute.
     */
    useEffect(attr = 'data') {
        this.setAttribute(attr, `${Date.now()}`)
    }

    /**
     * Converts the filter from the URL to the field names returned from the sankey endpoint.
     * Also splits comma separated filter values into an array.
     * @returns {{}}
     */
    getValidFilters() {

        return Object.keys(this.filters).reduce((acc, key) => {
            if (this.validFilterMap[key.toLowerCase()] !== undefined) {
                acc[this.validFilterMap[key].toLowerCase()] = this.filters[key].split(',')
            }
            return acc
        }, {})
    }

    /**
     * Gets and handles main sankey data to be visualized.
     * @returns {Promise<void>}
     */
    async fetchData() {
        if (this.validFilterMap.organ && !Object.keys(this.organsDict).length) {
            await this.setOrganTypes()
        }

        // call the sankey endpoint
        const res = await fetch(this.api.sankey, this.getHeaders())
        this.rawData = await res.json()

        let data = []
        if (this.validFilterMap.organ) {
            for (let row of this.rawData) {
                let groups = new Set()
                for (let g of row[this.validFilterMap.organ]) {
                    groups.add(this.getOrganHierarchy(g))
                }
                data.push({...row, [this.validFilterMap.organ]: Array.from(groups)})
            }
        }
        
        if (this.dataCallback) {
            data = data.map(this.dataCallback)
        }

        // filter the data if there are valid filters
        const validFilters = this.getValidFilters()
        let filteredData = data
        if (Object.keys(validFilters).length > 0) {
            // Filter the data based on the valid filters
            filteredData = data.filter((row) => {
                // this acts as an AND filter
                for (const [field, validValues] of Object.entries(validFilters)) {
                    if (!validValues.includes(row[field].toLowerCase())) {
                        return false
                    }
                }
                return true
            })
        }

        XACSankey.log('filteredData', {data: filteredData, color: 'orange'})

        const columnNames = Object.values(this.validFilterMap)
        const graphMap = {nodes: {}, links: {}}
        let i = 0;

        // First build the nodes using a dictionary for faster access time
        filteredData.forEach((row, rowIndex) => {
            columnNames.forEach((columnName, columnIndex) => {
                const buildNode = (colName, val) => {
                    let node = graphMap.nodes[val]
                    if (node === undefined) {
                        graphMap.nodes[val] = {node: i, name: val, columnName: colName, columnIndex, weight: 0}
                        node = graphMap.nodes[val]
                        i++
                    }
                    node.weight = node.weight + 1
                }
                if (Array.isArray(row[columnName])) {
                    for (let v of row[columnName]) {
                        buildNode(columnName, v)
                    }
                } else {
                    buildNode(columnName, row[columnName])
                }
            })
        })

        filteredData.forEach((row) => {
            columnNames.forEach((columnName, columnIndex) => {
                if (columnIndex !== columnNames.length - 1) {

                    const buildLink = (source, target) => {
                        const key = `${source.name}_${target.name}`
                        // Find a link O(1)
                        let link = graphMap.links[key]
                        if (link === undefined) {
                            graphMap.links[key] = {source: source.node, target: target.node, value: 0}
                            link = graphMap.links[key]
                        }
                        link.value = link.value + 1
                    }

                    let sources = []
                    let targets = []
                    const setSourcesTargets = (bucket, current) => {
                        if (Array.isArray(current)) {
                            for (let v of current) {
                                bucket.push(graphMap.nodes[v])
                            }
                        } else {
                            bucket.push(graphMap.nodes[current])
                        }
                    }

                    setSourcesTargets(sources, row[columnName])
                    setSourcesTargets(targets, row[columnNames[columnIndex + 1]])

                    if (sources.length > 1) {
                        for (let t of targets) {
                            buildLink(sources[0], t)
                        }
                    } else {
                        for (let s of sources) {
                            for (let t of targets) {
                                buildLink(s, t)
                            }
                        }
                    }

                }
            })
        })

        XACSankey.log('graphMap', {data: graphMap, color: 'green'})

        this.graphData = {nodes: Object.values(graphMap.nodes), links: Object.values(graphMap.links)};
        this.useEffect('fetch')
    }

    /**
     * Grabs client size info.
     */
    handleWindowResize() {
        this.containerDimensions.width = this.clientWidth
        this.containerDimensions.height = Math.max(this.clientHeight, 1080)
    }

    /**
     * Builds the visualization.
     */
    buildGraph() {
        if (!this.d3) {
            console.error('No D3 library loaded.')
        }
        if (!this.graphData || !this.containerDimensions.width || !this.containerDimensions.height || !this.d3) return
        const {d3, d3sankey, sankeyLinkHorizontal} = {...this.d3}


        // svg dimensions
        const margin = { top: 20, right: 20, bottom: 20, left: 20 }
        const width = this.containerDimensions.width - margin.left - margin.right
        const height = this.containerDimensions.height - margin.top - margin.bottom

        const color = d3.scaleOrdinal(d3.schemeCategory10)

        // Layout the svg element
        const container = this.ops.useShadow ? d3.select(this.#shadow) : d3.select(this.#shadow)
        const svg = container.append('svg').attr('width', width).attr('height', height).attr('transform', `translate(${margin.left},${margin.top})`)

        // Set up the Sankey generator
        const sankey = d3sankey()
            .nodeWidth(30)
            .nodePadding(15)
            .extent([
                [0, margin.top],
                [width, height - margin.bottom]
            ])

        // Create the Sankey layout
        const { nodes, links } = sankey({
            nodes: this.graphData.nodes.map((d) => Object.assign({}, d)),
            links: this.graphData.links.map((d) => Object.assign({}, d))
        })

        // Define the drag behavior
        const drag = d3
            .drag()
            .on('start', function (event, d) {
                d3.select(this).classed("dragging", true)
                d.dragging = {
                    offsetX: event.x - d.x0,
                    offsetY: event.y - d.y0
                }
            })
            .on('drag', function (event, d) {
                d.x0 = Math.max(0, Math.min(width - d.x1 + d.x0, event.x - d.dragging.offsetX))
                d.y0 = Math.max(0, Math.min(height - d.y1 + d.y0, event.y - d.dragging.offsetY))
                d.x1 = d.x0 + sankey.nodeWidth()
                d.y1 = d.y0 + (d.y1 - d.y0)
                d3.select(this).attr('transform', `translate(${d.x0},${d.y0})`)
                svg.selectAll('.c-sankey__link').attr('d', sankeyLinkHorizontal())
                sankey.update({ nodes, links })
                link.attr('d', sankeyLinkHorizontal())
            })
            .on('end', function (event, d) {
                delete d.dragging
            })

        // Links
        const link = svg
            .append('g')
            .selectAll('.link')
            .data(links)
            .join('path')
            .attr('class', 'c-sankey__link')
            .attr('d', sankeyLinkHorizontal())
            .attr('stroke-width', (d) => Math.max(2, d.width))
            .append('title')
            .text((d) => `${d.source.name} → ${d.target.name}\n${d.value} Datasets`) // Tooltip

        // Nodes
        const node = svg
            .append('g')
            .selectAll('.node')
            .data(nodes)
            .join('g')
            .attr('class', (d) => `c-sankey__node c-sankey__node--${d.columnName}`)
            .attr('transform', (d) => `translate(${d.x0},${d.y0})`)
            .call(drag)
            .on('click', ((e, d) => {
                if (e.defaultPrevented) return;
                if (this.onNodeClickCallback) {
                    this.onNodeClickCallback(e, d)
                }
            }).bind(this))

        node.append('rect')
            .attr('height', (d) => Math.max(5, d.y1 - d.y0))
            .attr('width', sankey.nodeWidth())
            .attr('fill', (d) => color(d.name))
            .attr('stroke-width', 0)
            .append('title')
            .text((d) => `${d.name}\n${d.value} Datasets`) // Tooltip

        node.append('text')
            .attr('class', 'c-sankey__label')
            .attr('x', -6)
            .attr('y', (d) => (d.y1 - d.y0) / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'end')
            .text((d) => d.name)
            .filter((d) => d.x0 < width / 2)
            .attr('x', 6 + sankey.nodeWidth())
            .attr('text-anchor', 'start')
            .on('click', ((e, d) => {
                if (e.defaultPrevented) return;
                if (this.onLabelClickCallback) {
                    this.onLabelClickCallback(e, d)
                }
            }).bind(this))

        node.append('text')
            .attr('class', 'c-sankey__value')
            .attr('y', sankey.nodeWidth()/1.9)
            .attr('x', (d) => ((d.y1 - d.y0) / 2) * -1)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'middle')
            .text((d) => Math.max(5, d.y1 - d.y0) > 15 ? d.weight : '')
            .on('click', ((e, d) => {
                if (e.defaultPrevented) return;
                if (this.onNodeClickCallback) {
                    this.onNodeClickCallback(e, d)
                }
            }).bind(this))

        this.isLoading = false;
        this.useEffect('graph')
    }

    /**
     * Callback for handling window resize.
     */
    onWindowResize() {
        this.handleWindowResize()
        this.useEffect('options')
    }

    /**
     * Runs when the element is connected to the DOM.
     */
    connectedCallback() {
        this.handleWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
    }

    /**
     * Determines which attributes to watch for triggering change notifications to attributeChangedCallback.
     * @returns {string[]}
     */
    static get observedAttributes() {
        return ['data', 'fetch', 'options', 'graph']
    }

    /**
     * Clears viewport of svgs.
     */
    clearCanvas() {
        if (this.ops.useShadow) {
            const l = this.#shadow.querySelectorAll('svg')
            l.forEach((el)=> {
                el.remove()
            })
        } else {
            this.innerHTML = ''
        }
    }

    /**
     * Displays or removes loading spinner.
     */
    handleLoader() {
        const ctx = this.ops.useShadow ? this.#shadow : this
        ctx.querySelectorAll(`.${this.classes.loader}`).forEach(
            (el) => {
                el.remove()
            }
        )
        if (this.isLoading) {
            if (!this.loading.callback) {
                const loader = document.createElement("div")
                loader.innerHTML = this.loading.html
                loader.className = this.classes.loader
                ctx.appendChild(loader)
            } else {
                this.loading.callback(this)
            }
        }
    }

    /**
     * Invoked when one of the custom element's attributes is added, removed, or changed.
     * @param property
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback(property, oldValue, newValue) {
        this.log(`XACSankey.attributeChangedCallback: ${property} ${newValue}`)
        if (oldValue === newValue) return;
        this.handleLoader()

        if (property !== 'graph') {
            if (property === 'data') {
                this.fetchData().then((()=> {
                    this.clearCanvas()
                    this.buildGraph()
                }).bind(this))
            } else {
                this.clearCanvas()
                this.buildGraph()
            }
        }
    }

    /**
     * Flips an obj on its keys.
     * Example: Given {a: b} -> {b: a}
     * @param obj
     * @returns {{}}
     */
    flipObj(obj) {
        return Object.keys(obj).reduce((ret, key) => {
            ret[obj[key]] = key;
            return ret;
        }, {})
    }

    /**
     * Checks if running in local or dev env
     * @returns {boolean}
     */
    static isLocal() {
        SankeyAdapter.isLocal()
    }

    /**
     * Logs message to screen
     * @param {string} msg The message to display
     * @param {object} ops Color options for console
     */
    static log(msg, ops) {
        SankeyAdapter.log(msg, ops)
    }

    /**
     *  Logs message to screen.
     * @param {string} msg The message to display
     * @param {string} fn The type of message {log|warn|error}
     */
    log(msg, fn = 'log') {
        XACSankey.log(msg, {fn})
    }
}

customElements.define('xac-sankey', XACSankey)

export default  XACSankey