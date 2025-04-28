/**
* 
* 4/28/2025, 12:14:06 PM | X Atlas Consortia Sankey 1.0.8 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _SankeyAdapter = _interopRequireDefault(require("./SankeyAdapter.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class HuBMAPAdapter extends _SankeyAdapter.default {
  constructor(context, ops = {}) {
    super(context, ops);
    this.checkDependencies();
    this.facetsMap = {
      organ: 'origin_samples_unique_mapped_organs'
    };
  }

  /**
   * Callback to run after the data has been built
   */
  onDataBuildCallback() {
    this.urlFilters = this.getSankeyFilters(this.facetsMap);
  }

  /**
   * Get additional pre-filters that were passed to the sankey
   * @param facetsMap
   * @returns {{}}
   */
  getSankeyFilters(facetsMap = {}) {
    let additionalFilters = {};
    let facet;
    let properFacetName;
    for (let f in this.ctx.filters) {
      facet = facetsMap[f] || f;
      properFacetName = this.ctx.filters[f];
      properFacetName = this.getDataValueByColumn(f, this.ctx.filters[f]);
      additionalFilters[facet] = {
        values: this.getFilterValues(f, properFacetName),
        type: 'TERM'
      };
      if (this.isStatusColumn(f)) {
        additionalFilters.mapped_status = this.buildHierarchicalFacetQuery({
          fieldValues: properFacetName
        }).mapped_status;
      }
      if (this.isDatasetTypeColumn(f)) {
        delete additionalFilters.dataset_type;
        additionalFilters.raw_dataset_type = this.buildHierarchicalFacetQuery({
          fieldValues: properFacetName,
          field: 'raw_dataset_type'
        }).raw_dataset_type;
      }
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
      portal: 'https://portal.hubmapconsortium.org/'
    };
  }

  /**
   * Returns urls for dev.
   * @returns {{portal: string, api: {sankey: string}}}
   */
  getDevEnv() {
    return {
      portal: 'https://portal.dev.hubmapconsortium.org/'
    };
  }

  /**
   * Checks if required dependency is loaded.
   */
  checkDependencies() {
    try {
      const dep = LZString?.compressToEncodedURIComponent || LZString;
    } catch (e) {
      console.error('HuBMAPAdapter > LZString library not loaded. Please include the script at src: https://unpkg.com/lz-string@1.5.0/libs/lz-string.js');
    }
  }

  /**
   * Creates a HM Portal compatible hierarchical filter part
   * @param fieldValues
   * @param field
   * @param subFieldValues
   * @returns {{}}
   */
  buildHierarchicalFacetQuery({
    fieldValues,
    field = 'mapped_status',
    subFieldValues = []
  }) {
    let values = {};
    for (let f of fieldValues) {
      values[f] = subFieldValues;
    }
    return {
      [field]: {
        type: 'HIERARCHICAL',
        values
      }
    };
  }

  /**
   * Builds a HuBMAP Portal compatible filter link.
   * 
   * @param {string} entityType
   * @param {object} filters
   * @returns {string}
   */
  buildSearchLink({
    entityType,
    filters
  }) {
    this.checkDependencies();
    const search = filters ? `?${LZString.compressToEncodedURIComponent(JSON.stringify({
      filters
    }))}` : "";
    return `search/${entityType.toLowerCase()}s${search}`;
  }

  /**
   * Return properly formed values to be passed as query parameters using the LZString library
   * @param col
   * @param name
   * @returns {*}
   */
  getFilterValues(col, name) {
    let values = Array.isArray(name) ? name : name.split(',');
    if (this.isOrganColumn(col)) {
      let names = Array.from(values);
      values = [];
      for (let n of names) {
        values = [...values, ...Array.from(this.ctx.organsDictByCategory[n])];
      }
    }
    return values;
  }

  /**
   * Callback from click a link
   * @param {object} d
   */
  goToFromLink(d) {
    const source = this.goTo(d.source);
    const target = this.goTo(d.target);
    const filters = _objectSpread(_objectSpread({}, source.filters), target.filters);
    _SankeyAdapter.default.log('goToFromLink', {
      data: filters,
      color: 'lime'
    });
    const url = this.buildSearchLink({
      entityType: 'Dataset',
      filters
    });
    this.openUrl(`${this.getUrls().portal}${url}`);
  }

  /**
   * Callback from clicking a node
   * @param {object} d
   */
  goToFromNode(d) {
    const {
      url
    } = this.goTo(d);
    this.openUrl(`${this.getUrls().portal}${url}`);
  }

  /**
   * Opens a new tab/window based on data
   * @param {object} d - The current data node
   */
  goTo(d) {
    const col = this.filterMap[d.columnName];
    const field = this.facetsMap[col] || col;
    const values = this.getFilterValues(col, d.name);
    let filters = {
      [field]: {
        values,
        type: 'TERM'
      }
    };
    if (this.isStatusColumn(col)) {
      filters.mapped_status = this.buildHierarchicalFacetQuery({
        fieldValues: [d.name]
      }).mapped_status;
    }
    if (this.isDatasetTypeColumn(col)) {
      delete filters.dataset_type;
      filters.raw_dataset_type = this.buildHierarchicalFacetQuery({
        fieldValues: [d.name],
        field: 'raw_dataset_type'
      }).raw_dataset_type;
    }
    const urlFilters = this.urlFilters || {};
    filters = _objectSpread(_objectSpread({}, urlFilters), filters);
    return {
      url: this.buildSearchLink({
        entityType: 'Dataset',
        filters
      }),
      filters
    };
  }
}
try {
  window.HuBMAPAdapter = HuBMAPAdapter;
} catch (e) {}
var _default = exports.default = HuBMAPAdapter;