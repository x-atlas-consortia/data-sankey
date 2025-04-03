import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import { sankey as d3sankey, sankeyLinkHorizontal } from 'https://cdn.jsdelivr.net/npm/d3-sankey@0.12.3/+esm'
import XACSankey from "./XACSankey.js";

class ConsortiaSankey extends XACSankey {
    constructor() {
        super();
        this.d3 = {
            d3, d3sankey, sankeyLinkHorizontal
        }
    }
}

customElements.define('consortia-sankey', ConsortiaSankey)

export default ConsortiaSankey