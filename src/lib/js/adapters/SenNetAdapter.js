import SankeyAdapter from './SankeyAdapter.js'

class SenNetAdapter extends SankeyAdapter {
    
    constructor(context, ops = {}) {
        super(context, ops);
    }

    static getProdEnv() {
        return {
            portal: 'https://data.sennetconsortium.org/',
            api: {
                sankey: 'https://entity.api.sennetconsortium.org/datasets/sankey_data'
            }
        }
    }

    static getDevEnv() {
        return {
            portal: 'https://data.dev.sennetconsortium.org/',
            api: {
                sankey: 'https://entity-api.dev.sennetconsortium.org/datasets/sankey_data'
            }
        }
    }

    /**
     * Opens a new tab/window based on data
     * @param {object} d - The current data node
     */
    goTo(d) {
        const col = this.filterMap[d.columnName]

        const facetsMap = {
            organ: 'origin_samples.organ',
            source_type: 'sources.source_type'
        }
        
        let values = [d.name]
        
        if (col === 'organ') {
            values = this.ctx.organsDictByCategory[d.name]
        }
       
        if (col === 'dataset_type') {
            values = Array.from(this.captureByKeysValue({matchKey: d.columnName, matchValue: d.name, keepKey: 'dataset_type_description'}, this.ctx.rawData))
        }

        const facet = facetsMap[col] || col
        const addFilters = `;data_class=Create Dataset Activity;entity_type=Dataset`
        if (values) {
            values = Array.from(values)
            window.open(
                `${SenNetAdapter[this.getEnv()]().portal}search?addFilters=${facet}=${values.join(
                    ','
                )}${addFilters}`,
                '_blank'
            )
        }
    }
}

window.SenNetAdapter = SenNetAdapter
export default SenNetAdapter