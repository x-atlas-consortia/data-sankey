/**
* 
* 4/15/2025, 9:48:41 AM | X Atlas Consortia Sankey 1.0.4 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _SankeyAdapter = _interopRequireDefault(require("./SankeyAdapter.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class HuBMAPAdapter extends _SankeyAdapter.default {
  constructor(context) {
    let ops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
  getSankeyFilters() {
    let facetsMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
      portal: 'https://portal.hubmapconsortium.org/',
      api: {
        sankey: 'https://entity.api.hubmapconsortium.org/datasets/sankey_data'
      }
    };
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
    };
  }

  /**
   * Checks if required dependency is loaded.
   */
  checkDependencies() {
    try {
      var _LZString;
      const dep = ((_LZString = LZString) === null || _LZString === void 0 ? void 0 : _LZString.compressToEncodedURIComponent) || LZString;
    } catch (e) {
      console.error('HuBMAPAdapter > LZString library not loaded. Please include the script at src: https://unpkg.com/lz-string@1.5.0/libs/lz-string.js');
    }
  }

  /**
   * Builds a HuBMAP Portal compatible filter link.
   * 
   * @param {string} entityType
   * @param {object} filters
   * @returns {string}
   */
  buildSearchLink(_ref) {
    let {
      entityType,
      filters
    } = _ref;
    this.checkDependencies();
    const search = filters ? "?".concat(LZString.compressToEncodedURIComponent(JSON.stringify({
      filters
    }))) : "";
    return "search/".concat(entityType.toLowerCase(), "s").concat(search);
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
    const urlFilters = this.urlFilters || {};
    filters = _objectSpread(_objectSpread({}, urlFilters), filters);
    const url = this.buildSearchLink({
      entityType: 'Dataset',
      filters
    });
    this.openUrl("".concat(this.getUrls().portal).concat(url));
  }
}
try {
  window.HuBMAPAdapter = HuBMAPAdapter;
} catch (e) {}
var _default = exports.default = HuBMAPAdapter;