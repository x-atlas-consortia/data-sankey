/**
* 
* 4/14/2025, 9:32:29 AM | X Atlas Consortia Sankey 1.0.4 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  return _createClass(SankeyAdapter, [{
    key: "captureByKeysValue",
    value: function captureByKeysValue(keys, data) {
      return Util.captureByKeysValue(keys, data);
    }
  }, {
    key: "getEnv",
    value: function getEnv() {
      return SankeyAdapter.isLocal() || this.ops.isDev ? 'getDevEnv' : 'getProdEnv';
    }
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
  }, {
    key: "getUrls",
    value: function getUrls() {
      var envFn = this.getEnv();
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