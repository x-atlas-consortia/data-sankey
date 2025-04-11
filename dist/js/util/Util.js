/**
* 
* 4/11/2025, 2:14:06 PM | X Atlas Consortia Sankey 1.0.3 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
    key: "isLocal",
    value:
    /**
     * Checks if running in local or dev env
     * @returns {boolean}
     */
    function isLocal() {
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