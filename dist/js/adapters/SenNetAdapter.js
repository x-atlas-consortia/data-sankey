/**
* 
* 4/14/2025, 3:25:26 PM | X Atlas Consortia Sankey 1.0.4 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
import SankeyAdapter from './SankeyAdapter.js';
var SenNetAdapter = /*#__PURE__*/function (_SankeyAdapter) {
  function SenNetAdapter(context) {
    var _this;
    var ops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, SenNetAdapter);
    _this = _callSuper(this, SenNetAdapter, [context, ops]);
    _this.facetsMap = {
      organ: 'origin_samples.organ',
      source_type: 'sources.source_type'
    };
    return _this;
  }
  _inherits(SenNetAdapter, _SankeyAdapter);
  return _createClass(SenNetAdapter, [{
    key: "onDataBuildCallback",
    value: function onDataBuildCallback() {
      this.urlFilters = this.getSankeyFilters(this.facetsMap);
    }

    /**
     * Get additional filters that were passed to the sankey
     * @param facetsMap
     * @returns {{}}
     */
  }, {
    key: "getSankeyFilters",
    value: function getSankeyFilters() {
      var facetsMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var additionalFilters = '';
      var facet;
      var properFacetName;
      var format = function format(f) {
        return Array.isArray(f) ? f.join(',') : f.toString();
      };
      for (var f in this.ctx.filters) {
        facet = facetsMap[f] || f;
        properFacetName = this.ctx.filters[f];
        properFacetName = this.getDataValueByColumn(f, this.ctx.filters[f]);
        additionalFilters += ";".concat(facet, "=").concat(format(properFacetName));
      }
      SankeyAdapter.log('getSankeyFilters', {
        color: 'purple',
        data: {
          facetsMap: facetsMap,
          additionalFilters: additionalFilters
        }
      });
      return additionalFilters;
    }

    /**
     * Returns urls for production.
     * @returns {{portal: string, api: {sankey: string}}}
     */
  }, {
    key: "getProdEnv",
    value: function getProdEnv() {
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
  }, {
    key: "getDevEnv",
    value: function getDevEnv() {
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
  }, {
    key: "goTo",
    value: function goTo(d) {
      var col = this.filterMap[d.columnName];
      var values = [d.name];
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
      var facet = this.facetsMap[col] || col;
      var urlFilters = this.urlFilters || '';
      var addFilters = ";data_class=Create Dataset Activity;entity_type=Dataset".concat(urlFilters);
      if (values && (values.length || values.size)) {
        values = Array.from(values);
        var filters = encodeURIComponent("".concat(facet, "=").concat(values.join(',')).concat(addFilters));
        var url = "".concat(this.getUrls().portal, "search?addFilters=").concat(filters);
        this.openUrl(url);
      }
    }
  }]);
}(SankeyAdapter);
try {
  window.SenNetAdapter = SenNetAdapter;
} catch (e) {}
export default SenNetAdapter;