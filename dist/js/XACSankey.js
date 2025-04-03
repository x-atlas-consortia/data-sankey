function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _shadow = /*#__PURE__*/new WeakMap();
var XACSankey = /*#__PURE__*/function (_HTMLElement) {
  function XACSankey() {
    var _this$ops;
    var _this;
    _classCallCheck(this, XACSankey);
    _this = _callSuper(this, XACSankey);
    _classPrivateFieldInitSpec(_this, _shadow, void 0);
    _this.classes = {
      style: 'xac-style',
      loader: 'xac-loader'
    };
    _this.filters = {};
    _this.dataCallback = null;
    _this.api = {
      url: 'https://entity-api.dev.sennetconsortium.org/datasets/sankey_data',
      token: null
    };
    _this.containerDimensions = {};
    _this.graphData = null;
    _this.isLoading = true;
    _this.validFilterMap = {
      group_name: 'dataset_group_name',
      dataset_type: 'dataset_dataset_type',
      organ: 'organ_type',
      status: 'dataset_status'
    };
    _this.loading = {
      html: '<div class="c-sankey__loader"></div>',
      callback: null
    };
    _this.handleOptions();
    if ((_this$ops = _this.ops) !== null && _this$ops !== void 0 && _this$ops.useShadow) {
      _classPrivateFieldSet(_shadow, _this, _this.attachShadow({
        mode: "open"
      }));
      _this.applyStyles();
    }
    _this.fetchData();
    return _this;
  }
  _inherits(XACSankey, _HTMLElement);
  return _createClass(XACSankey, [{
    key: "applyStyles",
    value: function applyStyles() {
      var _classPrivateFieldGet2;
      if (!this.styleSheetPath) {
        console.warn('XACSankey.applyStyles No stylesheet provided.');
        return;
      }
      var s = document.createElement('link');
      s.className = this.classes.style;
      s.type = 'text/css';
      s.rel = 'stylesheet';
      s.href = this.styleSheetPath;
      (_classPrivateFieldGet2 = _classPrivateFieldGet(_shadow, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.appendChild(s);
    }
  }, {
    key: "handleOptions",
    value: function handleOptions() {
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
  }, {
    key: "getHeaders",
    value: function getHeaders() {
      var h = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      if (this.api.token) {
        h.headers.Authorization = "Bearer ".concat(this.api.token);
      }
      return h;
    }
  }, {
    key: "setOptions",
    value: function setOptions(ops) {
      this.filters = ops.filters || this.filters;
      this.api = ops.api || this.api;
      this.loading = ops.loading || this.loading;
      this.dataCallback = ops.dataCallback || this.dataCallback;
      this.validFilterMap = ops.validFilterMap || this.validFilterMap;
      this.d3 = ops.d3 || this.d3;
      if (ops.styleSheetPath) {
        var _classPrivateFieldGet3;
        this.styleSheetPath = ops.styleSheetPath;
        (_classPrivateFieldGet3 = _classPrivateFieldGet(_shadow, this)) === null || _classPrivateFieldGet3 === void 0 || (_classPrivateFieldGet3 = _classPrivateFieldGet3.querySelector(".".concat(this.classes.style))) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.remove();
        this.applyStyles();
      }
      this.useEffect();
    }

    /**
     * Modifies the component attr so that attributeChangedCallback can be triggered
     * @param attr
     */
  }, {
    key: "useEffect",
    value: function useEffect() {
      var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'data';
      this.setAttribute(attr, "".concat(Date.now()));
    }
  }, {
    key: "getValidFilters",
    value: function getValidFilters() {
      var _this2 = this;
      // converts the filter from the URL to the field names returned from the sankey endpoint
      // also splits comma separated filter values into an array
      return Object.keys(this.filters).reduce(function (acc, key) {
        if (_this2.validFilterMap[key.toLowerCase()] !== undefined) {
          acc[_this2.validFilterMap[key].toLowerCase()] = _this2.filters[key].split(',');
        }
        return acc;
      }, {});
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var res, data, validFilters, filteredData, columnNames, newGraph;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch(this.api.url, this.getHeaders());
            case 2:
              res = _context.sent;
              _context.next = 5;
              return res.json();
            case 5:
              data = _context.sent;
              if (this.dataCallback) {
                data = data.map(this.dataCallback);
              }

              // filter the data if there are valid filters
              validFilters = this.getValidFilters();
              filteredData = data;
              if (Object.keys(validFilters).length > 0) {
                // Filter the data based on the valid filters
                filteredData = data.filter(function (row) {
                  // this acts as an AND filter
                  for (var _i = 0, _Object$entries = Object.entries(validFilters); _i < _Object$entries.length; _i++) {
                    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                      field = _Object$entries$_i[0],
                      validValues = _Object$entries$_i[1];
                    if (!validValues.includes(row[field].toLowerCase())) {
                      return false;
                    }
                  }
                  return true;
                });
              }

              // group the data into nodes and links
              columnNames = Object.values(this.validFilterMap);
              newGraph = {
                nodes: [],
                links: []
              };
              filteredData.forEach(function (row) {
                columnNames.forEach(function (columnName, columnIndex) {
                  if (columnIndex !== columnNames.length - 1) {
                    var found = newGraph.nodes.find(function (found) {
                      return found.column === columnIndex && found.name === row[columnNames[columnIndex]];
                    });
                    if (found === undefined) {
                      found = {
                        node: newGraph.nodes.length,
                        name: row[columnName],
                        column: columnIndex
                      };
                      newGraph.nodes.push(found);
                    }
                    var found2 = newGraph.nodes.find(function (found2) {
                      return found2.column === columnIndex + 1 && found2.name === row[columnNames[columnIndex + 1]];
                    });
                    if (found2 === undefined) {
                      found2 = {
                        node: newGraph.nodes.length,
                        name: row[columnNames[columnIndex + 1]],
                        column: columnIndex + 1
                      };
                      newGraph.nodes.push(found2);
                    }
                    var found3 = newGraph.links.find(function (found3) {
                      return found3.source === found.node && found3.target === found2.node;
                    });
                    if (found3 === undefined) {
                      found3 = {
                        source: found.node,
                        target: found2.node,
                        value: 0
                      };
                      newGraph.links.push(found3);
                    }
                    found3.value = found3.value + 1;
                  }
                });
              });
              this.isLoading = false;
              this.graphData = newGraph;
              this.useEffect('fetch');
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function fetchData() {
        return _fetchData.apply(this, arguments);
      }
      return fetchData;
    }()
  }, {
    key: "handleWindowResize",
    value: function handleWindowResize() {
      this.containerDimensions.width = this.clientWidth;
      this.containerDimensions.height = Math.max(this.clientHeight, 1080);
    }
  }, {
    key: "buildGraph",
    value: function buildGraph() {
      if (!this.d3) {
        console.error('No D3 library loaded.');
      }
      if (!this.graphData || !this.containerDimensions.width || !this.containerDimensions.height || !this.d3) return;
      var _this$d = _objectSpread({}, this.d3),
        d3 = _this$d.d3,
        d3sankey = _this$d.d3sankey,
        sankeyLinkHorizontal = _this$d.sankeyLinkHorizontal;

      // svg dimensions
      var margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      };
      var width = this.containerDimensions.width - margin.left - margin.right;
      var height = this.containerDimensions.height - margin.top - margin.bottom;
      var color = d3.scaleOrdinal(d3.schemeCategory10);

      // Layout the svg element
      var container = this.ops.useShadow ? d3.select(_classPrivateFieldGet(_shadow, this)) : d3.select(_classPrivateFieldGet(_shadow, this));
      var svg = container.append('svg').attr('width', width).attr('height', height).attr('transform', "translate(".concat(margin.left, ",").concat(margin.top, ")"));

      // Set up the Sankey generator
      var sankey = d3sankey().nodeWidth(30).nodePadding(15).extent([[0, margin.top], [width, height - margin.bottom]]);

      // Create the Sankey layout
      var _sankey = sankey({
          nodes: this.graphData.nodes.map(function (d) {
            return Object.assign({}, d);
          }),
          links: this.graphData.links.map(function (d) {
            return Object.assign({}, d);
          })
        }),
        nodes = _sankey.nodes,
        links = _sankey.links;

      // Define the drag behavior
      var drag = d3.drag().on('start', function (event, d) {
        d3.select(this).raise();
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
          nodes: nodes,
          links: links
        });
        link.attr('d', sankeyLinkHorizontal());
      }).on('end', function (event, d) {
        delete d.dragging;
      });

      // Links
      var link = svg.append('g').selectAll('.link').data(links).join('path').attr('class', 'c-sankey__link').attr('d', sankeyLinkHorizontal()).attr('stroke-width', function (d) {
        return Math.max(2, d.width);
      }).append('title').text(function (d) {
        return "".concat(d.source.name, " \u2192 ").concat(d.target.name, "\n").concat(d.value, " Datasets");
      }); // Tooltip

      // Nodes
      var node = svg.append('g').selectAll('.node').data(nodes).join('g').attr('class', 'c-sankey__node').attr('transform', function (d) {
        return "translate(".concat(d.x0, ",").concat(d.y0, ")");
      }).call(drag);
      node.append('rect').attr('height', function (d) {
        return Math.max(5, d.y1 - d.y0);
      }).attr('width', sankey.nodeWidth()).attr('fill', function (d) {
        return color(d.name);
      }).attr('stroke-width', 0).append('title').text(function (d) {
        return "".concat(d.name, "\n").concat(d.value, " Datasets");
      }); // Tooltip

      node.append('text').attr('x', -6).attr('y', function (d) {
        return (d.y1 - d.y0) / 2;
      }).attr('dy', '0.35em').attr('text-anchor', 'end').text(function (d) {
        return d.name;
      }).filter(function (d) {
        return d.x0 < width / 2;
      }).attr('x', 6 + sankey.nodeWidth()).attr('text-anchor', 'start');
    }
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.handleWindowResize();
      this.useEffect('options');
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this.handleWindowResize();
      window.addEventListener('resize', this.onWindowResize.bind(this));
    }
  }, {
    key: "clearCanvas",
    value: function clearCanvas() {
      if (this.ops.useShadow) {
        var l = _classPrivateFieldGet(_shadow, this).querySelectorAll('svg');
        l.forEach(function (el) {
          el.remove();
        });
      } else {
        this.innerHTML = '';
      }
    }
  }, {
    key: "handleLoader",
    value: function handleLoader() {
      var ctx = this.ops.useShadow ? _classPrivateFieldGet(_shadow, this) : this;
      ctx.querySelectorAll(".".concat(this.classes.loader)).forEach(function (el) {
        el.remove();
      });
      if (this.isLoading) {
        if (!this.loading.callback) {
          var loader = document.createElement("div");
          loader.innerHTML = this.loading.html;
          loader.className = this.classes.loader;
          ctx.appendChild(loader);
        } else {
          this.loading.callback(this);
        }
      }
    }

    /**
     *
     * @param property
     * @param oldValue
     * @param newValue
     */
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(property, oldValue, newValue) {
      var _this3 = this;
      this.log("XACSankey.attributeChangedCallback: ".concat(property, " ").concat(newValue));
      if (oldValue === newValue) return;
      this.handleLoader();
      if (property === 'data') {
        this.fetchData().then(function () {
          _this3.clearCanvas();
          _this3.buildGraph();
        }.bind(this));
      } else {
        this.clearCanvas();
        this.buildGraph();
      }
    }
  }, {
    key: "log",
    value: function log(msg) {
      var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';
      XACSankey.log(msg, {
        fn: fn
      });
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['data', 'fetch', 'options'];
    }
  }, {
    key: "isLocal",
    value: function isLocal() {
      return location.host.indexOf('localhost') !== -1 || location.host.indexOf('.dev') !== -1;
    }
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
      if (XACSankey.isLocal()) {
        console[fn]("%c ".concat(msg), "background: #222; color: ".concat(color), data);
      }
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('xac-sankey', XACSankey);
export default XACSankey;