import SankeyAdapter from './SankeyAdapter.js'

class SenNetAdapter extends SankeyAdapter {
    
    constructor(context, ops = {}) {
        super(context, ops);
        this.facetsMap = {
            organ: 'origin_samples.organ',
            source_type: 'sources.source_type'
        }
    }

    onDataBuildCallback() {
        this.urlFilters = this.getSankeyFilters(this.facetsMap)
    }

    /**
     * Get additional filters that were passed to the sankey
     * @param facetsMap
     * @returns {{}}
     */
    getSankeyFilters(facetsMap = {}) {
        let additionalFilters = ''
        let facet
        let properFacetName
        const format = (f) => Array.isArray(f) ? f.join(',') : f.toString()
        for (let f in this.ctx.filters) {
            facet = facetsMap[f] || f
            properFacetName = this.ctx.filters[f]
            properFacetName = this.getDataValueByColumn(f, this.ctx.filters[f])
            additionalFilters += `;${facet}=${format(properFacetName)}`
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
            portal: 'https://data.sennetconsortium.org/',
            api: {
                sankey: 'https://ingest.api.sennetconsortium.org/datasets/sankey_data'
            }
        }
    }

    /**
     * Returns urls for dev.
     * @returns {{portal: string, api: {sankey: string}}}
     */
    getDevEnv() {
        return {
            portal: 'https://data.dev.sennetconsortium.org/',
            api: {
                sankey: 'https://ingest-api.dev.sennetconsortium.org/datasets/sankey_data'
            }
        }
    }

    /**
     * Opens a new tab/window based on data
     * @param {object} d - The current data node
     */
    goTo(d) {
        const col = this.filterMap[d.columnName]
        
        let values = [d.name]
        
        if (col === 'organ') {
            values = this.ctx.organsDictByCategory[d.name]
        }
       
        if (col === 'dataset_type') {
            values = this.captureByKeysValue({matchKey: d.columnName, matchValue: d.name, keepKey: 'dataset_type_description'}, this.ctx.rawData)
        }

        const facet = this.facetsMap[col] || col
        const urlFilters = this.urlFilters || ''
        const addFilters = `;data_class=Create Dataset Activity;entity_type=Dataset${urlFilters}`
        if (values && (values.length || values.size)) {
            values = Array.from(values)
            const filters = encodeURIComponent(`${facet}=${values.join(',')}${addFilters}`)
            const url = `${this.getUrls().portal}search?addFilters=${filters}`
            this.openUrl(url)
        }
    }
}

try {
    window.SenNetAdapter = SenNetAdapter
} catch (e) {}

export default SenNetAdapter