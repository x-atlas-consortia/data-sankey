/**
* 
* 4/15/2025, 9:56:33 AM | X Atlas Consortia Sankey 1.0.4 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/esnext.iterator.reduce.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _Util = _interopRequireDefault(require("./util/Util.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _shadow = /*#__PURE__*/new WeakMap();
class XACSankey extends HTMLElement {
  constructor() {
    var _this$ops;
    super();
    _classPrivateFieldInitSpec(this, _shadow, void 0);
    this.classes = {
      style: 'xac-style',
      loader: 'xac-loader'
    };
    this.filters = {};
    this.dataCallback = null;
    this.organsDict = {};
    this.organsDictByCategory = {};
    this.api = {
      context: 'sennet',
      sankey: 'https://ingest.api.sennetconsortium.org/datasets/sankey_data',
      token: null,
      ubkgOrgans: 'https://ontology.api.hubmapconsortium.org/organs?application_context='
    };
    this.containerDimensions = {};
    this.graphData = null;
    this.isLoading = true;
    this.groupByOrganCategoryKey = 'rui_code';
    this.validFilterMap = {
      group_name: 'dataset_group_name',
      dataset_type: 'dataset_dataset_type',
      organ: 'organ_type',
      status: 'dataset_status'
    };
    this.loading = {
      html: '<div class="c-sankey__loader"></div>',
      callback: null
    };
    this.handleOptions();
    if ((_this$ops = this.ops) !== null && _this$ops !== void 0 && _this$ops.useShadow) {
      _classPrivateFieldSet(_shadow, this, this.attachShadow({
        mode: "open"
      }));
      this.applyStyles();
    }
    this.fetchData();
  }

  /**
   * Sets the organTypes from UBKG.
   * @returns {Promise<void>}
   */
  async setOrganTypes() {
    const res = await fetch(this.api.ubkgOrgans + this.api.context);
    const organs = await res.json();
    for (let o of organs) {
      var _o$category, _o$term, _o$category2, _o$this$groupByOrganC;
      this.organsDict[o.term.trim().toLowerCase()] = ((_o$category = o.category) === null || _o$category === void 0 || (_o$category = _o$category.term) === null || _o$category === void 0 ? void 0 : _o$category.trim()) || ((_o$term = o.term) === null || _o$term === void 0 ? void 0 : _o$term.trim());
      const cat = ((_o$category2 = o.category) === null || _o$category2 === void 0 || (_o$category2 = _o$category2.term) === null || _o$category2 === void 0 ? void 0 : _o$category2.trim()) || o.term.trim();
      this.organsDictByCategory[cat] = this.organsDictByCategory[cat] || new Set();
      this.organsDictByCategory[cat].add((_o$this$groupByOrganC = o[this.groupByOrganCategoryKey]) === null || _o$this$groupByOrganC === void 0 ? void 0 : _o$this$groupByOrganC.trim());
    }
  }

  /**
   * Gets corresponding organ category from organ type. Example Lung (Left) -> Lung.
   * @param {string} str The organ type
   * @returns {string|*}
   */
  getOrganHierarchy(str) {
    if (!str) return str;
    let res = this.organsDict[str.trim().toLowerCase()];
    // fallback incase of missing unkg data
    if (!res) {
      const r = new RegExp(/.+?(?=\()/);
      res = str.match(r);
      return res && res.length ? res[0].trim() : str;
    }
    return res;
  }

  /**
   * Appends stylesheet to exposed shadow dom.
   */
  applyStyles() {
    var _classPrivateFieldGet2;
    if (!this.styleSheetPath) {
      console.warn('XACSankey.applyStyles No stylesheet provided.');
      return;
    }
    let s = document.createElement('link');
    s.className = this.classes.style;
    s.type = 'text/css';
    s.rel = 'stylesheet';
    s.href = this.styleSheetPath;
    (_classPrivateFieldGet2 = _classPrivateFieldGet(_shadow, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.appendChild(s);
  }

  /**
   * Retrieves options set via the element's options attr.
   */
  handleOptions() {
    this.ops = this.getAttribute('options');
    if (this.ops) {
      try {
        this.ops = JSON.parse(atob(this.ops));
        this.setOptions(this.ops);
      } catch (e) {
        console.error('XACSankey', e);
      }
    } else {
      this.ops = {};
    }
  }

  /**
   * Returns request headers.
   * @returns {{headers: {"Content-Type": string}}}
   */
  getHeaders() {
    let h = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (this.api.token) {
      h.headers.Authorization = "Bearer ".concat(this.api.token);
    }
    return h;
  }

  /**
   * Removes null values from obj.
   * @param {object} obj The object to perform the purge against
   */
  purgeObject(obj) {
    for (let i in obj) {
      if (obj[i] === null) {
        delete obj[i];
      }
    }
  }

  /**
   * Sets options to this instance.
   * @param {object} ops
   */
  setOptions(ops) {
    if (ops.filters) {
      this.filters = ops.filters;
      this.purgeObject(this.filters);
    }
    this.groupByOrganCategoryKey = ops.groupByOrganCategoryKey || this.groupByOrganCategoryKey;
    if (ops.loading) {
      Object.assign(this.loading, ops.loading);
    }
    if (ops.api) {
      Object.assign(this.api, ops.api);
    }
    if (ops.dataCallback) {
      this.dataCallback = ops.dataCallback;
    }
    if (ops.onDataBuildCallback) {
      this.onDataBuildCallback = ops.onDataBuildCallback;
    }
    if (ops.onNodeClickCallback) {
      this.onNodeClickCallback = ops.onNodeClickCallback;
    }
    if (ops.onNodeBuildCssCallback) {
      this.onNodeBuildCssCallback = ops.onNodeBuildCssCallback;
    }
    if (ops.onLabelClickCallback) {
      this.onLabelClickCallback = ops.onLabelClickCallback;
    }
    if (ops.validFilterMap) {
      Object.assign(this.validFilterMap, ops.validFilterMap);
      this.purgeObject(this.validFilterMap);
    }
    if (ops.d3) {
      this.d3 = ops.d3;
    }
    if (ops.styleSheetPath) {
      var _classPrivateFieldGet3;
      this.styleSheetPath = ops.styleSheetPath;
      (_classPrivateFieldGet3 = _classPrivateFieldGet(_shadow, this)) === null || _classPrivateFieldGet3 === void 0 || (_classPrivateFieldGet3 = _classPrivateFieldGet3.querySelector(".".concat(this.classes.style))) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.remove();
      this.applyStyles();
    }
    this.useEffect();
  }

  /**
   * Modifies the component attr so that attributeChangedCallback can be triggered.
   * @param {string} attr Name of a watched attribute.
   */
  useEffect() {
    let attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'data';
    this.setAttribute(attr, "".concat(Date.now()));
  }

  /**
   * Converts the filter from the URL to the field names returned from the sankey endpoint.
   * Also splits comma separated filter values into an array.
   * @returns {{}}
   */
  getValidFilters() {
    return Object.keys(this.filters).reduce((acc, key) => {
      if (this.validFilterMap[key.toLowerCase()] !== undefined) {
        acc[this.validFilterMap[key].toLowerCase()] = this.filters[key].split(',');
      }
      return acc;
    }, {});
  }

  /**
   * Gets and handles main sankey data to be visualized.
   * @returns {Promise<void>}
   */
  async fetchData() {
    if (this.validFilterMap.organ && !Object.keys(this.organsDict).length) {
      await this.setOrganTypes();
    }

    // call the sankey endpoint
    const res = await fetch(this.api.sankey, this.getHeaders());
    this.rawData = await res.json();
    if (this.rawData.message || res.status === 202) {
      this.handleLoader(this.rawData.message);
      return;
    }

    // Check if actual data has data property
    if (Array.isArray(this.rawData.data)) {
      this.rawData = this.rawData.data;
    }
    if (!Array.isArray(this.rawData)) {
      console.error('XACSankey > Incorrectly formatted data. Data must be in array of dictionaries');
      return;
    }
    let data = [];
    if (this.validFilterMap.organ) {
      for (let row of this.rawData) {
        if (Array.isArray(row[this.validFilterMap.organ])) {
          let groups = new Set();
          for (let g of row[this.validFilterMap.organ]) {
            groups.add(this.getOrganHierarchy(g));
          }
          data.push(_objectSpread(_objectSpread({}, row), {}, {
            [this.validFilterMap.organ]: Array.from(groups)
          }));
        } else {
          data.push(_objectSpread(_objectSpread({}, row), {}, {
            [this.validFilterMap.organ]: this.getOrganHierarchy(row[this.validFilterMap.organ])
          }));
        }
      }
    }
    if (this.dataCallback) {
      data = data.map(this.dataCallback);
    }

    // filter the data if there are valid filters
    const validFilters = this.getValidFilters();
    this.filteredData = data;
    if (Object.keys(validFilters).length > 0) {
      const isValidFilter = (validValues, val) => !!validValues.includes(val.toLowerCase());

      // Filter the data based on the valid filters
      this.filteredData = data.filter(row => {
        // this acts as an AND filter
        for (const [field, validValues] of Object.entries(validFilters)) {
          if (Array.isArray(row[field])) {
            let res = [];

            // find out which values in array are valid
            for (let i = 0; i < row[field].length; i++) {
              if (isValidFilter(validValues, row[field][i])) {
                res.push(row[field][i]);
              }
            }

            // take valid values and readjust the row[field]
            if (res.length) {
              row[field] = [];
              for (let i = 0; i < res.length; i++) {
                row[field].push(res[i]);
              }
            }

            // tell the filter if to include row with boolean result
            return res.length > 0;
          } else {
            return isValidFilter(validValues, row[field]);
          }
        }
        return true;
      });
    }
    XACSankey.log('filteredData', {
      data: this.filteredData,
      color: 'orange'
    });
    const columnNames = Object.values(this.validFilterMap);
    const graphMap = {
      nodes: {},
      links: {}
    };
    let i = 0;

    // First build the nodes using a dictionary for faster access time
    this.filteredData.forEach((row, rowIndex) => {
      columnNames.forEach((columnName, columnIndex) => {
        const buildNode = (colName, val) => {
          let node = graphMap.nodes[val];
          if (node === undefined) {
            graphMap.nodes[val] = {
              node: i,
              name: val,
              columnName: colName,
              columnIndex,
              weight: 0
            };
            node = graphMap.nodes[val];
            i++;
          }
          node.weight = node.weight + 1;
        };
        if (Array.isArray(row[columnName])) {
          for (let v of row[columnName]) {
            buildNode(columnName, v);
          }
        } else {
          buildNode(columnName, row[columnName]);
        }
      });
    });
    this.filteredData.forEach(row => {
      columnNames.forEach((columnName, columnIndex) => {
        if (columnIndex !== columnNames.length - 1) {
          const buildLink = (source, target) => {
            const key = "".concat(source.name, "_").concat(target.name);
            // Find a link O(1)
            let link = graphMap.links[key];
            if (link === undefined) {
              graphMap.links[key] = {
                source: source.node,
                target: target.node,
                value: 0
              };
              link = graphMap.links[key];
            }
            link.value = link.value + 1;
          };

          // Because we can have data values that are arrays with strings, we could end up with many
          // sources & targets on a particular row/column.
          // So we need to put these in buckets to later create the links
          let sources = [];
          let targets = [];
          const setSourcesTargets = (bucket, current) => {
            if (Array.isArray(current)) {
              for (let v of current) {
                bucket.push(graphMap.nodes[v]);
              }
            } else {
              bucket.push(graphMap.nodes[current]);
            }
          };
          setSourcesTargets(sources, row[columnName]);
          setSourcesTargets(targets, row[columnNames[columnIndex + 1]]);
          if (sources.length > 1) {
            for (let t of targets) {
              buildLink(sources[0], t);
            }
          } else {
            buildLink(sources[0], targets[0]);
          }
        }
      });
    });
    XACSankey.log('graphMap', {
      data: graphMap,
      color: 'green'
    });
    this.graphData = {
      nodes: Object.values(graphMap.nodes),
      links: Object.values(graphMap.links)
    };
    if (this.onDataBuildCallback) {
      this.onDataBuildCallback(this);
    }
    if (Object.values(graphMap.nodes).length) {
      this.useEffect('fetch');
    } else {
      this.isLoading = false;
      this.handleLoader('No data from filters');
    }
  }

  /**
   * Grabs client size info.
   */
  handleWindowResize() {
    this.containerDimensions.width = this.clientWidth;
    this.containerDimensions.height = Math.max(this.clientHeight, 1080);
  }

  /**
   * Builds the visualization.
   */
  buildGraph() {
    if (!this.d3) {
      console.error('No D3 library loaded.');
    }
    if (!this.graphData || !this.graphData.nodes.length || !this.containerDimensions.width || !this.containerDimensions.height || !this.d3) return;
    const {
      d3,
      d3sankey,
      sankeyLinkHorizontal
    } = _objectSpread({}, this.d3);

    // svg dimensions
    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    };
    const width = this.containerDimensions.width - margin.left - margin.right;
    const height = this.containerDimensions.height - margin.top - margin.bottom;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Layout the svg element
    const container = this.ops.useShadow ? d3.select(_classPrivateFieldGet(_shadow, this)) : d3.select(_classPrivateFieldGet(_shadow, this));
    const svg = container.append('svg').attr('width', width).attr('height', height).attr('transform', "translate(".concat(margin.left, ",").concat(margin.top, ")"));

    // Set up the Sankey generator
    const sankey = d3sankey().nodeWidth(30).nodePadding(15).extent([[0, margin.top], [width, height - margin.bottom]]);

    // Create the Sankey layout
    const {
      nodes,
      links
    } = sankey({
      nodes: this.graphData.nodes.map(d => Object.assign({}, d)),
      links: this.graphData.links.map(d => Object.assign({}, d))
    });

    // Define the drag behavior
    const drag = d3.drag().on('start', function (event, d) {
      d3.select(this).classed("dragging", true);
      d.dragging = {
        offsetX: event.x - d.x0,
        offsetY: event.y - d.y0
      };
    }).on('drag', function (event, d) {
      d.x0 = Math.max(0, Math.min(width - d.x1 + d.x0, event.x - d.dragging.offsetX));
      d.y0 = Math.max(0, Math.min(height - d.y1 + d.y0, event.y - d.dragging.offsetY));
      d.x1 = d.x0 + sankey.nodeWidth();
      d.y1 = d.y0 + (d.y1 - d.y0);
      d3.select(this).attr('transform', "translate(".concat(d.x0, ",").concat(d.y0, ")"));
      svg.selectAll('.c-sankey__link').attr('d', sankeyLinkHorizontal());
      sankey.update({
        nodes,
        links
      });
      link.attr('d', sankeyLinkHorizontal());
    }).on('end', function (event, d) {
      delete d.dragging;
    });

    // Links
    const link = svg.append('g').selectAll('.link').data(links).join('path').attr('class', 'c-sankey__link').attr('d', sankeyLinkHorizontal()).attr('stroke-width', d => Math.max(2, d.width)).append('title').text(d => "".concat(d.source.name, " \u2192 ").concat(d.target.name, "\n").concat(d.value, " Datasets")); // Tooltip

    // Nodes
    const node = svg.append('g').selectAll('.node').data(nodes).join('g').attr('class', d => {
      let classes = "c-sankey__node c-sankey__node--".concat(d.columnName);
      if (this.onNodeBuildCssCallback) {
        classes = classes + ' ' + this.onNodeBuildCssCallback(d);
      }
      return classes;
    }).attr('transform', d => "translate(".concat(d.x0, ",").concat(d.y0, ")")).call(drag).on('click', ((e, d) => {
      if (e.defaultPrevented) return;
      if (this.onNodeClickCallback) {
        this.onNodeClickCallback(e, d);
      }
    }).bind(this));
    node.append('rect').attr('height', d => Math.max(5, d.y1 - d.y0)).attr('width', sankey.nodeWidth()).attr('fill', d => color(d.name)).attr('stroke-width', 0).append('title').text(d => "".concat(d.name, "\n").concat(d.value, " Datasets")); // Tooltip

    node.append('text').attr('class', 'c-sankey__label').attr('x', -6).attr('y', d => (d.y1 - d.y0) / 2).attr('dy', '0.35em').attr('text-anchor', 'end').text(d => d.name).filter(d => d.x0 < width / 2).attr('x', 6 + sankey.nodeWidth()).attr('text-anchor', 'start').on('click', ((e, d) => {
      if (e.defaultPrevented) return;
      if (this.onLabelClickCallback) {
        this.onLabelClickCallback(e, d);
      }
    }).bind(this));
    node.append('text').attr('class', 'c-sankey__value').attr('y', sankey.nodeWidth() / 1.9).attr('x', d => (d.y1 - d.y0) / 2 * -1).attr('dy', '0.35em').attr('text-anchor', 'middle').text(d => Math.max(5, d.y1 - d.y0) > 15 ? d.weight : '').on('click', ((e, d) => {
      if (e.defaultPrevented) return;
      if (this.onNodeClickCallback) {
        this.onNodeClickCallback(e, d);
      }
    }).bind(this));
    this.isLoading = false;
    this.useEffect('graph');
  }

  /**
   * Callback for handling window resize.
   */
  onWindowResize() {
    this.handleWindowResize();
    this.useEffect('options');
  }

  /**
   * Runs when the element is connected to the DOM.
   */
  connectedCallback() {
    this.handleWindowResize();
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  /**
   * Determines which attributes to watch for triggering change notifications to attributeChangedCallback.
   * @returns {string[]}
   */
  static get observedAttributes() {
    return ['data', 'fetch', 'options', 'graph'];
  }

  /**
   * Clears viewport of svgs.
   */
  clearCanvas() {
    if (this.ops.useShadow) {
      const l = _classPrivateFieldGet(_shadow, this).querySelectorAll('svg');
      l.forEach(el => {
        el.remove();
      });
    } else {
      this.innerHTML = '';
    }
  }

  /**
   * Displays or removes loading spinner.
   */
  handleLoader(msg) {
    const ctx = this.ops.useShadow ? _classPrivateFieldGet(_shadow, this) : this;
    ctx.querySelectorAll(".".concat(this.classes.loader)).forEach(el => {
      el.remove();
    });
    if (this.isLoading || msg) {
      if (!this.loading.callback) {
        const loader = document.createElement("div");
        loader.innerHTML = (this.isLoading ? this.loading.html : '') + (msg ? "<span class=\"c-sankey__msg\">".concat(msg, "</span>") : '');
        loader.className = this.classes.loader;
        ctx.appendChild(loader);
      }
    }
    if (this.loading.callback) {
      this.loading.callback(this, msg);
    }
  }

  /**
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   * @param property
   * @param oldValue
   * @param newValue
   */
  attributeChangedCallback(property, oldValue, newValue) {
    this.log("XACSankey.attributeChangedCallback: ".concat(property, " ").concat(newValue));
    if (oldValue === newValue) return;
    this.handleLoader();
    if (property !== 'graph') {
      if (property === 'data') {
        this.fetchData().then((() => {
          this.clearCanvas();
          this.buildGraph();
        }).bind(this));
      } else {
        this.clearCanvas();
        this.buildGraph();
      }
    }
  }

  /**
   * Flips an obj on its keys.
   * Example: Given {a: b} -> {b: a}
   * @param obj
   * @returns {{}}
   */
  flipObj(obj) {
    return Object.keys(obj).reduce((ret, key) => {
      ret[obj[key]] = key;
      return ret;
    }, {});
  }

  /**
   * Checks if running in local or dev env
   * @returns {boolean}
   */
  static isLocal() {
    _Util.default.isLocal();
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
    XACSankey.log(msg, {
      fn
    });
  }
}
customElements.define('xac-sankey', XACSankey);
var _default = exports.default = XACSankey;