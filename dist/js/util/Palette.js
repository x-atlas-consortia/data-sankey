/**
* 
* 10/30/2025, 10:28:42 AM | X Atlas Consortia Sankey 1.0.16 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Palette = {
  /**
   * Returns a list of blue grey colors
   * @returns {string[]}
   */
  blueGreyColors: ['#7492B9', '#759eae', '#7c99b1', '#c0c8cf', '#a3aabe', '#9cadc7', '#7f92a0'],
  /**
   * Returns a list of yellow colors
   * @returns {string[]}
   */
  yellowColors: ['#ffc255', '#b97f17', '#E4D00A', '#EEDC82'],
  /**
   * Returns a list of green colors
   * @returns {string[]}
   */
  greenColors: ['#8ecb93', '#195905', '#18453b', '#1b4d3e', '#006600', '#1e4d2b', '#006b3c', '#006a4e', '#00703c', '#087830', '#2a8000', '#008000', '#177245', '#306030', '#138808', '#009150', '#355e3b', '#059033', '#009900', '#009f6b', '#009e60', '#00a550', '#507d2a', '#00a877', '#228b22', '#00ab66', '#2e8b57', '#8db600', '#4f7942', '#03c03c', '#1cac78', '#4cbb17'],
  /**
   * Returns a list of pink colors
   * @returns {string[]}
   */
  pinkColors: ['#FBA0E3', '#DA70D6', '#F49AC2', '#FFA6C9', '#F78FA7', '#F08080', '#FF91A4', '#FF9899', '#E18E96', '#FC8EAC', '#FE8C68', '#F88379', '#FF69B4', '#FF69B4', '#FC6C85', '#DCAE96'],
  statusColorMap: {
    unpublished: 'grey',
    published: '#198754',
    qa: '#0dcaf0:#000000',
    error: '#dc3545',
    invalid: '#dc3545',
    new: '#6f42c1',
    processing: '#6c757d',
    submitted: '#0dcaf0:#000000',
    hold: '#6c757d',
    reopened: '#6f42c1',
    reorganized: '#0dcaf0:#000000',
    valid: '#198754',
    incomplete: '#ffc107:#212529'
  }
};
var _default = exports.default = Palette;