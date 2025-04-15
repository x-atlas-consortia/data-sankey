/**
* 
* 4/15/2025, 9:56:33 AM | X Atlas Consortia Sankey 1.0.4 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.regexp.to-string.js");
var _SankeyAdapter = _interopRequireDefault(require("./SankeyAdapter.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SenNetAdapter extends _SankeyAdapter.default {
  constructor(context) {
    let ops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(context, ops);
    this.facetsMap = {
      organ: 'origin_samples.organ',
      source_type: 'sources.source_type'
    };
  }
  onDataBuildCallback() {
    this.urlFilters = this.getSankeyFilters(this.facetsMap);
  }

  /**
   * Get additional filters that were passed to the sankey
   * @param facetsMap
   * @returns {{}}
   */
  getSankeyFilters() {
    let facetsMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let additionalFilters = '';
    let facet;
    let properFacetName;
    const format = f => Array.isArray(f) ? f.join(',') : f.toString();
    for (let f in this.ctx.filters) {
      facet = facetsMap[f] || f;
      properFacetName = this.ctx.filters[f];
      let nameFromData = this.getDataValueByColumn(f, this.ctx.filters[f]);
      properFacetName = nameFromData.length ? nameFromData : properFacetName;
      if (this.isOrganColumn(f)) {
        properFacetName = Array.from(this.ctx.organsDictByCategory[properFacetName]);
      }
      additionalFilters += ";".concat(facet, "=").concat(format(properFacetName));
    }
    _SankeyAdapter.default.log('getSankeyFilters', {
      color: 'purple',
      data: {
        facetsMap,
        additionalFilters
      }
    });
    return additionalFilters;
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
    };
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
    };
  }

  /**
   * Opens a new tab/window based on data
   * @param {object} d - The current data node
   */
  goTo(d) {
    const col = this.filterMap[d.columnName];
    let values = [d.name];
    if (col === 'organ') {
      values = this.ctx.organsDictByCategory[d.name];
    }
    if (col === 'dataset_type') {
      values = this.captureByKeysValue({
        matchKey: d.columnName,
        matchValue: d.name,
        keepKey: 'dataset_type_description'
      }, this.ctx.rawData);
    }
    const facet = this.facetsMap[col] || col;
    const urlFilters = this.urlFilters || '';
    const addFilters = ";data_class=Create Dataset Activity;entity_type=Dataset".concat(urlFilters);
    if (values && (values.length || values.size)) {
      values = Array.from(values);
      const filters = encodeURIComponent("".concat(facet, "=").concat(values.join(',')).concat(addFilters));
      const url = "".concat(this.getUrls().portal, "search?addFilters=").concat(filters);
      this.openUrl(url);
    }
  }
}
try {
  window.SenNetAdapter = SenNetAdapter;
} catch (e) {}
var _default = exports.default = SenNetAdapter;