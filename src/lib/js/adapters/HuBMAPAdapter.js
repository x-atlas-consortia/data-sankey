import SankeyAdapter from './SankeyAdapter.js'

class HuBMAPAdapter extends SankeyAdapter {

    constructor(context, ops = {}) {
        super(context, ops);
        this.checkDependencies()
        this.facetsMap = {
            organ: 'origin_samples_unique_mapped_organs',
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
            portal: 'https://portal.hubmapconsortium.org/',
            api: {
                sankey: 'https://entity.api.hubmapconsortium.org/datasets/sankey_data'
            }
        }
    }

    /**
     * Returns urls for dev.
     * @returns {{portal: string, api: {sankey: string}}}
     */
    getDevEnv() {
        return {
            portal: 'https://portal.dev.hubmapconsortium.org/',
            api: {
                sankey: 'https://entity-api.dev.hubmapconsortium.org/datasets/sankey_data'
            }
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

        if (this.eq(col, 'organ')) {
            let names = Array.from(values)
            values = []
            for (let n of names) {
                values = [...values, ...Array.from(this.ctx.organsDictByCategory[n])]
            }
        }
        return values
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
        const urlFilters = this.urlFilters || {}
        filters = {...urlFilters, ...filters}
        const url = this.buildSearchLink({entityType: 'Dataset', filters})
        this.openUrl(`${this.getUrls().portal}${url}`)
    }
}

try {
    window.HuBMAPAdapter = HuBMAPAdapter
} catch (e) {}

export default HuBMAPAdapter