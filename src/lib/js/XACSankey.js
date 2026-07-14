import Util from "./util/Util.js"
import Palette from "./util/Palette.js"

class XACSankey extends HTMLElement {
    #shadow;

    constructor() {
        super();
        this.classes = {
            style: 'xac-style',
            loader: 'xac-loader'
        }
        if (XACSankey.isLocal()) {
            console.log('XACSankey', this)
        }
        this.filters = {}
        this.useShadow = true
        this.dataCallback = null
        this.organsDict = {}
        this.organsDictByCategory = {}
        this.api = {
            context: 'sennet',
            sankey: 'https://ingest.api.{context}consortium.org/datasets/sankey_data',
            token: null,
            ubkgOrgans: 'https://ontology.api.hubmapconsortium.org/organs?application_context='
        }
        this.containerDimensions = {}
        this.graphData = null
        this.isLoading = true
        this.groupByOrganCategoryKey = 'organ_uberon'
        this.displayableFilterMap = {}
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
        this.dimensions = {
            breakpoint: 922,
            mobileMaxWidth: 1200,
            desktopMaxHeight: 1080
        }
        this.reorderableColumns = true
        this.hideableColumns = true
    }

    init() {
        this.handleOptions()
        if (this.useShadow) {
            this.#shadow = this.attachShadow({ mode: "open" })
            this.applyStyles()
        }
        this.getUbkgColorPalettes()
        if (this.startUpOnOptions === undefined) {
          this.fetchData()  
        }
    }

    async getUbkgColorPalettes() {
        const response = await fetch(`https://x-atlas-consortia.github.io/ubkg-palettes/${this.api.context}/palettes.json`)
        this.ubkgColorPalettes = await response.json()
    }

    /**
     * Return various color palettes
     * @returns {{blueGrey: string[], pink: string[], green: string[], yellow: string[]}}
     */
    getColorPalettes() {
        return {
            blueGrey: Palette.blueGreyColors,
            pink: Palette.pinkColors,
            green: Palette.greenColors,
            yellow: Palette.yellowColors
        }
    }

    /**
     * Sets a color theme for sankey rect bars
     * @param {object} theme
     */
    setTheme(theme = {}) {
        const d3 = this.d3.d3
        this.theme = {
            byScheme: {
                group_name: d3.scaleOrdinal(Palette.blueGreyColors),
                dataset_type: d3.scaleOrdinal(Palette.greenColors),
                organ: d3.scaleOrdinal(Palette.pinkColors),
                source_type: d3.scaleOrdinal(Palette.yellowColors),
            },
            byValues: {
                human: Palette.yellowColors[0],
                mouse: Palette.yellowColors[1],
                ...Palette.statusColorMap
            }
        }

        if (theme.palettes) {
            for (let p in theme.palettes) {
                this.theme.byScheme[p] = d3.scaleOrdinal(theme.palettes[p])
            }
        }

        Object.assign(this.theme, theme)
        this.purgeObject(this.theme)
    }

    /**
     * Sets the organTypes from UBKG.
     * @returns {Promise<void>}
     */
    async setOrganTypes() {
        const res = await fetch(this.api.ubkgOrgans + this.api.context);
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
     * @param {object} obj The object to perform the purge against
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
        if (XACSankey.isLocal()) {
            console.log('XACSankey', ops)
        }
        if (ops.filters) {
            this.filters = ops.filters
            this.purgeObject(this.filters)
        }
        this.groupByOrganCategoryKey = ops.groupByOrganCategoryKey || this.groupByOrganCategoryKey

        if (ops.loading) {
            Object.assign(this.loading, ops.loading)
        }
        if (ops.dimensions) {
            Object.assign(this.dimensions, ops.dimensions)
        }
        if (ops.api) {
            Object.assign(this.api, ops.api)
        }
        if (ops.startUpOnOptions !== undefined) {
            this.startUpOnOptions = ops.startUpOnOptions
        }
        if (ops.useShadow) {
            this.useShadow = ops.useShadow
        }
        if (ops.dataCallback) {
            this.dataCallback = ops.dataCallback
        }
        if (ops.propertyDisplayNames) {
            this.propertyDisplayNames = ops.propertyDisplayNames
        }
        if (ops.reorderableColumns) {
            this.reorderableColumns = ops.reorderableColumns
        }
        if (ops.hideableColumns) {
            this.hideableColumns = ops.hideableColumns
        }
        if (ops.onDataBuildCallback) {
            this.onDataBuildCallback = ops.onDataBuildCallback
        }
        if (ops.onSvgBuildCallback) {
            this.onSvgBuildCallback = ops.onSvgBuildCallback
        }
        if (ops.onNodeClickCallback) {
            this.onNodeClickCallback = ops.onNodeClickCallback
        }
        if (ops.onNodeBuildCssCallback) {
            this.onNodeBuildCssCallback = ops.onNodeBuildCssCallback
        }
        if (ops.onLinkBuildCssCallback) {
            this.onLinkBuildCssCallback = ops.onLinkBuildCssCallback
        }
        if (ops.onLabelClickCallback) {
            this.onLabelClickCallback = ops.onLabelClickCallback
        }
        if (ops.onLinkClickCallback) {
            this.onLinkClickCallback = ops.onLinkClickCallback
        }
        if (ops.validFilterMap) {
            if (ops.overwriteColumns) {
                this.validFilterMap = ops.validFilterMap
            } else {
                Object.assign(this.validFilterMap, ops.validFilterMap)
            }

            this.purgeObject(this.validFilterMap)
        }
        if (ops.displayableFilterMap) {
            Object.assign(this.displayableFilterMap, this.validFilterMap)
            Object.assign(this.displayableFilterMap, ops.displayableFilterMap)
            this.purgeObject(this.displayableFilterMap)
            this.backupDisplayableFilterMap = JSON.parse(JSON.stringify(this.displayableFilterMap))
        }
        if (ops.d3) {
            this.d3 = ops.d3
        }
        if(ops.theme) {
            this.setTheme(ops.theme)
        }
        if (ops.styleSheetPath) {
            this.styleSheetPath = ops.styleSheetPath
            this.#shadow?.querySelector(`.${this.classes.style}`)?.remove()
            this.applyStyles()
        }
        if (this.startUpOnOptions) {
           this.useEffect() 
        }
    }

    /**
     * Modifies the component attr so that attributeChangedCallback can be triggered.
     * @param {string} attr Name of a watched attribute.
     */
    useEffect(attr = 'data') {
        this.setAttribute(attr, `${Date.now()}`)
    }

    /**
     * Converts the filter from the URL to the field names returned from the sankey endpoint.
     * Also splits comma separated filter values into an array.
     * @returns {{}}
     */
    getValidFilters(filterMap) {

        return Object.keys(this.filters).reduce((acc, key) => {
            if (filterMap[key.toLowerCase()] !== undefined) {
                acc[filterMap[key].toLowerCase()] = this.filters[key].split(',')
            }
            return acc
        }, {})
    }

    getUrl() {
        if (this.ops.api?.sankey) return this.ops.api?.sankey
        let url = this.api.sankey
        url = url.replace('{context}', this.api.context)
        return Util.isLocal() && !this.ops.isProd ? url.replace('.api.', '-api.dev.') : url
    }

    /**
     * Filters the data based on the provided filter map.
     * @param {Array} data The data to filter.
     * @param {Object} filterMap The filter map.
     * @returns {Array} The filtered data.
     */
    filterData(data, filterMap) {
        // filter the data if there are valid filters
        const validFilters = this.getValidFilters(filterMap)
        this.filteredData = data

        if (Object.keys(validFilters).length > 0) {
            const isValidFilter = (validValues, val)=> !(!validValues.includes(val.toLowerCase()))
            let validRows
            let points = 0
            // Filter the data based on the valid filters
            this.filteredData = data.filter((row) => {
                validRows = []
                points = 0;
                for (const [field, validValues] of Object.entries(validFilters)) {

                    if (Array.isArray(row[field])) {
                        // find out which values in array are valid
                        for (let i = 0; i < row[field].length; i++) {
                            if (isValidFilter(validValues, row[field][i])) {
                                validRows.push(row[field][i])
                            }
                        }
                        // take valid values and readjust the row[field]
                        if (validRows.length) {
                            row[field] = []
                            for (let i = 0; i < validRows.length; i++) {
                                row[field].push(validRows[i])
                            }
                            points++;
                        }

                    } else {
                        if (isValidFilter(validValues, row[field])) {
                            points++
                        }
                    }
                }
                return Object.keys(validFilters).length === points
            })
        }

        XACSankey.log('filteredData', {data: this.filteredData, color: 'orange'})

    }

    /**
     * Adds tools for reordering and hiding columns to the data.
     */
    handleTools() {
        const hasColumnsToShow = Object.values(this.displayableFilterMap).length > 0

        const reorderableColumns = {}
        if (hasColumnsToShow && this.reorderableColumns) {
            for (const [field, dataFieldName] of Object.entries(this.displayableFilterMap)) {
                reorderableColumns[dataFieldName] = `drag-${field}`
            }
            this.filteredData = [reorderableColumns, ...this.filteredData]
        }
        const hideableColumns = {}
        if (hasColumnsToShow && this.hideableColumns) {
            for (const [field, dataFieldName] of Object.entries(this.displayableFilterMap)) {
                hideableColumns[dataFieldName] = `hide-${field}`
            }
            this.filteredData.push(hideableColumns)
        } 
    }

    
    /**
     * Gets and handles main sankey data to be visualized.
     *
     * @async
     * @param {boolean} [shouldFetch=true] 
     * @returns {*} 
     */
    async fetchData(shouldFetch = true) {
        if (this.validFilterMap.organ && !Object.keys(this.organsDict).length) {
            await this.setOrganTypes()
        }

        if (shouldFetch) {
            // call the sankey endpoint
            const res = await fetch(this.getUrl(), this.getHeaders())
            this.rawData = await res.json()

            if (this.rawData.message || res.status === 202) {
                this.handleLoader(this.rawData.message)
                return
            }
        }

        // Check if actual data has data property
        if (Array.isArray(this.rawData?.data)) {
            this.rawData = this.rawData.data
        }

        if (!Array.isArray(this.rawData)) {
            console.error('XACSankey > Incorrectly formatted data. Data must be in array of dictionaries')
            return
        }

        let data = []
        if (this.validFilterMap.organ) {
            for (let row of this.rawData) {
                if (Array.isArray(row[this.validFilterMap.organ])) {
                    let groups = new Set()
                    for (let g of row[this.validFilterMap.organ]) {
                        groups.add(this.getOrganHierarchy(g))
                    }
                    data.push({...row, [this.validFilterMap.organ]: Array.from(groups)})
                } else {
                    data.push({...row, [this.validFilterMap.organ]: this.getOrganHierarchy(row[this.validFilterMap.organ])})
                }
                
            }
        } else {
            data = [...this.rawData]
        }
        
        if (this.dataCallback) {
            data = data.map(this.dataCallback)
        }

        this.filterData(data, this.validFilterMap)
        let columnsToShow = this.validFilterMap

        if (Object.keys(this.displayableFilterMap).length) {
            columnsToShow = this.displayableFilterMap
            this.handleTools()
        }

        const columnNames = Object.values(columnsToShow)
        const graphMap = {nodes: {}, links: {}}
        let i = 0;

        // First build the nodes using a dictionary for faster access time
        this.filteredData.forEach((row, rowIndex) => {
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

        this.filteredData.forEach((row) => {
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

                    // Because we can have data values that are arrays with strings, we could end up with many
                    // sources & targets on a particular row/column.
                    // So we need to put these in buckets to later create the links
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

                    for (let s of sources) {
                        for (let t of targets) {
                            buildLink(s, t)
                        }
                    }

                }
            })
        })

        XACSankey.log('graphMap', {data: graphMap, color: 'green'})

        this.graphData = {nodes: Object.values(graphMap.nodes), links: Object.values(graphMap.links)};
        if (this.onDataBuildCallback) {
            this.onDataBuildCallback(this)
        }

        if (Object.values(graphMap.nodes).length) {
            this.useEffect('fetch')
        } else {
            this.isLoading = false;
            this.handleLoader('No data from filters')
        }
    }

    /**
     * Grabs client size info.
     */
    handleWindowResize() {
        if (this.clientWidth < this.dimensions.breakpoint) {
            this.containerDimensions.width = this.dimensions.mobileMaxWidth
        } else {
            this.containerDimensions.width = this.clientWidth
        }
        this.containerDimensions.height = this.dimensions.desktopMaxHeight || this.clientHeight
    }

    /**
     * Returns the shadow container
     * @returns {*}
     */
    getContainer() {
        return this.useShadow ? this.d3.d3.select(this.#shadow) : this.d3.d3.select(this)
    }

    /**
     * Return a color hex for a given node value
     * @param d
     */
    getFromUbkgColorPalette(d) {
        const columns = {
            dataset_type: 'datasetTypes',
            organ: 'organs',
            group_name: 'groups'
        }
        const filterMap = this.flipObj(this.backupDisplayableFilterMap)
        const col = columns[filterMap[d.columnName]]
        if (col) {
            return this.ubkgColorPalettes[col] ? this.ubkgColorPalettes[col][d.name] : null
        }
    }
    addColumn(internalColumnName) {
        const columnName = this.backupDisplayableFilterMap[internalColumnName]
        this.validFilterMap[internalColumnName] = columnName
        this.displayableFilterMap[internalColumnName] = columnName
        delete this.hiddenColumns[internalColumnName]
        this.fetchData(false)
    }

    removeColumn(columnName) {
        if (Object.values(this.validFilterMap).length <= 2) return;
        const filterMap = this.flipObj(this.backupDisplayableFilterMap)
        const niceName = filterMap[columnName]
        delete this.validFilterMap[niceName]
        delete this.displayableFilterMap[niceName]
        this.hiddenColumns = {}
        for (const c in this.backupDisplayableFilterMap) {
            if (this.validFilterMap[c] === undefined) {
                this.hiddenColumns[c] = this.backupDisplayableFilterMap[c]
            }
        }
        XACSankey.log('removeColumn', {data: this.displayableFilterMap, color: 'purple'})
        this.fetchData(false)
    }

    rearrangeNodes(nodes) {
        // {actualPropertyName: niceName}
        const filterMap = this.flipObj(this.backupDisplayableFilterMap)
        const newArrangement = {}
       
        for (let n in nodes) {
            const col = filterMap[n]
            newArrangement[col] = n
        }

        XACSankey.log('rearrangeNodes', {data: newArrangement, color: 'purple'})
        
        this.validFilterMap = newArrangement
        this.displayableFilterMap = newArrangement
        this.fetchData(false)
    }

    getPropertyDisplayName(columnName) {
        const flipped = this.flipObj(this.backupDisplayableFilterMap)
        const defaultName = flipped[columnName]?.replace('_', ' ') + 's'
        return this.propertyDisplayNames && this.propertyDisplayNames[columnName] ? (this.propertyDisplayNames[columnName].plural || this.propertyDisplayNames[columnName]) : defaultName
        
    }
    
    /**
     * Return a formatted tooltip text
     *
     * @param {string} tool 
     * @param {string} columnName 
     * @param {string} text Tooltip text
     * @returns {string} 
     */
    getTooltipForTool(tool, columnName, text) {
        const action = tool.split('-')[0]
        const niceName = this.getPropertyDisplayName(columnName)
        const tooltip = text ? text.replace('{name}', niceName) : null
        return tooltip ? tooltip : (action === 'drag' ? `Drag to reorder ${niceName}` : `Click to hide ${niceName}`)
    }
    /**
     * Builds the visualization.
     */
    buildGraph() {
        if (!this.d3) {
            console.error('No D3 library loaded.')
        }
        if (!this.graphData || !this.graphData.nodes.length || !this.containerDimensions.width || !this.containerDimensions.height || !this.d3) return
        const {d3, d3sankey, sankeyLinkHorizontal} = {...this.d3}


        // svg dimensions
        const margin = { top: 20, right: 20, bottom: 40, left: 20 }
        const width = this.containerDimensions.width - margin.left - margin.right
        const height = this.containerDimensions.height - margin.top - margin.bottom

        const color = d3.scaleOrdinal(d3.schemeCategory10)

        // Layout the svg element
        const container = this.getContainer()
        const svg = container.append('svg').attr('width', width).attr('height', height).attr('transform', `translate(${margin.left},${margin.top})`)

        if (this.onSvgBuildCallback) {
            svg.attr('class', 'xac--is-loading')
        }

        const fillColor = (d) => {
            if (!_t.ops.disableUbkgColorPalettes) {
                const c = _t.getFromUbkgColorPalette(d)
                if (Util.isLocal()) {
                    Util.log(d.name, {color: c, data: c})
                }
                if (c) return c
            }
            const flipped = this.flipObj(this.backupDisplayableFilterMap)
            const column = flipped[d.columnName]
            if (_t.theme?.byValues && _t.theme.byValues[d.name?.toLowerCase()]) {
                const c = _t.theme.byValues[d.name?.toLowerCase()].split(':')
                return c[0]
            }
            if (_t.theme?.byScheme && _t.theme.byScheme[column]) {
                return _t.theme.byScheme[column](d.name)
            }
            return color(d.name)
        }

        // Set up the Sankey generator
        const sankey = d3sankey()
            .nodeWidth(30)
            .nodePadding(15)
            .extent([
                [0, margin.top],
                [width, height - margin.bottom]
            ])

        const isDrag = (name) => name?.indexOf('drag-') === 0
        const isHide = (name) => name?.indexOf('hide-') === 0
        const isTool = (name) => isDrag(name) || isHide(name)
        const transformsX0 = {}
        const transformsY0 = {}

        // Create the Sankey layout
        const { nodes, links } = sankey({
            nodes: this.graphData.nodes.map((d) => Object.assign({}, d)),
            links: this.graphData.links.map((d) => Object.assign({}, d))
        })

        const getSortedTransform = () => {
            return Object.fromEntries(
                Object.entries(transformsX0).sort((a, b) => a[1] - b[1])
            )
        }

        const _t = this
        const dy0 = (d) => isDrag(d.name) ? 0 : d.y0
        // count the user's hold on the edge of the visualization
        let dragCounter = 0
        // Define the drag behavior
        const drag = d3
            .drag()
            .on('start', function (event, d) {
                if (isHide(d.name)) {
                    return
                }
                dragCounter = 0
                d3.select(this).classed("dragging", true)
                d.dragging = {
                    offsetX: event.x - d.x0,
                    offsetY: event.y - dy0(d)
                }
            })
            .on('drag', function (event, d) {
                if (isHide(d.name)) return;
                d.x0 = Math.max(0, Math.min(width - d.x1 + d.x0, event.x - d.dragging.offsetX))
                d.y0 = Math.max(0, Math.min(height - d.y1 + dy0(d), event.y - d.dragging.offsetY))
                d.x1 = d.x0 + sankey.nodeWidth()
                d.y1 = dy0(d) + (d.y1 - dy0(d))
                const dx0 = d.x0
            
                // Move data columns along with drag tool
                if (isDrag(d.name)) {
                    svg.selectAll(`.c-sankey__node--${d.columnName}`).each(function(d) {
                        const container = d3.select(this);
                        if (!isTool(d.name)) {
                            container.attr('transform', `translate(${dx0},${dy0(d)})`)
                        }
                    })
                }

                // Find out if user is dragging to either edge of the visualization
                const dx0s = Object.values(getSortedTransform())
                if (dx0s[0] === dx0 || dx0s.pop() === dx0) {
                    dragCounter++
                } else {
                    // the user changed direction so reset the counter
                    dragCounter = 0
                }

                d3.select(this).attr('transform', `translate(${d.x0},${dy0(d)})`)
                svg.selectAll('.c-sankey__link').attr('d', sankeyLinkHorizontal())
                sankey.update({ nodes, links })
                link.attr('d', sankeyLinkHorizontal())
                
            })
            .on('end', function (event, d) {
                if (isDrag(d.name)) {
                    const dragThreshold = 5
                    const previousTransformX0 = JSON.parse(JSON.stringify(transformsX0))
                    const direction = d.x0 === 0 ? -dragThreshold : dragThreshold
                    // if the user has been holding the drag at the edge for more than or equal to the threshold, 
                    // then adjust the x position of the column so it takes the space of the current column at the edge
                    transformsX0[d.columnName] = dragCounter >= dragThreshold ? d.x0 + direction :  d.x0

                    const sortedAsc = getSortedTransform()
                    // if the keys are not in the same order, a change occured. Rearrange the nodes and rebuild
                    if (Object.keys(previousTransformX0) !== Object.keys(sortedAsc)) {
                        _t.rearrangeNodes(sortedAsc)
                    }
                }
                delete d.dragging
            })

        
        // Links
        const link = svg
            .append('g')
            .selectAll('.link')
            .data(links)
            .join('path')
            .attr('class', (d) => {
                const baseClassName = 'c-sankey__link'
                let classes = baseClassName
                if (isDrag(d.source.name)) {
                    classes += ` ${baseClassName}--drag`
                }
                if (isHide(d.source.name)) {
                    classes += ` ${baseClassName}--hide`
                }
                if (this.onLinkBuildCssCallback) {
                    classes = classes +' '+ this.onLinkBuildCssCallback(d)
                }
                return classes
            })
            .attr('d', sankeyLinkHorizontal())
            .attr('stroke-width', (d) => Math.max(2, d.width))
            .on('click', ((e, d) => {
                if (e.defaultPrevented) return;
                if (isTool(d.source.name) || isTool(d.target.name)) return;
                if (this.onLinkClickCallback) {
                    this.onLinkClickCallback(e, d)
                }
            }).bind(this))
            .append('title')
            .text((d) => `${d.source.name} → ${d.target.name}\n${d.value} Datasets`) // Tooltip

        
        // Nodes
        const node = svg
            .append('g')
            .selectAll('.node')
            .data(nodes)
            .join('g')
            .attr('class', (d) => {
                const baseClassName = 'c-sankey__node'
                let classes = `${baseClassName} ${baseClassName}--${d.columnName}`
                if (isDrag(d.name)) {
                    classes += ` ${baseClassName}--drag`
                }
                if (isHide(d.name)) {
                    classes += ` ${baseClassName}--hide`
                }
                if (this.onNodeBuildCssCallback && !isTool(d.name)) {
                    classes = classes +' '+ this.onNodeBuildCssCallback(d)
                }
                transformsX0[d.columnName] = d.x0
                transformsY0[d.columnName] = d.y0
                return classes
            })
            .attr('transform', (d) => `translate(${d.x0},${isDrag(d.name) ? 0 : d.y0})`)
            .call(drag)
            .on('click', ((e, d) => {
                if (e.defaultPrevented || isTool(d.name)) return;
                if (this.onNodeClickCallback) {
                    this.onNodeClickCallback(e, d)
                }
            }).bind(this))
        
        node.each(function(d) {
            // 'this' is the parent container (e.g., an SVG or a parent g)
            const container = d3.select(this);

            if (isTool(d.name)) {
                const tool = container.append('svg')
                    .attr('width', 28)
                    .attr('height', 28)
                    .attr('fill', "#8a8888")
                    .attr('viewBox', '0 0 16 16')

                    tool.append('title')
                    .text((d)=> _t.getTooltipForTool(d.name, d.columnName))

                if (isDrag(d.name)) {
                    tool.append('path')
                    .attr('d', 'M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2')
                }
                if (isHide(d.name) && Object.values(_t.validFilterMap).length > 2) {
                    container.on('click', (e, d) => {
                        _t.removeColumn(d.columnName)
                    })
                    tool.attr('width', 20)
                        .attr('height', 20)
                        .attr('fill', "#eee")
                        
                    tool.append('path')
                    .attr('d', 'M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z')
                    tool.append('path')
                    .attr('d', 'M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z')
                }
                
            } else {
                container.append('rect')
                    .attr('height', (d) => Math.max(5, d.y1 - d.y0))
                    .attr('width', sankey.nodeWidth())
                    .attr('fill', (d) => {
                        return fillColor(d)
                    })
                    .attr('stroke-width', 0)
                    .append('title')
                    .text((d) =>`${d.name}\n${d.weight} Datasets`) // Tooltip
            
                container.append('text')
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
                    }).bind(this));

                 container.append('text')
                    .attr('class', 'c-sankey__value')
                    .attr('y', sankey.nodeWidth()/1.9)
                    .attr('x', (d) => ((d.y1 - d.y0) / 2) * -1)
                    .attr('dy', '0.35em')
                    .attr('text-anchor', 'middle')
                    .text((d) => Math.max(5, d.y1 - d.y0) > 15 ? d.weight : '')
                    .on('click', ((e, d) => {
                        if (e.defaultPrevented) return;
                        if (_t.onNodeClickCallback) {
                            _t.onNodeClickCallback(e, d)
                        }
                    }).bind(this))
            }
        });

        if (this.hiddenColumns && Object.values(this.hiddenColumns).length) {
            const sortedAsc = Object.fromEntries(
                Object.entries(transformsY0).sort((a, b) => a[1] - b[1])
            )
            const posY = Object.values(sortedAsc).pop() + 30
     
            const _hiddenColumns = Object.keys(this.hiddenColumns);

            const hiddenColumnsLegend = svg.selectAll(".c-sankey__hiddenColumnsLegend")
                .data(_hiddenColumns)
                .enter().append("g")
                .on('click', (e, d) => {
                    _t.addColumn(d)
                })
                .attr("class", "c-sankey__hiddenColumnsLegend")
                .attr("transform", (d, i) => { 
                    return `translate(${i * 150},${posY})`; 
                })
                
            hiddenColumnsLegend.append('title')
                    .text((d)=> _t.getTooltipForTool('add', _t.hiddenColumns[d], 'Click to add {name} to the visualization'))

            hiddenColumnsLegend.append("rect")
                .attr("width", 12)
                .attr("height", 12)
                .style("fill", d => {
                    return fillColor({columnName: _t.hiddenColumns[d], name: d})
                });

            hiddenColumnsLegend.append("text")
                .attr("x", 18)
                .attr("y", 10)
                .text((d) => _t.getPropertyDisplayName(_t.hiddenColumns[d]))
                .style("font-size", "12px");
        }
        
        if (this.onSvgBuildCallback) {
            if (Util.eq(typeof this.onSvgBuildCallback, 'function')) {
                this.onSvgBuildCallback(this)
            }
        } else {
            this.hideLoadingSpinner()
        }

    }

    hideLoadingSpinner() {
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
        this.init()
        this.setTheme()
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
        if (this.useShadow) {
            const l = this.#shadow?.querySelectorAll('svg')
            l?.forEach((el)=> {
                el.remove()
            })
        } else {
            this.innerHTML = ''
        }
    }

    /**
     * Displays or removes loading spinner.
     */
    handleLoader(msg) {
        const ctx = this.useShadow ? this.#shadow : this
        if (ctx) {
            ctx.querySelectorAll(`.${this.classes.loader}`).forEach(
                (el) => {
                    el.remove()
                }
            )
            if (this.isLoading || msg) {
                if (!this.loading.callback) {
                    const loader = document.createElement("div")
                    loader.innerHTML = (this.isLoading ? this.loading.html : '') + (msg ? `<span class="c-sankey__msg">${msg}</span>` : '')
                    loader.className = this.classes.loader
                    ctx.appendChild(loader)
                }
            }
        }
        if (this.loading.callback) {
            this.loading.callback(this, msg)
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
        return Util.isLocal()
    }

    /**
     * Logs message to screen
     * @param {string} msg The message to display
     * @param {object} ops Color options for console
     */
    static log(msg, ops) {
        Util.log(msg, ops)
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