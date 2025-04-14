/**
* 
* 4/14/2025, 3:25:26 PM | X Atlas Consortia Sankey 1.0.4 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Util = /*#__PURE__*/function () {
  function Util() {
    _classCallCheck(this, Util);
  }
  return _createClass(Util, [{
    key: "log",
    value:
    /**
     *  Logs message to screen.
     * @param {string} msg The message to display
     * @param {string} fn The type of message {log|warn|error}
     */
    function log(msg) {
      var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';
      Util.log(msg, {
        fn: fn
      });
    }
  }], [{
    key: "eq",
    value: function eq(s1, s2) {
      var insensitive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var res = s1 === s2;
      if (insensitive && s1 !== undefined && s2 !== undefined) {
        res = (s1 === null || s1 === void 0 ? void 0 : s1.toLowerCase()) === (s2 === null || s2 === void 0 ? void 0 : s2.toLowerCase());
      }
      return res;
    }

    /**
     * Will capture data from particular dictionary given matching keys and values.
     * @param {object} keys The keys and values to match against {matchKey[string], matchValue[string], keepKey[string]}
     * @param {array} data List of data to filter through
     * @returns {array[string]}
     */
  }, {
    key: "captureByKeysValue",
    value: function captureByKeysValue(keys, data) {
      var result = new Set();
      var _iterator = _createForOfIteratorHelper(data),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var d = _step.value;
          if (Util.eq(d[keys.matchKey], keys.matchValue)) {
            if (d[keys.keepKey]) {
              result.add(d[keys.keepKey]);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return Array.from(result);
    }

    /**
     * Checks if running in local or dev env
     * @returns {boolean}
     */
  }, {
    key: "isLocal",
    value: function isLocal() {
      return location.host.indexOf('localhost') !== -1 || location.host.indexOf('.dev') !== -1;
    }

    /**
     * Logs message to screen
     * @param {string} msg The message to display
     * @param {object} ops Color options for console
     */
  }, {
    key: "log",
    value: function log(msg, ops) {
      ops = ops || {};
      var _ops = ops,
        fn = _ops.fn,
        color = _ops.color,
        data = _ops.data;
      fn = fn || 'log';
      color = color || '#bada55';
      data = data || '';
      if (Util.isLocal()) {
        console[fn]("%c ".concat(msg), "background: #222; color: ".concat(color), data);
      }
    }
  }]);
}();
export default Util;