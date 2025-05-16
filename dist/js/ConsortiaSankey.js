/**
* 
* 5/16/2025, 11:39:50 AM | X Atlas Consortia Sankey 1.0.11 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var d3 = _interopRequireWildcard(require("https://cdn.jsdelivr.net/npm/d3@7/+esm"));
var _esm2 = require("https://cdn.jsdelivr.net/npm/d3-sankey@0.12.3/+esm");
var _XACSankey = _interopRequireDefault(require("./XACSankey.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class ConsortiaSankey extends _XACSankey.default {
  constructor() {
    super();
    this.d3 = {
      d3,
      d3sankey: _esm2.sankey,
      sankeyLinkHorizontal: _esm2.sankeyLinkHorizontal
    };
  }
}
customElements.define('consortia-sankey', ConsortiaSankey);
var _default = exports.default = ConsortiaSankey;