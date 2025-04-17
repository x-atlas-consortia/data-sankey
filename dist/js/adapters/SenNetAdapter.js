/**
* 
<<<<<<< HEAD
* 4/17/2025, 2:39:02 PM | X Atlas Consortia Sankey 1.0.5 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
=======
<<<<<<< HEAD
* 4/17/2025, 2:34:16 PM | X Atlas Consortia Sankey 1.0.5 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
=======
* 4/17/2025, 2:22:05 PM | X Atlas Consortia Sankey 1.0.6 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
>>>>>>> cc8c814 (Add ability to select HM status checkbox)
>>>>>>> f525602 (Add ability to select HM status checkbox)
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _SankeyAdapter = _interopRequireDefault(require("./SankeyAdapter.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SenNetAdapter extends _SankeyAdapter.default {
  constructor(context, ops = {}) {
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
  getSankeyFilters(facetsMap = {}) {
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
      additionalFilters += `;${facet}=${format(properFacetName)}`;
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
      portal: 'https://data.sennetconsortium.org/'
    };
  }

  /**
   * Returns urls for dev.
   * @returns {{portal: string, api: {sankey: string}}}
   */
  getDevEnv() {
    return {
      portal: 'https://data.dev.sennetconsortium.org/'
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
    const addFilters = `;data_class=Create Dataset Activity;entity_type=Dataset${urlFilters}`;
    if (values && (values.length || values.size)) {
      values = Array.from(values);
      const filters = encodeURIComponent(`${facet}=${values.join(',')}${addFilters}`);
      const url = `${this.getUrls().portal}search?addFilters=${filters}`;
      this.openUrl(url);
    }
  }

  /**
   * Callback from click a link
   * @param {object} d
   */
  goToFromLink(d) {
    const source = this.goTo(d.source);
    const target = this.goTo(d.target);
    _SankeyAdapter.default.log('goToFromLink', {
      data: `${source.filter};${target.filter}${source.addFilters}`
    });
    const filters = encodeURIComponent(`${source.filter};${target.filter}${source.addFilters}`);
    if (source.baseUrl && target.baseUrl) {
      this.openUrl(`${source.baseUrl}${filters}`);
    }
  }

  /**
   * Callback from clicking a node
   * @param {object} d
   */
  goToFromNode(d) {
    const {
      baseUrl,
      filter,
      addFilters
    } = this.goTo(d);
    const filters = encodeURIComponent(`${filter}${addFilters}`);
    if (baseUrl) {
      this.openUrl(`${baseUrl}${filters}`);
    }
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
    const addFilters = `;data_class=Create Dataset Activity;entity_type=Dataset${urlFilters}`;
    if (values && (values.length || values.size)) {
      values = Array.from(values);
      const filter = `${facet}=${values.join(',')}`;
      //const filters = encodeURIComponent(`${filter}${addFilters}`)
      const baseUrl = `${this.getUrls().portal}search?addFilters=`;
      //const url = `${baseUrl}${filters}`
      return {
        baseUrl,
        filter,
        addFilters
      };
    }
    return {};
  }
}
try {
  window.SenNetAdapter = SenNetAdapter;
} catch (e) {}
var _default = exports.default = SenNetAdapter;