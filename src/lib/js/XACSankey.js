class XACSankey extends HTMLElement {
    #shadow;

    constructor() {
        super();
        this.classes = {
            style: 'xac-style'
        }
        this.filters = {}
        this.dataCallback = null
        this.api = {
            url: 'https://entity-api.dev.sennetconsortium.org/datasets/sankey_data',
            token: null
        }
        this.containerDimensions = {}
        this.graphData = null
        this.loading = false
        this.validFilterMap = {
            group_name: 'dataset_group_name',
            dataset_type: 'dataset_dataset_type',
            organ: 'organ_type',
            status: 'dataset_status'
        }
        this.handleOptions()
        if (this.ops?.useShadow) {
            this.#shadow = this.attachShadow({ mode: "open" })
            this.applyStyles()
        }
        this.fetchData()
    }

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
        this.#shadow.appendChild(s)
    }

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

    setOptions(ops) {
        this.filters = ops.filters || this.filters
        this.api = ops.api || this.api
        this.dataCallback = ops.dataCallback || this.dataCallback
        this.validFilterMap = ops.validFilterMap || this.validFilterMap
        this.d3 = ops.d3 || this.d3
        if (ops.styleSheetPath) {
            this.styleSheetPath = ops.styleSheetPath
            this.#shadow?.querySelector(`.${this.classes.style}`)?.remove()
            this.applyStyles()
        }
        this.useEffect()
    }

    /**
     * Modifies the component attr so that attributeChangedCallback can be triggered
     * @param attr
     */
    useEffect(attr = 'data') {
        this.setAttribute(attr, `${Date.now()}`)
    }

    getValidFilters() {
        // converts the filter from the URL to the field names returned from the sankey endpoint
        // also splits comma separated filter values into an array
        return Object.keys(this.filters).reduce((acc, key) => {
            if (this.validFilterMap[key.toLowerCase()] !== undefined) {
                acc[this.validFilterMap[key].toLowerCase()] = this.filters[key].split(',')
            }
            return acc
        }, {})
    }

    async fetchData() {
        // call the sankey endpoint
        const res = await fetch(this.api.url, this.getHeaders())
        let data = await res.json()

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

        // group the data into nodes and links
        const columnNames = Object.values(this.validFilterMap)
        const newGraph = {nodes: [], links: []}
        filteredData.forEach((row) => {
            columnNames.forEach((columnName, columnIndex) => {
                if (columnIndex !== columnNames.length - 1) {
                    let found = newGraph.nodes.find((found) => found.column === columnIndex && found.name === row[columnNames[columnIndex]])
                    if (found === undefined) {
                        found = {node: newGraph.nodes.length, name: row[columnName], column: columnIndex}
                        newGraph.nodes.push(found)
                    }

                    let found2 = newGraph.nodes.find((found2) => found2.column === columnIndex + 1 && found2.name === row[columnNames[columnIndex + 1]])
                    if (found2 === undefined) {
                        found2 = {
                            node: newGraph.nodes.length,
                            name: row[columnNames[columnIndex + 1]],
                            column: columnIndex + 1
                        }
                        newGraph.nodes.push(found2)
                    }

                    let found3 = newGraph.links.find((found3) => found3.source === found.node && found3.target === found2.node)
                    if (found3 === undefined) {
                        found3 = {source: found.node, target: found2.node, value: 0}
                        newGraph.links.push(found3)
                    }
                    found3.value = found3.value + 1
                }
            })
        })

        this.loading = false;
        this.graphData = newGraph;
        this.useEffect('fetch')
    }

    handleWindowResize(){
        this.containerDimensions.width = this.clientWidth
        this.containerDimensions.height = Math.max(this.clientHeight, 1080)
    }

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
                d3.select(this).raise()
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
            .attr('class', 'c-sankey__node')
            .attr('transform', (d) => `translate(${d.x0},${d.y0})`)
            .call(drag)

        node.append('rect')
            .attr('height', (d) => Math.max(5, d.y1 - d.y0))
            .attr('width', sankey.nodeWidth())
            .attr('fill', (d) => color(d.name))
            .attr('stroke-width', 0)
            .append('title')
            .text((d) => `${d.name}\n${d.value} Datasets`) // Tooltip

        node.append('text')
            .attr('x', -6)
            .attr('y', (d) => (d.y1 - d.y0) / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'end')
            .text((d) => d.name)
            .filter((d) => d.x0 < width / 2)
            .attr('x', 6 + sankey.nodeWidth())
            .attr('text-anchor', 'start')
    }

    onWindowResize() {
        this.handleWindowResize()
        this.useEffect('options')
    }

    connectedCallback() {
        this.handleWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
    }

    static get observedAttributes() {
        return ['data', 'fetch', 'options']
    }

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
     *
     * @param property
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback(property, oldValue, newValue) {
        this.log(`XACSankey.attributeChangedCallback: ${property} ${newValue}`)
        if (oldValue === newValue) return;


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

    static isLocal() {
        return (location.host.indexOf('localhost') !== -1) || (location.host.indexOf('.dev') !== -1)
    }

    static log(msg, ops) {
        ops = ops || {}
        let {fn, color, data} = ops
        fn = fn || 'log'
        color = color || '#bada55'
        data = data || ''
        if (XACSankey.isLocal()) {
            console[fn](`%c ${msg}`, `background: #222; color: ${color}`, data)
        }
    }

    log(msg, fn = 'log') {
        XACSankey.log(msg, {fn})
    }
}

customElements.define('xac-sankey', XACSankey)

export default  XACSankey