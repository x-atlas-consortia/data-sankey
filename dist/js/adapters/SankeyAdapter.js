/**
* 
* 4/15/2025, 9:48:41 AM | X Atlas Consortia Sankey 1.0.4 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _Util = _interopRequireDefault(require("../util/Util.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SankeyAdapter {
  constructor(context) {
    let ops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
  eq(s1, s2) {
    let insensitive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    return _Util.default.eq(s1, s2, insensitive);
  }

  /**
   * Checks if current column is organ column
   * @param col
   * @returns {boolean}
   */
  isOrganColumn(col) {
    return this.eq(col, 'organ');
  }

  /**
   * Returns the actual value from the data with proper casing
   * @param col
   * @param needles
   * @returns {any[]}
   */
  getDataValueByColumn(col, needles) {
    needles = needles.split(',');
    let values = new Set();
    const validFilters = {
      [this.ctx.validFilterMap[col]]: needles
    };
    this.ctx.filteredData.forEach((row, index) => {
      for (const [field, validValues] of Object.entries(validFilters)) {
        let rowValues = Array.isArray(row[field]) ? row[field] : [row[field]];
        for (let v of rowValues) {
          if (validValues.includes(v.toLowerCase())) {
            let group = [v];
            group.forEach(item => values.add(item));
          }
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
  captureByKeysValue(keys, data) {
    return _Util.default.captureByKeysValue(keys, data);
  }

  /**
   * Gets the env function.
   * @returns {string}
   */
  getEnv() {
    return SankeyAdapter.isLocal() && !this.ops.isProd ? 'getDevEnv' : 'getProdEnv';
  }

  /**
   * Opens a given url in blank tab.
   * @param {string} url
   */
  openUrl(url) {
    const a = document.createElement('a');
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
  getUrls() {
    const envFn = this.ops.env || this.getEnv();
    this.ops.urls = this.ops.urls || {};
    let urls = this[envFn]();
    Object.assign(urls, this.ops.urls);
    return urls;
  }

  /**
   * Checks if running in local or dev env
   * @returns {boolean}
   */
  static isLocal() {
    return _Util.default.isLocal();
  }

  /**
   * Logs message to screen
   * @param {string} msg The message to display
   * @param {object} ops Color options for console
   */
  static log(msg, ops) {
    _Util.default.log(msg, ops);
  }

  /**
   *  Logs message to screen.
   * @param {string} msg The message to display
   * @param {string} fn The type of message {log|warn|error}
   */
  log(msg) {
    let fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';
    SankeyAdapter.log(msg, {
      fn
    });
  }
}
var _default = exports.default = SankeyAdapter;