import * as d3 from 'd3'
import { sankey as d3sankey, sankeyLinkHorizontal } from 'd3-sankey'
import XACSankey from "./XACSankey.js";

class ReactConsortiaSankey extends XACSankey {
    constructor() {
        super();
        this.d3 = {
            d3, d3sankey, sankeyLinkHorizontal
        }
    }
}

customElements.define('react-consortia-sankey', ReactConsortiaSankey)

export default ReactConsortiaSankey