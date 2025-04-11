import SankeyAdapter from './SankeyAdapter.js'

class HuBMAPAdapter extends SankeyAdapter {

    constructor(context, ops = {}) {
        super(context, ops);
    }

    getProdEnv() {
        return {
            portal: 'https://portal.hubmapconsortium.org/',
            api: {
                sankey: 'https://entity.api.hubmapconsortium.org/datasets/sankey_data'
            }
        }
    }

    getDevEnv() {
        return {
            portal: 'https://portal.dev.hubmapconsortium.org/',
            api: {
                sankey: 'https://entity-api.dev.hubmapconsortium.org/datasets/sankey_data'
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
        if (!LZString && !LZString.compressToEncodedURIComponent) {
            console.error('HuBMAPAdapter > LZString library not loaded. Please include the script at src: https://unpkg.com/lz-string@1.5.0/libs/lz-string.js')
        }
        const search = filters
            ? `?${LZString.compressToEncodedURIComponent(JSON.stringify({ filters }))}`
            : ""
        return `search/${entityType.toLowerCase()}s${search}`
    }

    /**
     * Opens a new tab/window based on data
     * @param {object} d - The current data node
     */
    goTo(d) {
        const col = this.filterMap[d.columnName]
        
        let facetMap = {
            organ_type: 'origin_samples_unique_mapped_organs'
        }

        const field = facetMap[col] || col

        let filters = {
            [field]: {
                values: [d.name],
                type: 'TERM',
            }
        }
        const url = this.buildSearchLink({entityType: 'Dataset', filters})
        this.openUrl(`${this.getUrls().portal}${url}`)
    }
}

window.HuBMAPAdapter = HuBMAPAdapter
export default HuBMAPAdapter