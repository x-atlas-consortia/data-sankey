/**
* 
* 4/11/2025, 3:52:47 PM | X Atlas Consortia Sankey 1.0.4a | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var HuBMAPAdapter = /*#__PURE__*/function (_SankeyAdapter) {
  function HuBMAPAdapter(context) {
    var _this;
    var ops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, HuBMAPAdapter);
    _this = _callSuper(this, HuBMAPAdapter, [context, ops]);
    _this.checkDependencies();
    return _this;
  }
  _inherits(HuBMAPAdapter, _SankeyAdapter);
  return _createClass(HuBMAPAdapter, [{
    key: "getProdEnv",
    value: function getProdEnv() {
      return {
        portal: 'https://portal.hubmapconsortium.org/',
        api: {
          sankey: 'https://entity.api.hubmapconsortium.org/datasets/sankey_data'
        }
      };
    }
  }, {
    key: "getDevEnv",
    value: function getDevEnv() {
      return {
        portal: 'https://portal.dev.hubmapconsortium.org/',
        api: {
          sankey: 'https://entity-api.dev.hubmapconsortium.org/datasets/sankey_data'
        }
      };
    }
  }, {
    key: "checkDependencies",
    value: function checkDependencies() {
      try {
        var _LZString;
        var dep = ((_LZString = LZString) === null || _LZString === void 0 ? void 0 : _LZString.compressToEncodedURIComponent) || LZString;
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
  }, {
    key: "buildSearchLink",
    value: function buildSearchLink(_ref) {
      var entityType = _ref.entityType,
        filters = _ref.filters;
      this.checkDependencies();
      var search = filters ? "?".concat(LZString.compressToEncodedURIComponent(JSON.stringify({
        filters: filters
      }))) : "";
      return "search/".concat(entityType.toLowerCase(), "s").concat(search);
    }

    /**
     * Opens a new tab/window based on data
     * @param {object} d - The current data node
     */
  }, {
    key: "goTo",
    value: function goTo(d) {
      var col = this.filterMap[d.columnName];
      var facetMap = {
        organ: 'origin_samples_unique_mapped_organs'
      };
      var field = facetMap[col] || col;
      var values = [d.name];
      if (col === 'organ') {
        values = Array.from(this.ctx.organsDictByCategory[d.name]);
      }
      var filters = _defineProperty({}, field, {
        values: values,
        type: 'TERM'
      });
      var url = this.buildSearchLink({
        entityType: 'Dataset',
        filters: filters
      });
      this.openUrl("".concat(this.getUrls().portal).concat(url));
    }
  }]);
}(SankeyAdapter);
window.HuBMAPAdapter = HuBMAPAdapter;
export default HuBMAPAdapter;