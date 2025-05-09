/**
* 
* 5/9/2025, 2:19:30 PM | X Atlas Consortia Sankey 1.0.9 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
    super();
    _classPrivateFieldInitSpec(this, _shadow, void 0);
    this.classes = {
      style: 'xac-style',
      loader: 'xac-loader'
    };
    if (XACSankey.isLocal()) {
      console.log('XACSankey', this);
    }
    this.filters = {};
    this.useShadow = true;
    this.dataCallback = null;
    this.organsDict = {};
    this.organsDictByCategory = {};
    this.api = {
      context: 'sennet',
      sankey: 'https://ingest.api.{context}consortium.org/datasets/sankey_data',
      token: null,
      ubkgOrgans: 'https://ontology.api.hubmapconsortium.org/organs?application_context='
    };
    this.containerDimensions = {};
    this.graphData = null;
    this.isLoading = true;
    this.groupByOrganCategoryKey = 'rui_code';
    this.displayableFilterMap = {};
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
    this.dimensions = {
      breakpoint: 922,
      mobileMaxWidth: 1200,
      desktopMaxHeight: 1080
    };
  }
  init() {
    this.handleOptions();
    if (this.useShadow) {
      _classPrivateFieldSet(_shadow, this, this.attachShadow({
        mode: "open"
      }));
      this.applyStyles();
    }
    this.fetchData();
  }

  /**
   * Returns a list of green colors
   * @returns {string[]}
   */
  greenColors() {
    return ['#8ecb93', '#195905', '#18453b', '#1b4d3e', '#006600', '#1e4d2b', '#006b3c', '#006a4e', '#00703c', '#087830', '#2a8000', '#008000', '#177245', '#306030', '#138808', '#009150', '#355e3b', '#059033', '#009900', '#009f6b', '#009e60', '#00a550', '#507d2a', '#00a877', '#228b22', '#00ab66', '#2e8b57', '#8db600', '#4f7942', '#03c03c', '#1cac78', '#4cbb17'];
  }

  /**
   * Returns a list of pink colors
   * @returns {string[]}
   */
  pinkColors() {
    return ['#FBA0E3', '#DA70D6', '#F49AC2', '#FFA6C9', '#F78FA7', '#F08080', '#FF91A4', '#FF9899', '#E18E96', '#FC8EAC', '#FE8C68', '#F88379', '#FF69B4', '#FF69B4', '#FC6C85', '#DCAE96'];
  }

  /**
   * Sets a color theme for sankey rect bars
   * @param {object} theme
   */
  setTheme(theme = {}) {
    const d3 = this.d3.d3;
    this.theme = {
      byScheme: {
        dataset_type_hierarchy: d3.scaleOrdinal(this.greenColors()),
        organ_type: d3.scaleOrdinal(this.pinkColors())
      },
      byValues: {
        human: '#ffc255',
        mouse: '#b97f17',
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
    Object.assign(this.theme, theme);
    this.purgeObject(this.theme);
  }

  /**
   * Sets the organTypes from UBKG.
   * @returns {Promise<void>}
   */
  async setOrganTypes() {
    const res = await fetch(this.api.ubkgOrgans + this.api.context);
    const organs = await res.json();
    for (let o of organs) {
      this.organsDict[o.term.trim().toLowerCase()] = o.category?.term?.trim() || o.term?.trim();
      const cat = o.category?.term?.trim() || o.term.trim();
      this.organsDictByCategory[cat] = this.organsDictByCategory[cat] || new Set();
      this.organsDictByCategory[cat].add(o[this.groupByOrganCategoryKey]?.trim());
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
    if (!this.styleSheetPath) {
      console.warn('XACSankey.applyStyles No stylesheet provided.');
      return;
    }
    let s = document.createElement('link');
    s.className = this.classes.style;
    s.type = 'text/css';
    s.rel = 'stylesheet';
    s.href = this.styleSheetPath;
    _classPrivateFieldGet(_shadow, this)?.appendChild(s);
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
      h.headers.Authorization = `Bearer ${this.api.token}`;
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
    if (XACSankey.isLocal()) {
      console.log('XACSankey', ops);
    }
    if (ops.filters) {
      this.filters = ops.filters;
      this.purgeObject(this.filters);
    }
    this.groupByOrganCategoryKey = ops.groupByOrganCategoryKey || this.groupByOrganCategoryKey;
    if (ops.loading) {
      Object.assign(this.loading, ops.loading);
    }
    if (ops.dimensions) {
      Object.assign(this.dimensions, ops.dimensions);
    }
    if (ops.api) {
      Object.assign(this.api, ops.api);
    }
    if (ops.useShadow) {
      this.useShadow = ops.useShadow;
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
    if (ops.onLinkBuildCssCallback) {
      this.onLinkBuildCssCallback = ops.onLinkBuildCssCallback;
    }
    if (ops.onLabelClickCallback) {
      this.onLabelClickCallback = ops.onLabelClickCallback;
    }
    if (ops.onLinkClickCallback) {
      this.onLinkClickCallback = ops.onLinkClickCallback;
    }
    if (ops.validFilterMap) {
      Object.assign(this.validFilterMap, ops.validFilterMap);
      this.purgeObject(this.validFilterMap);
    }
    if (ops.displayableFilterMap) {
      Object.assign(this.displayableFilterMap, ops.displayableFilterMap);
      this.purgeObject(this.displayableFilterMap);
    }
    if (ops.d3) {
      this.d3 = ops.d3;
    }
    if (ops.theme) {
      this.setTheme(ops.theme);
    }
    if (ops.styleSheetPath) {
      this.styleSheetPath = ops.styleSheetPath;
      _classPrivateFieldGet(_shadow, this)?.querySelector(`.${this.classes.style}`)?.remove();
      this.applyStyles();
    }
    this.useEffect();
  }

  /**
   * Modifies the component attr so that attributeChangedCallback can be triggered.
   * @param {string} attr Name of a watched attribute.
   */
  useEffect(attr = 'data') {
    this.setAttribute(attr, `${Date.now()}`);
  }

  /**
   * Converts the filter from the URL to the field names returned from the sankey endpoint.
   * Also splits comma separated filter values into an array.
   * @returns {{}}
   */
  getValidFilters(filterMap) {
    return Object.keys(this.filters).reduce((acc, key) => {
      if (filterMap[key.toLowerCase()] !== undefined) {
        acc[filterMap[key].toLowerCase()] = this.filters[key].split(',');
      }
      return acc;
    }, {});
  }
  getUrl() {
    if (this.ops.api?.sankey) return this.ops.api?.sankey;
    let url = this.api.sankey;
    url = url.replace('{context}', this.api.context);
    return _Util.default.isLocal() && !this.ops.isProd ? url.replace('.api.', '-api.dev.') : url;
  }
  filterData(data, filterMap) {
    // filter the data if there are valid filters
    const validFilters = this.getValidFilters(filterMap);
    this.filteredData = data;
    if (Object.keys(validFilters).length > 0) {
      const isValidFilter = (validValues, val) => !!validValues.includes(val.toLowerCase());
      let validRows;
      let points = 0;
      // Filter the data based on the valid filters
      this.filteredData = data.filter(row => {
        validRows = [];
        points = 0;
        for (const [field, validValues] of Object.entries(validFilters)) {
          if (Array.isArray(row[field])) {
            // find out which values in array are valid
            for (let i = 0; i < row[field].length; i++) {
              if (isValidFilter(validValues, row[field][i])) {
                validRows.push(row[field][i]);
              }
            }
            // take valid values and readjust the row[field]
            if (validRows.length) {
              row[field] = [];
              for (let i = 0; i < validRows.length; i++) {
                row[field].push(validRows[i]);
              }
              points++;
            }
          } else {
            if (isValidFilter(validValues, row[field])) {
              points++;
            }
          }
        }
        return Object.keys(validFilters).length === points;
      });
    }
    XACSankey.log('filteredData', {
      data: this.filteredData,
      color: 'orange'
    });
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
    const res = await fetch(this.getUrl(), this.getHeaders());
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
    this.filterData(data, this.validFilterMap);
    let columnsToShow = this.validFilterMap;
    if (Object.keys(this.displayableFilterMap).length) {
      columnsToShow = this.displayableFilterMap;
    }
    const columnNames = Object.values(columnsToShow);
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
            const key = `${source.name}_${target.name}`;
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
    if (this.clientWidth < this.dimensions.breakpoint) {
      this.containerDimensions.width = this.dimensions.mobileMaxWidth;
    } else {
      this.containerDimensions.width = this.clientWidth;
    }
    this.containerDimensions.height = this.dimensions.desktopMaxHeight || this.clientHeight;
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
    const container = this.useShadow ? d3.select(_classPrivateFieldGet(_shadow, this)) : d3.select(_classPrivateFieldGet(_shadow, this));
    const svg = container.append('svg').attr('width', width).attr('height', height).attr('transform', `translate(${margin.left},${margin.top})`);

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
      d3.select(this).attr('transform', `translate(${d.x0},${d.y0})`);
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
    const link = svg.append('g').selectAll('.link').data(links).join('path').attr('class', d => {
      let classes = 'c-sankey__link';
      if (this.onLinkBuildCssCallback) {
        classes = classes + ' ' + this.onLinkBuildCssCallback(d);
      }
      return classes;
    }).attr('d', sankeyLinkHorizontal()).attr('stroke-width', d => Math.max(2, d.width)).on('click', ((e, d) => {
      if (e.defaultPrevented) return;
      if (this.onLinkClickCallback) {
        this.onLinkClickCallback(e, d);
      }
    }).bind(this)).append('title').text(d => `${d.source.name} → ${d.target.name}\n${d.value} Datasets`); // Tooltip

    // Nodes
    const node = svg.append('g').selectAll('.node').data(nodes).join('g').attr('class', d => {
      let classes = `c-sankey__node c-sankey__node--${d.columnName}`;
      if (this.onNodeBuildCssCallback) {
        classes = classes + ' ' + this.onNodeBuildCssCallback(d);
      }
      return classes;
    }).attr('transform', d => `translate(${d.x0},${d.y0})`).call(drag).on('click', ((e, d) => {
      if (e.defaultPrevented) return;
      if (this.onNodeClickCallback) {
        this.onNodeClickCallback(e, d);
      }
    }).bind(this));
    node.append('rect').attr('height', d => Math.max(5, d.y1 - d.y0)).attr('width', sankey.nodeWidth()).attr('fill', d => {
      if (this.theme?.byValues && this.theme.byValues[d.name.toLowerCase()]) {
        const color = this.theme.byValues[d.name.toLowerCase()].split(':');
        return color[0];
      }
      if (this.theme?.byScheme && this.theme.byScheme[d.columnName]) {
        return this.theme.byScheme[d.columnName](d.name);
      }
      return color(d.name);
    }).attr('stroke-width', 0).append('title').text(d => `${d.name}\n${d.value} Datasets`); // Tooltip

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
    this.init();
    this.setTheme();
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
    if (this.useShadow) {
      const l = _classPrivateFieldGet(_shadow, this)?.querySelectorAll('svg');
      l?.forEach(el => {
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
    const ctx = this.useShadow ? _classPrivateFieldGet(_shadow, this) : this;
    if (ctx) {
      ctx.querySelectorAll(`.${this.classes.loader}`).forEach(el => {
        el.remove();
      });
      if (this.isLoading || msg) {
        if (!this.loading.callback) {
          const loader = document.createElement("div");
          loader.innerHTML = (this.isLoading ? this.loading.html : '') + (msg ? `<span class="c-sankey__msg">${msg}</span>` : '');
          loader.className = this.classes.loader;
          ctx.appendChild(loader);
        }
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
    this.log(`XACSankey.attributeChangedCallback: ${property} ${newValue}`);
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
    XACSankey.log(msg, {
      fn
    });
  }
}
customElements.define('xac-sankey', XACSankey);
var _default = exports.default = XACSankey;