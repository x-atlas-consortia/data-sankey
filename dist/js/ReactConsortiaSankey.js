/**
* 
* 10/30/2025, 10:04:25 AM | X Atlas Consortia Sankey 1.0.15 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var d3 = _interopRequireWildcard(require("d3"));
var _d3Sankey = require("d3-sankey");
var _XACSankey = _interopRequireDefault(require("./XACSankey.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
class ReactConsortiaSankey extends _XACSankey.default {
  constructor() {
    super();
    this.d3 = {
      d3,
      d3sankey: _d3Sankey.sankey,
      sankeyLinkHorizontal: _d3Sankey.sankeyLinkHorizontal
    };
  }
}
customElements.define('react-consortia-sankey', ReactConsortiaSankey);
var _default = exports.default = ReactConsortiaSankey;