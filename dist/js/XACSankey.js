/**
* 
* 4/11/2025, 12:35:27 PM | X Atlas Consortia Sankey 1.0.3 | git+https://github.com/x-atlas-consortia/data-sankey.git | Pitt DBMI CODCC
**/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
import Util from "./util/Util.js";
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
    _this.organsDict = {};
    _this.organsDictByCategory = {};
    _this.api = {
      sankey: 'https://ingest.api.sennetconsortium.org/datasets/sankey_data',
      token: null,
      ubkg: {
        sap: 'sennet',
        organs: 'https://ontology.api.hubmapconsortium.org/organs?application_context='
      }
    };
    _this.containerDimensions = {};
    _this.graphData = null;
    _this.isLoading = true;
    _this.groupByOrganCategoryKey = 'rui_code';
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

  /**
   * Sets the organTypes from UBKG.
   * @returns {Promise<void>}
   */
  _inherits(XACSankey, _HTMLElement);
  return _createClass(XACSankey, [{
    key: "setOrganTypes",
    value: (function () {
      var _setOrganTypes = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var res, organs, _iterator, _step, _o$category, _o$term, _o$category2, _o$this$groupByOrganC, o, cat;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch(this.api.ubkg.organs + this.api.ubkg.sap);
            case 2:
              res = _context.sent;
              _context.next = 5;
              return res.json();
            case 5:
              organs = _context.sent;
              _iterator = _createForOfIteratorHelper(organs);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  o = _step.value;
                  this.organsDict[o.term.trim().toLowerCase()] = ((_o$category = o.category) === null || _o$category === void 0 || (_o$category = _o$category.term) === null || _o$category === void 0 ? void 0 : _o$category.trim()) || ((_o$term = o.term) === null || _o$term === void 0 ? void 0 : _o$term.trim());
                  cat = ((_o$category2 = o.category) === null || _o$category2 === void 0 || (_o$category2 = _o$category2.term) === null || _o$category2 === void 0 ? void 0 : _o$category2.trim()) || o.term.trim();
                  this.organsDictByCategory[cat] = this.organsDictByCategory[cat] || new Set();
                  this.organsDictByCategory[cat].add((_o$this$groupByOrganC = o[this.groupByOrganCategoryKey]) === null || _o$this$groupByOrganC === void 0 ? void 0 : _o$this$groupByOrganC.trim());
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function setOrganTypes() {
        return _setOrganTypes.apply(this, arguments);
      }
      return setOrganTypes;
    }()
    /**
     * Gets corresponding organ category from organ type. Example Lung (Left) -> Lung.
     * @param {string} str The organ type
     * @returns {string|*}
     */
    )
  }, {
    key: "getOrganHierarchy",
    value: function getOrganHierarchy(str) {
      if (!str) return str;
      var res = this.organsDict[str.trim().toLowerCase()];
      // fallback incase of missing unkg data
      if (!res) {
        var r = new RegExp(/.+?(?=\()/);
        res = str.match(r);
        return res && res.length ? res[0].trim() : str;
      }
      return res;
    }

    /**
     * Appends stylesheet to exposed shadow dom.
     */
  }, {
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

    /**
     * Retrieves options set via the element's options attr.
     */
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

    /**
     * Returns request headers.
     * @returns {{headers: {"Content-Type": string}}}
     */
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

    /**
     * Removes null values from obj.
     * @param obj
     */
  }, {
    key: "purgeObject",
    value: function purgeObject(obj) {
      for (var i in obj) {
        if (obj[i] === null) {
          delete obj[i];
        }
      }
    }

    /**
     * Sets options to this instance.
     * @param {object} ops
     */
  }, {
    key: "setOptions",
    value: function setOptions(ops) {
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
      if (ops.onNodeClickCallback) {
        this.onNodeClickCallback = ops.onNodeClickCallback;
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
     * @param {string} attr Name of a watche attribute.
     */
  }, {
    key: "useEffect",
    value: function useEffect() {
      var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'data';
      this.setAttribute(attr, "".concat(Date.now()));
    }

    /**
     * Converts the filter from the URL to the field names returned from the sankey endpoint.
     * Also splits comma separated filter values into an array.
     * @returns {{}}
     */
  }, {
    key: "getValidFilters",
    value: function getValidFilters() {
      var _this2 = this;
      return Object.keys(this.filters).reduce(function (acc, key) {
        if (_this2.validFilterMap[key.toLowerCase()] !== undefined) {
          acc[_this2.validFilterMap[key].toLowerCase()] = _this2.filters[key].split(',');
        }
        return acc;
      }, {});
    }

    /**
     * Gets and handles main sankey data to be visualized.
     * @returns {Promise<void>}
     */
  }, {
    key: "fetchData",
    value: (function () {
      var _fetchData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var res, data, _iterator2, _step2, row, groups, _iterator3, _step3, g, validFilters, filteredData, columnNames, graphMap, i;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(this.validFilterMap.organ && !Object.keys(this.organsDict).length)) {
                _context2.next = 3;
                break;
              }
              _context2.next = 3;
              return this.setOrganTypes();
            case 3:
              _context2.next = 5;
              return fetch(this.api.sankey, this.getHeaders());
            case 5:
              res = _context2.sent;
              _context2.next = 8;
              return res.json();
            case 8:
              this.rawData = _context2.sent;
              if (!(this.rawData.message || res.status === 202)) {
                _context2.next = 12;
                break;
              }
              this.handleLoader("<span class=\"c-sankey__msg\">".concat(this.rawData.message, "</span>"));
              return _context2.abrupt("return");
            case 12:
              // Check if actual data has data property
              if (Array.isArray(this.rawData.data)) {
                this.rawData = this.rawData.data;
              }
              data = [];
              if (this.validFilterMap.organ) {
                _iterator2 = _createForOfIteratorHelper(this.rawData);
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    row = _step2.value;
                    groups = new Set();
                    _iterator3 = _createForOfIteratorHelper(row[this.validFilterMap.organ]);
                    try {
                      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                        g = _step3.value;
                        groups.add(this.getOrganHierarchy(g));
                      }
                    } catch (err) {
                      _iterator3.e(err);
                    } finally {
                      _iterator3.f();
                    }
                    data.push(_objectSpread(_objectSpread({}, row), {}, _defineProperty({}, this.validFilterMap.organ, Array.from(groups))));
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              }
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
              XACSankey.log('filteredData', {
                data: filteredData,
                color: 'orange'
              });
              columnNames = Object.values(this.validFilterMap);
              graphMap = {
                nodes: {},
                links: {}
              };
              i = 0; // First build the nodes using a dictionary for faster access time
              filteredData.forEach(function (row, rowIndex) {
                columnNames.forEach(function (columnName, columnIndex) {
                  var buildNode = function buildNode(colName, val) {
                    var node = graphMap.nodes[val];
                    if (node === undefined) {
                      graphMap.nodes[val] = {
                        node: i,
                        name: val,
                        columnName: colName,
                        columnIndex: columnIndex,
                        weight: 0
                      };
                      node = graphMap.nodes[val];
                      i++;
                    }
                    node.weight = node.weight + 1;
                  };
                  if (Array.isArray(row[columnName])) {
                    var _iterator4 = _createForOfIteratorHelper(row[columnName]),
                      _step4;
                    try {
                      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                        var v = _step4.value;
                        buildNode(columnName, v);
                      }
                    } catch (err) {
                      _iterator4.e(err);
                    } finally {
                      _iterator4.f();
                    }
                  } else {
                    buildNode(columnName, row[columnName]);
                  }
                });
              });
              filteredData.forEach(function (row) {
                columnNames.forEach(function (columnName, columnIndex) {
                  if (columnIndex !== columnNames.length - 1) {
                    var buildLink = function buildLink(source, target) {
                      var key = "".concat(source.name, "_").concat(target.name);
                      // Find a link O(1)
                      var link = graphMap.links[key];
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
                    var sources = [];
                    var targets = [];
                    var setSourcesTargets = function setSourcesTargets(bucket, current) {
                      if (Array.isArray(current)) {
                        var _iterator5 = _createForOfIteratorHelper(current),
                          _step5;
                        try {
                          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                            var v = _step5.value;
                            bucket.push(graphMap.nodes[v]);
                          }
                        } catch (err) {
                          _iterator5.e(err);
                        } finally {
                          _iterator5.f();
                        }
                      } else {
                        bucket.push(graphMap.nodes[current]);
                      }
                    };
                    setSourcesTargets(sources, row[columnName]);
                    setSourcesTargets(targets, row[columnNames[columnIndex + 1]]);
                    if (sources.length > 1) {
                      var _iterator6 = _createForOfIteratorHelper(targets),
                        _step6;
                      try {
                        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                          var t = _step6.value;
                          buildLink(sources[0], t);
                        }
                      } catch (err) {
                        _iterator6.e(err);
                      } finally {
                        _iterator6.f();
                      }
                    } else {
                      var _iterator7 = _createForOfIteratorHelper(sources),
                        _step7;
                      try {
                        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                          var s = _step7.value;
                          var _iterator8 = _createForOfIteratorHelper(targets),
                            _step8;
                          try {
                            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                              var _t = _step8.value;
                              buildLink(s, _t);
                            }
                          } catch (err) {
                            _iterator8.e(err);
                          } finally {
                            _iterator8.f();
                          }
                        }
                      } catch (err) {
                        _iterator7.e(err);
                      } finally {
                        _iterator7.f();
                      }
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
              this.useEffect('fetch');
            case 28:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function fetchData() {
        return _fetchData.apply(this, arguments);
      }
      return fetchData;
    }()
    /**
     * Grabs client size info.
     */
    )
  }, {
    key: "handleWindowResize",
    value: function handleWindowResize() {
      this.containerDimensions.width = this.clientWidth;
      this.containerDimensions.height = Math.max(this.clientHeight, 1080);
    }

    /**
     * Builds the visualization.
     */
  }, {
    key: "buildGraph",
    value: function buildGraph() {
      var _this3 = this;
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
      var node = svg.append('g').selectAll('.node').data(nodes).join('g').attr('class', function (d) {
        return "c-sankey__node c-sankey__node--".concat(d.columnName);
      }).attr('transform', function (d) {
        return "translate(".concat(d.x0, ",").concat(d.y0, ")");
      }).call(drag).on('click', function (e, d) {
        if (e.defaultPrevented) return;
        if (_this3.onNodeClickCallback) {
          _this3.onNodeClickCallback(e, d);
        }
      }.bind(this));
      node.append('rect').attr('height', function (d) {
        return Math.max(5, d.y1 - d.y0);
      }).attr('width', sankey.nodeWidth()).attr('fill', function (d) {
        return color(d.name);
      }).attr('stroke-width', 0).append('title').text(function (d) {
        return "".concat(d.name, "\n").concat(d.value, " Datasets");
      }); // Tooltip

      node.append('text').attr('class', 'c-sankey__label').attr('x', -6).attr('y', function (d) {
        return (d.y1 - d.y0) / 2;
      }).attr('dy', '0.35em').attr('text-anchor', 'end').text(function (d) {
        return d.name;
      }).filter(function (d) {
        return d.x0 < width / 2;
      }).attr('x', 6 + sankey.nodeWidth()).attr('text-anchor', 'start').on('click', function (e, d) {
        if (e.defaultPrevented) return;
        if (_this3.onLabelClickCallback) {
          _this3.onLabelClickCallback(e, d);
        }
      }.bind(this));
      node.append('text').attr('class', 'c-sankey__value').attr('y', sankey.nodeWidth() / 1.9).attr('x', function (d) {
        return (d.y1 - d.y0) / 2 * -1;
      }).attr('dy', '0.35em').attr('text-anchor', 'middle').text(function (d) {
        return Math.max(5, d.y1 - d.y0) > 15 ? d.weight : '';
      }).on('click', function (e, d) {
        if (e.defaultPrevented) return;
        if (_this3.onNodeClickCallback) {
          _this3.onNodeClickCallback(e, d);
        }
      }.bind(this));
      this.isLoading = false;
      this.useEffect('graph');
    }

    /**
     * Callback for handling window resize.
     */
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.handleWindowResize();
      this.useEffect('options');
    }

    /**
     * Runs when the element is connected to the DOM.
     */
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this.handleWindowResize();
      window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    /**
     * Determines which attributes to watch for triggering change notifications to attributeChangedCallback.
     * @returns {string[]}
     */
  }, {
    key: "clearCanvas",
    value:
    /**
     * Clears viewport of svgs.
     */
    function clearCanvas() {
      if (this.ops.useShadow) {
        var l = _classPrivateFieldGet(_shadow, this).querySelectorAll('svg');
        l.forEach(function (el) {
          el.remove();
        });
      } else {
        this.innerHTML = '';
      }
    }

    /**
     * Displays or removes loading spinner.
     */
  }, {
    key: "handleLoader",
    value: function handleLoader() {
      var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var ctx = this.ops.useShadow ? _classPrivateFieldGet(_shadow, this) : this;
      ctx.querySelectorAll(".".concat(this.classes.loader)).forEach(function (el) {
        el.remove();
      });
      if (this.isLoading || msg != '') {
        if (!this.loading.callback) {
          var loader = document.createElement("div");
          loader.innerHTML = this.loading.html + msg;
          loader.className = this.classes.loader;
          ctx.appendChild(loader);
        } else {
          this.loading.callback(this);
        }
      }
    }

    /**
     * Invoked when one of the custom element's attributes is added, removed, or changed.
     * @param property
     * @param oldValue
     * @param newValue
     */
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(property, oldValue, newValue) {
      var _this4 = this;
      this.log("XACSankey.attributeChangedCallback: ".concat(property, " ").concat(newValue));
      if (oldValue === newValue) return;
      this.handleLoader();
      if (property !== 'graph') {
        if (property === 'data') {
          this.fetchData().then(function () {
            _this4.clearCanvas();
            _this4.buildGraph();
          }.bind(this));
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
  }, {
    key: "flipObj",
    value: function flipObj(obj) {
      return Object.keys(obj).reduce(function (ret, key) {
        ret[obj[key]] = key;
        return ret;
      }, {});
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
      XACSankey.log(msg, {
        fn: fn
      });
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['data', 'fetch', 'options', 'graph'];
    }
  }, {
    key: "isLocal",
    value: function isLocal() {
      Util.isLocal();
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
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define('xac-sankey', XACSankey);
export default XACSankey;