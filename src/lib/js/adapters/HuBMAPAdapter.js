import SankeyAdapter from './SankeyAdapter.js'

class HuBMAPAdapter extends SankeyAdapter {

    constructor(context, ops = {}) {
        super(context, ops);
        this.checkDependencies()
        this.facetsMap = {
            organ: 'origin_samples_unique_mapped_organs',
            dataset_type: 'mapped_data_types'
        }
    }

    /**
     * Callback to run after the data has been built
     */
    onDataBuildCallback() {
        this.urlFilters = this.getSankeyFilters(this.facetsMap)
    }

    /**
     * Get additional pre-filters that were passed to the sankey
     * @param facetsMap
     * @returns {{}}
     */
    getSankeyFilters(facetsMap = {}) {
        let additionalFilters = {}
        let facet
        let properFacetName
        for (let f in this.ctx.filters) {
            facet = facetsMap[f] || f
            properFacetName = this.ctx.filters[f]
            properFacetName = this.getDataValueByColumn(f, this.ctx.filters[f])
            additionalFilters[facet] = {
                values: this.getFilterValues(f, properFacetName),
                type: 'TERM',
            }
            if (this.isStatusColumn(f)) {
                additionalFilters.mapped_status = this.buildStatusFacetQuery(properFacetName).mapped_status
            }
        }
        SankeyAdapter.log('getSankeyFilters', {color: 'purple', data: {facetsMap, additionalFilters}})
        return additionalFilters
    }

    /**
     * Returns urls for production.
     * @returns {{portal: string, api: {sankey: string}}}
     */
    getProdEnv() {
        return {
            portal: 'https://portal.hubmapconsortium.org/'
        }
    }

    /**
     * Returns urls for dev.
     * @returns {{portal: string, api: {sankey: string}}}
     */
    getDevEnv() {
        return {
            portal: 'https://portal.dev.hubmapconsortium.org/'
        }
    }

    /**
     * Checks if required dependency is loaded.
     */
    checkDependencies() {
        try {
            const dep = LZString?.compressToEncodedURIComponent || LZString
        } catch (e) {
            console.error('HuBMAPAdapter > LZString library not loaded. Please include the script at src: https://unpkg.com/lz-string@1.5.0/libs/lz-string.js')
        }
    }

    /**
     * Creates a HM Portal compatible status filter part
     * @param status
     * @returns {{mapped_status: {type: string, values: {}}}}
     */
    buildStatusFacetQuery(status) {
        let values = {}
        for (let s of status) {
            values[s] = []
        }
        return {
            mapped_status: {
                type: 'HIERARCHICAL',
                values,
            }
        }
    }

    /**
     * Builds a HuBMAP Portal compatible filter link.
     * 
     * @param {string} entityType
     * @param {object} filters
     * @returns {string}
     */
    buildSearchLink({ entityType, filters }) {
        this.checkDependencies()
        const search = filters
            ? `?${LZString.compressToEncodedURIComponent(JSON.stringify({ filters }))}`
            : ""
        return `search/${entityType.toLowerCase()}s${search}`
    }

    /**
     * Return properly formed values to be passed as query parameters using the LZString library
     * @param col
     * @param name
     * @returns {*}
     */
    getFilterValues(col, name) {
        let values = Array.isArray(name) ? name : name.split(',')

        if (this.isOrganColumn(col)) {
            let names = Array.from(values)
            values = []
            for (let n of names) {
                values = [...values, ...Array.from(this.ctx.organsDictByCategory[n])]
            }
        }
        return values
    }

    /**
     * Callback from click a link
     * @param {object} d
     */
    goToFromLink(d) {
        const source= this.goTo(d.source)
        const target = this.goTo(d.target)
        const filters = {...source.filters, ...target.filters}
        SankeyAdapter.log('goToFromLink', {data: filters, color: 'lime'})
        const url = this.buildSearchLink({entityType: 'Dataset', filters})
        this.openUrl(`${this.getUrls().portal}${url}`)
    }

    /**
     * Callback from clicking a node
     * @param {object} d
     */
    goToFromNode(d) {
        const {url} = this.goTo(d)
        this.openUrl(`${this.getUrls().portal}${url}`)
    }

    /**
     * Opens a new tab/window based on data
     * @param {object} d - The current data node
     */
    goTo(d) {
        const col = this.filterMap[d.columnName]

        const field = this.facetsMap[col] || col

        const values = this.getFilterValues(col, d.name)

        let filters = {
            [field]: {
                values,
                type: 'TERM',
            }
        }
        if (this.isStatusColumn(col)) {
            filters.mapped_status = this.buildStatusFacetQuery([d.name]).mapped_status
        }
        const urlFilters = this.urlFilters || {}
        filters = {...urlFilters, ...filters}
        return {url: this.buildSearchLink({entityType: 'Dataset', filters}), filters}
    }
}

try {
    window.HuBMAPAdapter = HuBMAPAdapter
} catch (e) {}

export default HuBMAPAdapter