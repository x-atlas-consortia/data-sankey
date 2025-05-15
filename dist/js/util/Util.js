/**
* 
* 5/15/2025, 11:41:04 AM | X Atlas Consortia Sankey 1.0.10 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Util {
  /**
   * Compares two string values for equality
   * @param {string} s1
   * @param {string} s2
   * @param {boolean} insensitive
   * @returns {boolean}
   */
  static eq(s1, s2, insensitive = true) {
    let res = s1 === s2;
    if (insensitive && s1 !== undefined && s2 !== undefined) {
      res = s1?.toLowerCase() === s2?.toLowerCase();
    }
    return res;
  }

  /**
   * Will capture data from particular dictionary given matching keys and values.
   * @param {object} keys The keys and values to match against {matchKey[string], matchValue[string], keepKey[string]}
   * @param {array} data List of data to filter through
   * @returns {array[string]}
   */
  static captureByKeysValue(keys, data) {
    let result = new Set();
    for (let d of data) {
      if (Util.eq(d[keys.matchKey], keys.matchValue)) {
        if (d[keys.keepKey]) {
          result.add(d[keys.keepKey]);
        }
      }
    }
    return Array.from(result);
  }

  /**
   * Checks if running in local or dev env
   * @returns {boolean}
   */
  static isLocal() {
    return location.host.indexOf('localhost') !== -1 || location.host.indexOf('.dev') !== -1;
  }

  /**
   * Logs message to screen
   * @param {string} msg The message to display
   * @param {object} ops Color options for console
   */
  static log(msg, ops) {
    ops = ops || {};
    let {
      fn,
      color,
      data
    } = ops;
    fn = fn || 'log';
    color = color || '#bada55';
    data = data || '';
    if (Util.isLocal()) {
      console[fn](`%c ${msg}`, `background: #222; color: ${color}`, data);
    }
  }

  /**
   *  Logs message to screen.
   * @param {string} msg The message to display
   * @param {string} fn The type of message {log|warn|error}
   */
  log(msg, fn = 'log') {
    Util.log(msg, {
      fn
    });
  }
}
var _default = exports.default = Util;