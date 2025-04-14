/**
* 
* 4/14/2025, 6:58:53 PM | X Atlas Consortia Sankey 1.0.4 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import Util from '../util/Util.js';
var SankeyAdapter = /*#__PURE__*/function () {
  function SankeyAdapter(context) {
    var ops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, SankeyAdapter);
    this.ops = ops || {};
    this.ctx = context;
    this.filterMap = context.flipObj(context.validFilterMap);
  }

  /**
   * Checks equality.
   * @param s1
   * @param s2
   * @param insensitive
   * @returns {boolean}
   */
  return _createClass(SankeyAdapter, [{
    key: "eq",
    value: function eq(s1, s2) {
      var insensitive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return Util.eq(s1, s2, insensitive);
    }

    /**
     * Checks if current column is organ column
     * @param col
     * @returns {boolean}
     */
  }, {
    key: "isOrganColumn",
    value: function isOrganColumn(col) {
      return this.eq(col, 'organ');
    }

    /**
     * Returns the actual value from the data with proper casing
     * @param col
     * @param needles
     * @returns {any[]}
     */
  }, {
    key: "getDataValueByColumn",
    value: function getDataValueByColumn(col, needles) {
      needles = needles.split(',');
      var values = new Set();
      var validFilters = _defineProperty({}, this.ctx.validFilterMap[col], needles);
      this.ctx.filteredData.forEach(function (row, index) {
        for (var _i = 0, _Object$entries = Object.entries(validFilters); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            field = _Object$entries$_i[0],
            validValues = _Object$entries$_i[1];
          var rowValues = Array.isArray(row[field]) ? row[field] : [row[field]];
          var _iterator = _createForOfIteratorHelper(rowValues),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var v = _step.value;
              if (validValues.includes(v.toLowerCase())) {
                var group = [v];
                group.forEach(function (item) {
                  return values.add(item);
                });
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      });
      return Array.from(values);
    }

    /**
     * Will capture data from particular dictionary given matching keys and values.
     * @param {object} keys The keys and values to match against
     * @param {array} data List of data to filter through
     * @returns {*}
     */
  }, {
    key: "captureByKeysValue",
    value: function captureByKeysValue(keys, data) {
      return Util.captureByKeysValue(keys, data);
    }

    /**
     * Gets the env function.
     * @returns {string}
     */
  }, {
    key: "getEnv",
    value: function getEnv() {
      return SankeyAdapter.isLocal() && !this.ops.isProd ? 'getDevEnv' : 'getProdEnv';
    }

    /**
     * Opens a given url in blank tab.
     * @param {string} url
     */
  }, {
    key: "openUrl",
    value: function openUrl(url) {
      var a = document.createElement('a');
      a.href = url;
      a.setAttribute('target', '_blank');
      document.body.append(a);
      a.click();
      a.remove();
    }

    /**
     * Gets urls required for viewing sankey
     * @returns {*}
     */
  }, {
    key: "getUrls",
    value: function getUrls() {
      var envFn = this.ops.env || this.getEnv();
      this.ops.urls = this.ops.urls || {};
      var urls = this[envFn]();
      Object.assign(urls, this.ops.urls);
      return urls;
    }

    /**
     * Checks if running in local or dev env
     * @returns {boolean}
     */
  }, {
    key: "log",
    value:
    /**
     *  Logs message to screen.
     * @param {string} msg The message to display
     * @param {string} fn The type of message {log|warn|error}
     */
    function log(msg) {
      var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';
      SankeyAdapter.log(msg, {
        fn: fn
      });
    }
  }], [{
    key: "isLocal",
    value: function isLocal() {
      return Util.isLocal();
    }

    /**
     * Logs message to screen
     * @param {string} msg The message to display
     * @param {object} ops Color options for console
     */
  }, {
    key: "log",
    value: function log(msg, ops) {
      Util.log(msg, ops);
    }
  }]);
}();
export default SankeyAdapter;