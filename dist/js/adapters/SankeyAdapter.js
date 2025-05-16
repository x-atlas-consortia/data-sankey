/**
* 
* 5/16/2025, 2:32:29 PM | X Atlas Consortia Sankey 1.0.11 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Util = _interopRequireDefault(require("../util/Util.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SankeyAdapter {
  constructor(context, ops = {}) {
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
  eq(s1, s2, insensitive = true) {
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
   * Checks if current column is status column
   * @param col
   * @returns {boolean}
   */
  isStatusColumn(col) {
    return this.eq(col, 'status');
  }

  /**
   * Checks if current column is dataset type column
   * @param col
   * @returns {boolean}
   */
  isDatasetTypeColumn(col) {
    return this.eq(col, 'dataset_type');
  }

  /**
   * Returns the actual value from the data with proper casing
   * @param col
   * @param needles
   * @returns {any[]}
   */
  getDataValueByColumn(col, needles) {
    if (this.ctx.validFilterMap[col] === undefined) return [];
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
  log(msg, fn = 'log') {
    SankeyAdapter.log(msg, {
      fn
    });
  }
}
var _default = exports.default = SankeyAdapter;