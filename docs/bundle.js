/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductCatalogComponent)
/* harmony export */ });
/* harmony import */ var _products_markets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _products_product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _products_productCollection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _buttons_control_Control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _buttons_primary_Primary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);


var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }








// const html = String.raw;

/**
 * Product Catalog component. We call this a component as its behaviour is a
 * reusable component for web composition.
 *
 * With this design it is also easier to map it over to a true web-component,
 * which will hopefully soon become a standard in all the major browsers.
 */
var ProductCatalogComponent = /*#__PURE__*/function () {
  /**
   * @param {{products: ProductCollectionModel, containerElement: Element, markets: Markets}} obj product catalog data
   * @return ProductCatalogComponent
   */
  function ProductCatalogComponent(obj) {
    _classCallCheck(this, ProductCatalogComponent);
    this.containerElement = obj.containerElement;
    this.fields = _products_product__WEBPACK_IMPORTED_MODULE_1__["default"].getFields();
    this.markets = obj.markets;
    this.updateProperties(obj);
    this.buildDOMElements();
    this.render();
  }

  /**
   * @param {{products: ProductCollectionModel, containerElement: Element}} obj author data
   * @return void
   */
  _createClass(ProductCatalogComponent, [{
    key: "updateProperties",
    value: function updateProperties(obj) {
      var _this = this;
      this.products = obj.products.getFilteredProducts();
      obj.products.subscribe(function () {
        _this.products = obj.products.getFilteredProducts();
        _this.render();
      });
    }
  }, {
    key: "buildDOMElements",
    value: function buildDOMElements() {
      this.productListElement = document.createElement('ul');
      this.productListElement.classList.add('product-catalogue__list');
    }
  }, {
    key: "renderProductCards",
    value: function renderProductCards() {
      var _this2 = this;
      if (!this.productListElement) return;
      this.productListElement.innerHTML = "\n\t\t\t".concat(this.products.map(function (product) {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n            <li class=\"product-card\">", "</li>\n          "])), _this2.renderProductCardBody(product));
      }).join(''), "\n\t\t");
    }

    /**
     * @param {{name: String, description: String, image: String, price: Number, market: String, type: String, weight: Number}} product data
     * @return string
     */
  }, {
    key: "renderProductCardBody",
    value: function renderProductCardBody(product) {
      this.productMarketMarkup = this.renderProductMarket(product.market);
      this.productPhotoMarkup = this.renderProductPhoto(product.image, product.name);
      this.productNameMarkup = this.renderProductName(product.name);
      this.productInfoMarkup = this.renderProductCardInfo(product.description, product.price);
      this.productToCartButtonMarkup = _buttons_primary_Primary__WEBPACK_IMPORTED_MODULE_5__["default"].render('В корзину', 'product-card-info__to-cart-button', ['yellow']);
      return this.productMarketMarkup + this.productPhotoMarkup + this.productNameMarkup + this.productInfoMarkup + this.productToCartButtonMarkup;
    }

    /**
     * @param {string} market
     * @return string
     */
  }, {
    key: "renderProductMarket",
    value: function renderProductMarket(market) {
      if (!market) return '';
      var productMarket = document.createElement('span');
      productMarket.classList.add('product-card__market');
      var productImgSrc = this.markets.getMarketLogo(market);
      productMarket.innerHTML = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      <img src=\"", "\" alt=\"", " \u043B\u043E\u0433\u043E\" />\n    "])), productImgSrc, market);
      return productMarket.outerHTML;
    }

    /**
     * @param {string} imageSrc
     * @param {string} name
     * @return string
     */
  }, {
    key: "renderProductPhoto",
    value: function renderProductPhoto(imageSrc, name) {
      var productPhoto = document.createElement('div');
      productPhoto.classList.add('product-card__photo');
      var productPhotoContent = document.createElement('div');
      productPhotoContent.classList.add('product-card__photo-inner');

      // А так работает:
      productPhotoContent.innerHTML = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.html)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n      <img\n        src=\"", "\"\n        alt=\"", "\n      \u0444\u043E\u0442\u043E\"\n      />\n    "])), imageSrc, name);
      productPhoto.appendChild(productPhotoContent);
      return productPhoto.outerHTML;
    }

    /**
     * @param {string} name
     * @return string
     */
  }, {
    key: "renderProductName",
    value: function renderProductName(name) {
      return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.html)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n      <h3 class=\"product-card__title\">\n        <span class=\"product-card__name\">", "</span>\n      </h3>\n    "])), name);
    }

    /**
     * @param {string} description
     * @param {number} price
     * @return string
     */
  }, {
    key: "renderProductCardInfo",
    value: function renderProductCardInfo(description, price) {
      var productDescription = this.renderProductDescription(description);
      var productPrice = this.renderProductPrice(price);
      var productCount = this.renderProductCountPanel();
      return productDescription + productPrice + productCount;
    }

    /**
     * @param {string} description
     * @return string
     */
  }, {
    key: "renderProductDescription",
    value: function renderProductDescription(description) {
      return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.html)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n      <p class=\"product-card-info__ingredients\">\n        <span class=\"product-ingredient\"> ", " </span>\n      </p>\n    "])), description);
    }

    /**
     * @param {number} price
     * @return string
     */
  }, {
    key: "renderProductPrice",
    value: function renderProductPrice(price) {
      return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.html)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n      <span class=\"product-card-info__price\">\n        \u0426\u0435\u043D\u0430:\n        <b>", " \u0440\u0443\u0431.</b>\n      </span>\n    "])), price);
    }

    /**
     * @return string
     */
  }, {
    key: "renderProductCountPanel",
    value: function renderProductCountPanel() {
      var incrementButton = _buttons_control_Control__WEBPACK_IMPORTED_MODULE_4__["default"].render('plus');
      var decrementButton = _buttons_control_Control__WEBPACK_IMPORTED_MODULE_4__["default"].render('minus');
      return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.html)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n      <div class=\"product-card-info__count\">\n        <label for=\"product-count\" class=\"product-card-info__count-label\"\n          >\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E\n        </label>\n        <div class=\"count-control\">\n          ", "\n          <input\n            placeholder=\"1\"\n            type=\"text\"\n            id=\"product-count\"\n            name=\"product-count\"\n            class=\"product-count-input\"\n            readonly\n          />\n          ", "\n        </div>\n      </div>\n    "])), decrementButton, incrementButton);
    }

    /**
     * @return string
     */
  }, {
    key: "renderControlButton",
    value: function renderControlButton() {
      var incrementButton = _buttons_control_Control__WEBPACK_IMPORTED_MODULE_4__["default"].render('plus');
      var decrementButton = _buttons_control_Control__WEBPACK_IMPORTED_MODULE_4__["default"].render('minus');
      return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.html)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n      <div class=\"product-card-info__count\">\n        <label for=\"product-count\" class=\"product-card-info__count-label\"\n          >\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E\n        </label>\n        <div class=\"count-control\">\n          ", "\n          <input\n            placeholder=\"1\"\n            type=\"text\"\n            id=\"product-count\"\n            name=\"product-count\"\n            class=\"product-count-input\"\n            readonly\n          />\n          ", "\n        </div>\n      </div>\n    "])), decrementButton, incrementButton);
    }
  }, {
    key: "render",
    value: function render() {
      this.renderProductCards();
      this.containerElement.innerHTML = '';
      this.containerElement.appendChild(this.productListElement);
    }
  }]);
  return ProductCatalogComponent;
}();


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Markets)
/* harmony export */ });


/**
 * Markets model
 */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Markets = /*#__PURE__*/function () {
  /**
   * @param {[{name: String, image: String}]} obj market data list
   * @return MarketsModel
   */
  function Markets(obj) {
    _classCallCheck(this, Markets);
    this.list = obj;
    this.marketNames = Object.keys(obj);
  }

  /**
   * @return string[] market name list
   */
  _createClass(Markets, [{
    key: "getMarketNames",
    value: function getMarketNames() {
      return this.marketNames;
    }

    /**
     * @return string market logo source url
     */
  }, {
    key: "getMarketLogo",
    value: function getMarketLogo(marketName) {
      if (!marketName) return;
      return this.list[marketName].image;
    }
  }]);
  return Markets;
}();


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductModel)
/* harmony export */ });


/**
 * Product model
 */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ProductModel = /*#__PURE__*/function () {
  /**
   * @typedef {{name: String, description: String, image: String, price: Number, category: String, market: String, type: String, weight: Number}} Product
   */

  /**
   * @param {Product} obj product data
   * @return ProductModel
   */
  function ProductModel(obj) {
    _classCallCheck(this, ProductModel);
    this.updateProperties(obj);
  }

  /**
   * Map properties to this instance
   *
   * @param {Product} obj product data
   * @return void
   */
  _createClass(ProductModel, [{
    key: "updateProperties",
    value: function updateProperties(obj) {
      if (obj.name) this.name = obj.name;
      if (obj.description) this.description = obj.description;
      if (obj.image) this.image = obj.image;
      if (obj.price) this.price = obj.price;
      if (obj.category) this.category = obj.category;
      if (obj.market) this.market = obj.market;
      if (obj.type) this.type = obj.type;
      if (obj.weight) this.weight = obj.weight;
    }

    /**
     * Get a list of properties for this class
     *
     * @returns {string[]}
     */
  }], [{
    key: "getFields",
    value: function getFields() {
      return ['name', 'description', 'image', 'price', 'market', 'type', 'weight'];
    }
  }]);
  return ProductModel;
}();


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductCollectionModel)
/* harmony export */ });
/* harmony import */ var _components_productNav_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



var _products = /*#__PURE__*/new WeakMap();
var ProductCollectionModel = /*#__PURE__*/function (_Observable) {
  _inherits(ProductCollectionModel, _Observable);
  var _super = _createSuper(ProductCollectionModel);
  /**
   * Map properties to this instance
   *
   * @param {ProductModel[]} products
   * @param {string} initialCategory
   * @return ProductCollectionModel
   */
  function ProductCollectionModel(products) {
    var _this;
    var initialCategory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _components_productNav_constants__WEBPACK_IMPORTED_MODULE_0__.PRODUCT_CATEGORIES.SANDWICHES;
    _classCallCheck(this, ProductCollectionModel);
    _this = _super.call(this);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _products, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(_assertThisInitialized(_this), _products, products);
    _this.categoryFilter = initialCategory;
    return _this;
  }

  /**
   * Loop through all registered products and return
   * the product object that matches the id.
   *
   * @param {number} id
   * @return ProductModel
   */
  _createClass(ProductCollectionModel, [{
    key: "getProduct",
    value: function getProduct(id) {
      return _classPrivateFieldGet(this, _products).find(function (item) {
        return item.id === id;
      });
    }

    /**
     * Register a new product to this collection.
     * Notify the subscribers.
     *
     * @param {ProductModel} product
     * @return void
     */
  }, {
    key: "addProduct",
    value: function addProduct(product) {
      _classPrivateFieldGet(this, _products).push(product);
      this.notifySubscribers();
    }

    /**
     * Update a product object.
     * Notify the subscribers.
     *
     * @param Object obj
     * @return void
     */
  }, {
    key: "updateProduct",
    value: function updateProduct(obj) {
      var product = this.getProduct(obj.id);
      product.updateProperties(obj);
      this.notifySubscribers();
    }
  }, {
    key: "getAllProducts",
    value: function getAllProducts() {
      return _classPrivateFieldGet(this, _products);
    }
  }, {
    key: "getFilteredProducts",
    value: function getFilteredProducts() {
      var _this2 = this;
      return _classPrivateFieldGet(this, _products).filter(function (item) {
        return item.category === _this2.categoryFilter;
      });
    }

    /**
     * @param {string} category
     * @return void
     */
  }, {
    key: "setCategoryFilter",
    value: function setCategoryFilter(category) {
      this.categoryFilter = category;
      this.notifySubscribers();
    }
  }]);
  return ProductCollectionModel;
}(_utils_utils__WEBPACK_IMPORTED_MODULE_1__.Observable);


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PRODUCT_CATEGORIES: () => (/* binding */ PRODUCT_CATEGORIES),
/* harmony export */   categoriesDictionary: () => (/* binding */ categoriesDictionary),
/* harmony export */   correctlyOrderedCategories: () => (/* binding */ correctlyOrderedCategories)
/* harmony export */ });
var PRODUCT_CATEGORIES = {
  SHAURMA: 'shaurma',
  SANDWICHES: 'sandwiches',
  BURGERS: 'burgers',
  SALADS: 'salads',
  CHICKEN: 'chicken',
  DRINKS: 'drinks',
  PIZZA: 'pizza'
};
var categoriesDictionary = {
  sandwiches: 'сэндвичи',
  shaurma: 'шаурма',
  burgers: 'бургеры',
  chicken: 'курица & картофель',
  salads: 'тортилья & салаты',
  drinks: 'напитки & десерты',
  pizza: 'пицца'
};
var correctlyOrderedCategories = [PRODUCT_CATEGORIES.SHAURMA, PRODUCT_CATEGORIES.SANDWICHES, PRODUCT_CATEGORIES.BURGERS, PRODUCT_CATEGORIES.CHICKEN, PRODUCT_CATEGORIES.SALADS, PRODUCT_CATEGORIES.DRINKS, PRODUCT_CATEGORIES.PIZZA];

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Observable: () => (/* binding */ Observable),
/* harmony export */   html: () => (/* binding */ html),
/* harmony export */   sortAndFilterDuplicates: () => (/* binding */ sortAndFilterDuplicates)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var html = String.raw;
function sortAndFilterDuplicates(arr, order) {
  var orderMap = {};
  order.forEach(function (item, index) {
    orderMap[item] = index;
  });
  var sortedArray = arr.sort(function (a, b) {
    return orderMap[a] - orderMap[b];
  });
  var uniqueArray = [];
  var seen = new Set();
  sortedArray.forEach(function (item) {
    if (!seen.has(item)) {
      uniqueArray.push(item);
      seen.add(item);
    }
  });
  return uniqueArray;
}
var Observable = /*#__PURE__*/function () {
  function Observable() {
    _classCallCheck(this, Observable);
    this.subscribers = [];
  }

  /**
   * Subscribe for changes
   * Add a function you want to be executed whenever this model changes.
   *
   * @param {Function} fn
   * @return null
   */
  _createClass(Observable, [{
    key: "subscribe",
    value: function subscribe(fn) {
      this.subscribers.push(fn);
    }

    /**
     * Unsubscribe from being notified when this model changes.
     *
     * @param {Function} fn
     * @return null
     */
  }, {
    key: "unsubscribe",
    value: function unsubscribe(fn) {
      this.subscribers = this.subscribers.filter(function (item) {
        return item !== fn;
      });
    }

    /**
     * Notify subscribers
     *
     * @return null
     */
  }, {
    key: "notifySubscribers",
    value: function notifySubscribers() {
      this.subscribers.forEach(function (fn) {
        return fn();
      });
    }
  }]);
  return Observable;
}();

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ButtonControl)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }



/**
 * Button Control component. Uses positioning and modifier classes to adjust its view.
 */
var ButtonControl = /*#__PURE__*/function () {
  function ButtonControl() {
    _classCallCheck(this, ButtonControl);
  }
  _createClass(ButtonControl, null, [{
    key: "render",
    value:
    /**
     * @typedef {"plus" | "minus"} Icon
     */
    /**
     * @param {Icon} icon the allowed type of the button icon
     * @param {string} classPositioning class to adjust positioning
     * @param {string[]} classModifiers modifier names to adjust button appearance
     * @return string
     */
    function render(icon) {
      var classPositioning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var classModifiers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [''];
      var className = 'product-count-button';
      var classModifiersList = classModifiers.map(function (modifier) {
        return !classModifiers.length ? '' : "".concat(className, "--").concat(modifier);
      }).join(' ');
      var buttonBody = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject || (_templateObject = _taggedTemplateLiteral([" <button\n      class=\"", " ", " ", "\"\n    >\n      ", "\n    </button>"])), classPositioning, className, classModifiersList, _classStaticPrivateMethodGet(this, ButtonControl, _getIcon).call(this, icon));
      return buttonBody;
    }
  }]);
  return ButtonControl;
}();
/**
 * @param {Icon} icon - The allowed type of the button icon
 * @return string
 */
function _getIcon(icon) {
  if (icon === 'plus') return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<i class=\"fa-solid fa-plus\"></i>"])));
  if (icon === 'minus') return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["<i class=\"fa-solid fa-minus\"></i>"])));
  return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["<></>"])));
}


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 9 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 10 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 11 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 12 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 13 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 14 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 15 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.product-count-button {
  border-radius: 50%;
  border: var(--light-gray-2) 2px solid;
  color: var(--light-gray-2);
  background-color: var(--white);
  font-size: 1.2rem;
  padding: 0;
  width: 25px;
  height: 25px;
  line-height: 19px;
  cursor: pointer;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 16 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 17 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ButtonPrimary)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);


var _templateObject;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/**
 * Button Primary component. Uses positioning and modifier classes to adjust its view.
 */
var ButtonPrimary = /*#__PURE__*/function () {
  function ButtonPrimary() {
    _classCallCheck(this, ButtonPrimary);
  }
  _createClass(ButtonPrimary, null, [{
    key: "render",
    value:
    /**
     * @param {string} text button text
     * @param {string} classPositioning class to adjust positioning
     * @param {string[]} classModifiers modifier names to adjust button appearance
     * @return string
     */
    function render(text, classPositioning, classModifiers) {
      var className = 'button-primary';
      var classModifiersList = classModifiers.map(function (modifier) {
        return "".concat(className, "--").concat(modifier);
      }).join(' ');
      return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      <button\n        class=\"", " ", " ", "\"\n        type=\"submit\"\n      >\n        ", "\n      </button>\n    "])), classPositioning, className, classModifiersList, text);
    }
  }]);
  return ButtonPrimary;
}();


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 20 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.button-primary {
  outline: 0;
  border: 0;
  border-bottom: 1px solid black;
  border-radius: 3px;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.button-primary--yellow {
  background-color: #f5c300;
}

.button-primary--grey {
  background-color: #807979;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 22 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Product card */

.product-catalogue__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  row-gap: 100px;
  column-gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 1200px) {
  .product-catalogue__list {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 205px;
  gap: 1rem;
}

.product-card__brand {
  width: 205px;
  height: 38px;
}

.product-card__brand img {
  width: 100%;
  height: 100%;
}

.product-card__title {
  display: flex;
  justify-content: center;
}

.product-card__name {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--dark-gray);
  text-transform: capitalize;
  text-align: center;
}

.product-card-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
}

.product-card__photo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  min-height: 180px;
  background-color: var(--yellow);
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.product-card__photo-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  background-color: var(--white);
  border-radius: 50%;
}

.product-card__photo-inner img {
  width: 150px;
  height: 150px;
  object-fit: contain;
  border-radius: 50%;
}

.product-card-info__ingredients {
  flex-grow: 1;
  width: 100%;
  text-align: center;
  padding: 0.4rem 0 0.6rem;
  border-top: var(--dark-gray) solid 3px;
  border-bottom: var(--dark-gray) solid 3px;
}

.product-ingredient {
  font-size: 0.9rem;
  line-height: 1.2rem;
  font-weight: 700;
  color: var(--blue);
  border-bottom: var(--blue) solid 1px;
}

.product-card-info__price {
  margin-top: 0.5rem;
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--orange);
}

.product-card-info__count {
  margin-bottom: 0.5rem;
}

.count-control {
  display: flex;
  align-items: center;
}

.product-card-info__count-label {
  display: block;
  margin: 0.8rem 0 0.2rem;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  text-align: center;
  color: var(--dark-gray);
}

.product-count-input {
  margin: 0 1.2rem;
  height: 25px;
  width: 50px;
  border: var(--light-gray-2) 2px solid;
  border-radius: 0.3rem;
  outline: none;
  font-size: 0.7rem;
  font-weight: 700;
  color: black;
  text-align: center;
}

/* Chrome, Safari, Edge, Opera */
product-count-input::-webkit-outer-spin-button,
product-count-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
product-count-input[type=number] {
  -moz-appearance: textfield;
}

.product-count-input::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1;
  /* Firefox */
}

.product-count-input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: black;
}

.product-count-input::-ms-input-placeholder {
  /* Microsoft Edge */
  color: black;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductNavComponent)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);


var _templateObject;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/**
 * Product Navigation component.
 */
var ProductNavComponent = /*#__PURE__*/function () {
  /**
   * @param {{categories: string[],
   *  currentCategory: string, 
   *  containerElement: Node,
   *  handleProductCategoryChange: () => void }} obj navigation data
   * @return ProductNavComponent
   */
  function ProductNavComponent(obj) {
    _classCallCheck(this, ProductNavComponent);
    this.containerElement = obj.containerElement;
    this.currentCategory = obj.currentCategory;
    this.handleProductCategoryChange = obj.handleProductCategoryChange;
    this.categoryNameMapper = this.createProductCategoryMapper();
    this.updateProperties(obj);
    this.buildDOMElements();
    this.render();
  }

  /**
   * @param {{categories: string[], containerElement: Node}} obj navigation data
   * @return void
   */
  _createClass(ProductNavComponent, [{
    key: "updateProperties",
    value: function updateProperties(obj) {
      this.categories = obj.categories;
    }
  }, {
    key: "buildDOMElements",
    value: function buildDOMElements() {
      this.productNavElement = document.createElement('nav');
      this.productNavElement.classList.add('home-page__nav');
      var navListElement = document.createElement('ul');
      navListElement.classList.add('category-nav');
      this.productNavElement.appendChild(navListElement);
    }
  }, {
    key: "renderNavItems",
    value: function renderNavItems() {
      var _this = this;
      if (!this.productNavElement || !this.productNavElement.firstChild) return;
      this.productNavElement.firstChild.innerHTML = "\n\t\t\t".concat(this.categories.map(function (category) {
        return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n            <li class=\"category-nav__item\">\n              <input\n                id=\"", "\"\n                type=\"radio\"\n                name=\"category\"\n                value=\"", "\"\n                ", "\n              />\n              <label for=\"", "\"\n                >", "</label\n              >\n            </li>\n          "])), category, category, category === _this.currentCategory ? 'checked' : '', category, _this.categoryNameMapper.getCategory(category));
      }).join(''), "\n\t\t");
    }
  }, {
    key: "createProductCategoryMapper",
    value: function createProductCategoryMapper() {
      function getCategory(key) {
        return _constants__WEBPACK_IMPORTED_MODULE_1__.categoriesDictionary[key];
      }
      return {
        getCategory: getCategory
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      this.renderNavItems();
      this.containerElement.innerHTML = '';
      this.containerElement.appendChild(this.productNavElement);
      var radios = document.querySelectorAll('input[type="radio"][name="category"]');
      radios.forEach(function (radio) {
        return radio.addEventListener('change', function () {
          return _this2.handleProductCategoryChange(radio.value);
        });
      });
    }
  }]);
  return ProductNavComponent;
}();


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(25);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 25 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.category-nav {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 250px;
  padding: 1rem 0;
  background-color: var(--white);
  font-size: 1.4rem;
  font-weight: 700;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.category-nav__item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.2rem;
  width: 100%;
  color: var(--dark-gray);
  text-decoration: none;
  cursor: pointer;
}

.category-nav__item input[type=radio] {
  -webkit-appearance: none;
  appearance: none;
  /* For iOS < 15 to remove gradient background */
  background-color: #fff;
  /* Not removed via appearance */
  margin: 0;
}

.category-nav__item label {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 3.2rem;
  cursor: inherit;
  text-transform: capitalize;
}

.category-nav__item input[type=radio]:checked + label {
  background-color: var(--yellow);
  color: var(--white);
}

.category-nav__item a {
  color: inherit;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(27);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 27 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(29), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* @import "../components/productCatalog/style.css";
@import "../components/productNav/style.css";
@import "../components/buttons/primary/style.css";
@import "../components/buttons/control/style.css";  */

/* Global */
:root {
  --light-gray: #eae9e7;
  --light-gray-2: #bebcba;
  --gray: #808080;
  --dark-gray: #3f3e3e;
  --yellow: #f5c300;
  --light-yellow: #f6d846;
  --blue: #0265bb;
  --orange: #d96b4c;
  --white: #fcfcfc;
}

* {
  box-sizing: border-box;
  text-decoration: none;
}

button {
  cursor: pointer;
  font-family: inherit;
}

body {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-repeat: repeat;
  font-family: 'Roboto Condensed', sans-serif;
  list-style-type: none;
}

/* Page laoyout*/

.home-page {
  display: grid;
  grid-template-areas:
    "home-page__header home-page__header"
    "home-page__nav home-page__content"
    "cart home-page__content";
  grid-template-columns: minmax(max-content, 20%) 1fr;
  grid-template-rows: auto auto 1fr;
  padding: 2rem 1rem;
}

.home-page__header {
  grid-area: home-page__header;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.home-page__nav {
  grid-area: home-page__nav;
  justify-self: center;
  height: fit-content;
}

.home-page__cart {
  grid-area: cart;
  justify-self: center;
  height: fit-content;
  margin-top: 3rem;
}

.home-page__content {
  grid-area: home-page__content;
  padding: 0.5rem 2rem;
}

/* Header */

.header__text {
  display: inline;
  width: fit-content;

  font-size: 2.4rem;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--dark-gray);
}


.visually-hidden:not(:focus):not(:active),
input[type="checkbox"].visually-hidden,
input[type="radio"].visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  -webkit-clip-path: inset(100%);
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 28 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),
/* 29 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "i/app-background-plate.png";

/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = JSON.parse('{"version":"0.0.16","menu":[{"name":"Овощной","description":"Соус и овощи на выбор","image":"i/sandwiches/ovoshnoy.png","price":105,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{"size":{},"bread":"whit-italian","vegetable":[],"sauce":[],"filling":[]}},{"name":"Индейка","description":"Сэндвич с индейкой, соус и овощи на выбор","image":"i/sandwiches/ind.png","price":130,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{"size":"1x","bread":"white-italian","vegetable":[],"sauce":[],"filling":[]}},{"name":"Ветчина","description":"Сэндвич с ветчиной, соус и овощи на выбор","image":"i/sandwiches/vetchina.png","price":130,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{"size":"1x","bread":"white-italian","vegetable":[],"sauce":[],"filling":[]}},{"name":"Индейка и ветчина","description":"Сендвич с индейкой и ветчиной, соус и овощи на выбор","image":"i/sandwiches/indandvet.png","price":130,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{"size":"1x","bread":"white-italian","vegetable":[],"sauce":[],"filling":[]}},{"name":"Морепродукты","description":"Сэндвич с крабовым мясом, соус и овощи на выбор","image":"i/sandwiches/moreprodukty.png","price":130,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{"size":"1x","bread":"white-italian","vegetable":[],"sauce":[],"filling":[]}},{"name":"Тунец","description":"Сэндвич с филе тунца, соус и овощи на выбор","image":"i/sandwiches/tune.png","price":150,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{"size":"1x","bread":"white-italian","vegetable":[],"sauce":[],"filling":[]}},{"name":"Острый итальянский","description":"Сэндвич с салями и пепперони, соус и овощи на выбор","image":"i/sandwiches/ostitaliansky.png","price":150,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{"size":"1x","bread":"white-italian","vegetable":[],"sauce":[],"filling":[]}},{"name":"Б.М.Т.","description":"Ветчина, салями, пепперони, соус и овощи на выбор","image":"i/sandwiches/bmt.png","price":150,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{"size":"1x","bread":"white-italian","vegetable":[],"sauce":[],"filling":[]}},{"name":"Куриная грудка","description":"Куриное филе, соус и овощи на выбор","image":"i/sandwiches/kurgrud.png","price":150,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{"size":"1x","bread":"white-italian","vegetable":[],"sauce":[],"filling":[]}},{"name":"Ростбиф","description":"Сэндвич с говядиной, соус и овощи на выбор","image":"i/sandwiches/rostbif.png","price":165,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{"size":"1x","bread":"white-italian","vegetable":[],"sauce":[],"filling":[]}},{"name":"Мелт","description":"Индейка, ветчина, бекон, соус и овощи на выбор","image":"i/sandwiches/malt.png","price":165,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{"size":"1x","bread":"white-italian","vegetable":[],"sauce":[],"filling":[]}},{"name":"Курица бекон","description":"Куриное филе с беконом. Соус и овощи на выбор","image":"i/sandwiches/kurbeckon.png","price":165,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{"size":"1x","bread":"white-italian","vegetable":[],"sauce":[],"filling":[]}},{"name":"Террияки","description":"Куриное филе в кисло-сладком соусе. Соус и овощи на выбор","image":"i/sandwiches/teriaki.png","price":165,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{"size":"1x","bread":"white-italian","vegetable":[],"sauce":[],"filling":[]}},{"name":"Биф Клаб","description":"С котлетой из курицы и говядины","image":"i/sandwiches/beef-club.png","price":150,"category":"sandwiches","market":"subway","type":"multiple","weight":1,"components":{}},{"name":"Доп сыр (в бургер)","description":"Дополнительная порция сыра в любой бургер","image":"i/ingredients/products/cheese.png","price":15,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"ФишБургер","description":"Рыбная котлета с сыром и соусом тар-тар","image":"i/burgers/fish2.png","price":120,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Королевский бургер","description":"Говядина, бекон, куриное филе, сыр, салат, овощи","image":"i/burgers/kingburger.png","price":230,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Дарт Вейдер","description":"С большой говяжей котлетой, сыром, салатом","image":"i/burgers/darthvader.png","price":199,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Деревенский","description":"Со свиной котлетой, беконом, драником и салатом","image":"i/burgers/derevenskiy.png","price":129,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Имперский","description":"С куриным филе, картофельным драником, сыром, салатом","image":"i/burgers/imperial.png","price":149,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Вестерн","description":"Со свиной котлетой, луковыми кольцами и соусом чипотл","image":"i/burgers/western.png","price":119,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Премиум","description":"Говядина, салат, соленый огурец, помидор, лук","image":"i/burgers/premium.png","price":140,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Двойной премиум","description":"Такой же, как Премиум, но с 2","image":"i/burgers/dublepremium.png","price":179,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Пикантный бургер","description":"куриная котлета, салат, лук, сол. огурец, сыр и медовая горчица","image":"i/burgers/spisy.png","price":140,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Чизбургер с беконом","description":"С говядиной, беконом, луком, сыром и огурцами","image":"i/burgers/cheeseburger-with-bacon.png","price":105,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"С куриным филе","description":"С фирменным куриным филе, майонезом и салатом","image":"i/burgers/burgerskurinymfile.png","price":98,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Со жгучим куриным филе","description":"С фирменным ОСТРЫМ куриным филе, майонезом и салатом","image":"i/burgers/burgersojguchimfile.png","price":104,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Сырный бургер с беконом","description":"С куриным филе и беконом, сыром, майонезом и салатом","image":"i/burgers/cheeseburgersbekonom.png","price":145,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Слоппи джо","description":"С куриным филе в соусе BBQ, салатом и майонезом","image":"i/burgers/sloppyjo.png","price":132,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Пири-пири Бургер","description":"С острым куриным филе","image":"i/burgers/burgerskurinymfile.png","price":129,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Чизбургер","description":"С говяжей котлетой, кетчупом и сыром, без овощей","image":"i/burgers/cheesburger.png","price":69,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Гамбургер","description":"Бургер с говяжей котлетой и кетчупом, но без овощей","image":"i/burgers/gamburger.png","price":59,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Чикенбург","description":"Бургер с куриной котлетой в панировке","image":"i/burgers/chikenburger.png","price":72,"category":"burgers","market":"sfc","type":"single","weight":1},{"name":"Кубит","description":"С куриным филе и картофельным драником","image":"i/salads/kubit.png","price":155,"category":"salads","market":"sfc","type":"single","weight":1},{"name":"Ролл с креветкой (3шт)","description":"Ролл с креветкой в панировке и соусом тар-тар","image":"i/salads/tortiliya.png","price":160,"category":"salads","market":"sfc","type":"single","weight":1},{"name":"Овощной салат","description":"Вегетарианский салат (можно в пост)","image":"i/salads/vegasalad.png","price":95,"category":"salads","market":"sfc","type":"single","weight":1},{"name":"Кусок фирменной курицы","description":"1 кусочек курицы в фирменной панировке SFC","image":"i/chicken/kusok-kuricy.png","price":68,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Чикен барбекю","description":"Куриный шашлычок на шпажке с болгарским перцем и луком","image":"i/chicken/chiken-barbequ.png","price":99,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Чикен стрипс","description":"6 кусочков фирменного филе","image":"i/chicken/chiken-strips.png","price":154,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Чикен террияки байтс","description":"6 кусочков филе в соусе террияки с салатом и кунжутом","image":"i/salads/teriaki.png","price":137,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Пири-пири вингс","description":"Пара крыльев в фирменной панировке пири-пири","image":"i/chicken/2bolshih-kryla.png","price":110,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Куриная лапша","description":"На курином бульоне с домашней лапшой","image":"i/chicken/kursup.png","price":80,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"  6 Острых   крылышек Hot\'n\'Flakey","description":"6 шт в острой фирменной панировке","image":"i/chicken/6ostryh-krylishek.png","price":185,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"12 Острых крылышек Hot\'n\'Flakey","description":"12 шт в острой фирменной панировке","image":"i/chicken/6ostryh-krylishek.png","price":334,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"24 Острых крылышек Hot\'n\'Flakey","description":"24 шт в острой фирменной панировке","image":"i/chicken/6ostryh-krylishek.png","price":619,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Маленькая картошка","description":"Стандартная порция на одного","image":"i/chicken/free-mini.png","price":49,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Большая картошка","description":"Большая порция на одного голодного","image":"i/chicken/free.png","price":74,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Картошка \'по-английски\'","description":"Крупные дольки молодого картофеля","image":"i/chicken/potatoes-in-english.png","price":75,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Картофельные драники\'","description":"Треугольные биточки из картофеля","image":"i/dranik.png","price":45,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Соус сырный (порц)","description":"","image":"i/chicken/sirniy1.png","price":20,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Соус чесночный (порц)","description":"","image":"i/chicken/chesnochniy1.png","price":20,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Соус карри (порц)","description":"","image":"i/chicken/curry1.png","price":20,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Соус кисло-сладкий (порц)","description":"","image":"i/chicken/kislosladkiy2.png","price":20,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Соус горчичный (порц)","description":"","image":"i/chicken/gorchichniy1.png","price":20,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Соус сальса (порц)","description":"островатый","image":"i/chicken/salsa1.png","price":20,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Соус барбекью (порц)","description":"с дымком","image":"i/chicken/bbq1.png","price":20,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Соус томатный кетчуп (порц)","description":"классический вкус Heinz","image":"i/chicken/tomatniy1.png","price":20,"category":"chicken","market":"sfc","type":"single","weight":1},{"name":"Цезарь","description":"С куриным филе, салатом, сыром Пармезан и сухариками","image":"i/salads/salad.png","price":135,"category":"salads","market":"sfc","type":"single","weight":1},{"name":"Лукошко","description":"С куриным филе, жареными грибочками, соленым огурцами и сыром","image":"i/salads/lukoshko.png","price":125,"category":"salads","market":"sfc","type":"single","weight":1},{"name":"Салат с тунцом","description":"Тунец с салатом, болгарским перцем, маслинами и кукурузой","image":"i/salads/saladtun.png","price":143,"category":"salads","market":"sfc","type":"single","weight":1},{"name":"Курица с яблоком и апельсином","description":"салат, яблоко, апельсин, огурец свежий, куриное филе","image":"i/salads/salad.png","price":120,"category":"salads","market":"sfc","type":"single","weight":1},{"name":"Курица с грецким орехом и черносливом","description":"салат, орех, чернослив, куриное филе с чесночным соусом","image":"i/salads/salad.png","price":120,"category":"salads","market":"sfc","type":"single","weight":1},{"name":"Салат греческий","description":"Салат, помидоры, огурцы, маслины, болгар. перец, Фета","image":"i/salads/salad.png","price":130,"category":"salads","market":"sfc","type":"single","weight":1},{"name":"Мини-тортилья","description":"Мини-лепешка, куриное филе, сыр, салат, помидор","image":"i/salads/tortiliya.png","price":67,"category":"salads","market":"sfc","type":"single","weight":1},{"name":"Тортилья SFC","description":"Куриное филе SFC, салат, помидор, сыр, майонез","image":"i/salads/tortiliya.png","price":124,"category":"salads","market":"sfc","type":"single","weight":1},{"name":"Тортилья пири-пири","description":"С острой курицей Пири-пири, салат, помидор, майонез, сыр","image":"i/salads/tortiliya.png","price":133,"category":"salads","market":"sfc","type":"single","weight":1},{"name":"Pepsi 1,25","description":"Бутылка 1.25","image":"i/drinks/pepsi-125.jpg","price":115,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Маффин","description":"","image":"i/drinks/muffin.jpg","price":70,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Pepsi 0,6","description":"Бутылка 0.6","image":"i/drinks/pepsi-bottle.jpg","price":75,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Mirinda 0,6","description":"Бутылка 0.6","image":"i/drinks/mirinda-bottle.jpg","price":75,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"7up 0,6","description":"Бутылка 0.6","image":"i/drinks/7up-bottle.png","price":75,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Mountain dew 0,6","description":"Бутылка 0.6","image":"i/drinks/mountain-dew-bottle.jpg","price":75,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Кленовый пекан","description":"самая популярная выпечка Subway","image":"i/drinks/maple-pecan.png","price":75,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Сок","description":"Упаковка 0.2 в ассортименте","image":"i/drinks/juice.jpg","price":40,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Чай Lipton","description":"Бутылка 0.6, Зеленый, Малина, Лимон, Персик","image":"i/drinks/lipton-tea.jpg","price":80,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Аква Минерале (без газа)","description":"Бутылка 0.6","image":"i/drinks/mineral-water-bottle.jpg","price":60,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Аква Минерале (Газ)","description":"Бутылка 0.6","image":"i/drinks/mineral-water-gas.jpeg","price":60,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Адреналин раш","description":"","image":"i/drinks/adrenaline-rush.jpg","price":120,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Кукис","description":"Творожная масса с шоколадной крошкой","image":"i/drinks/cookies.jpg","price":40,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Брюссельская вафля","description":"","image":"i/drinks/brussels-waffle.png","price":70,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Круассан","description":"","image":"i/drinks/croissant.jpg","price":80,"category":"drinks","market":"subway","type":"single","weight":1},{"name":"Pepsi","description":"Объемом от 0.4 Л, на выбор","image":"i/drinks/pepsi.jpg","price":50,"category":"drinks","market":"subway","type":"options","weight":1,"volumes":{"S":50,"M":58,"L":85}},{"name":"Вегетарианская 35см","description":"Лук, перец, томаты, сыр","image":"i/pizza/Veggie.png","price":250,"category":"pizza","market":"","type":"single","weight":1},{"name":"Pizza Spot (фирм) 35см","description":"бекон, сыр, руккола","image":"i/pizza/spotfirm.png","price":300,"category":"pizza","market":"","type":"single","weight":1},{"name":"Маргарита 35см","description":"Базилик, орегано, моцарелла","image":"i/pizza/margo.png","price":250,"category":"pizza","market":"","type":"single","weight":1},{"name":"Грибная 35см","description":"Орегано, пармезан, шампиньоны, моцарелла","image":"i/pizza/mashroom.png","price":250,"category":"pizza","market":"","type":"single","weight":1},{"name":"Баварская 35см","description":"Сосиски, охотничьи колбаски, моцарелла, пармезан","image":"i/pizza/bavar.png","price":300,"category":"pizza","market":"","type":"single","weight":1},{"name":"Пепперони 35см","description":"Пепперони, моцарелла","image":"i/pizza/pepperoni.png","price":300,"category":"pizza","market":"","type":"single","weight":1},{"name":"Четыре Сыра Кватро Формаджио 35см","description":"Творожный сыр, гауда, моцарелла","image":"i/pizza/Cheese.png","price":350,"category":"pizza","market":"","type":"single","weight":1},{"name":"Куриная 35см","description":"курица копченая и маринованная, моцарелла, томаты","image":"i/pizza/chicken.png","price":350,"category":"pizza","market":"","type":"single","weight":1},{"name":"Ветчина с грибами 35см","description":"Ветчина, шампиньоны, моцарелла","image":"i/pizza/hammashroom.png","price":350,"category":"pizza","market":"","type":"single","weight":1},{"name":"Морская 35см","description":"морепродукты, томаты, моцарелла","image":"i/pizza/sea.png","price":350,"category":"pizza","market":"","type":"single","weight":1},{"name":"Сицилийская (ОСТРАЯ) 35см","description":"Перец, лук, халапеньо, карбонат, курица","image":"i/pizza/sicil.png","price":400,"category":"pizza","market":"","type":"single","weight":1},{"name":"Гавайская 35см","description":"курица, ананасы, белый соус","image":"i/pizza/Hawaiian.png","price":400,"category":"pizza","market":"","type":"single","weight":1},{"name":"Карбонара 35см","description":"бекон, пармезан, моцарелла, орегано","image":"i/pizza/karbonara.png","price":400,"category":"pizza","market":"","type":"single","weight":1},{"name":"Мясная 35см","description":"Карбонат, бекон, курица, сыр","image":"i/pizza/meat.png","price":450,"category":"pizza","market":"","type":"single","weight":1},{"name":"Четыре Сезона Кватро Стаджиони 35см","description":"Каперсы, анчоусы, артишоки, грибы, ветчина","image":"i/pizza/4.png","price":450,"category":"pizza","market":"","type":"single","weight":1},{"name":"Доп сыр (в шаурму)","description":"Дополнительная порция сыра в любую шаурму","image":"i/ingredients/products/cheese.png","price":10,"category":"shaurma","market":"doner","type":"single","weight":1},{"name":"Буррито с говядиной (ОСТР)","description":"Говядина, Халапеньо, фасоль, сметана, сыр","image":"i/shaurma/burrito.jpg","price":230,"category":"shaurma","market":"doner","type":"single","weight":1},{"name":"Буррито с курицей (остр)","description":"Курица, Халапеньо, фасоль, сметана, сыр","image":"i/shaurma/burrito.jpg","price":190,"category":"shaurma","market":"doner","type":"single","weight":1},{"name":"Фахитос с курицей","description":"Курица, мексиканская смесь, соус гуакамоле, грибы, маслины","image":"i/shaurma/fahitas.jpg","price":200,"category":"shaurma","market":"doner","type":"single","weight":1},{"name":"Фахитос с говядиной","description":"Говядина, мексиканская смесь, соус гуакамоле, грибы, маслины","image":"i/shaurma/fahitas.jpg","price":250,"category":"shaurma","market":"doner","type":"single","weight":1},{"name":"Шаурма c курицей","description":"Куриная шаурма в лаваше с фирменным соусом и овощами","image":"i/shaurma/shaurma_kurica.jpg","price":170,"category":"shaurma","market":"doner","type":"single","weight":1},{"name":"Шаурма c говядиной","description":"Говядина со свежими овощами в лаваше","image":"i/shaurma/shaurma_goviadina.jpg","price":220,"category":"shaurma","market":"doner","type":"single","weight":1},{"name":"Мини-шаурма c курицей","description":"Мини-версия фирменной шаурмы","image":"i/shaurma/shaurma_kurica.jpg","price":130,"category":"shaurma","market":"doner","type":"single","weight":1},{"name":"Мини-шаурма c говядиной","description":"Мини-версия фирменной шаурмы","image":"i/shaurma/shaurma_kurica.jpg","price":150,"category":"shaurma","market":"doner","type":"single","weight":1},{"name":"Свинина с овощами в соусе тайчили","description":"Добрая порция свинины в лаваше","image":"i/shaurma/pork-taychiliroll.png","price":210,"category":"shaurma","market":"doner","type":"single","weight":1},{"name":"Курица с овощами в соусе терияки","description":"Курица в лаваше со свежими овощами в соусе терияки","image":"i/shaurma/teriyaki-chiken.png","price":190,"category":"shaurma","market":"doner","type":"single","weight":1}],"fillings":{"bacon":{"name":"Бекон","description":"(3-4 кусочка)","price":35,"image":"i/ingredients/products/bacon.png"},"bmt":{"name":"БМТ","description":"","price":60,"image":"i/ingredients/products/bmt.png"},"cheese":{"name":"Сыр","description":"(2 треугольника)","price":20,"image":"i/ingredients/products/cheese.png"},"moc":{"name":"Моцарелла","description":"(1 скуп)","price":20,"image":"i/ingredients/products/moc.png"},"chicken-breast":{"name":"Куриная грудка","description":"","price":60,"image":"i/ingredients/products/chicken-breast.png"},"chicken-teriyaki":{"name":"Курица Терияки","description":"","price":65,"image":"i/ingredients/products/chicken-teriyaki.png"},"ham":{"name":"Ветчина","description":"(4 кусочка)","price":45,"image":"i/ingredients/products/ham.png"},"melt":{"name":"Мелт","description":"","price":70,"image":"i/ingredients/products/melt.png"},"mushrooms":{"name":"Грибы","description":"(2 скупа)","price":50,"image":"i/ingredients/products/mushrooms.png"},"omelet":{"name":"Омлет","description":"","price":50,"image":"i/ingredients/products/omelet.png"},"pepperoni":{"name":"Пепперони","description":"(3 кусочка)","price":40,"image":"i/ingredients/products/pepperoni.png"},"pork-bbq":{"name":"Свинина Барбекю","description":"","price":65,"image":"i/ingredients/products/pork-bbq.png"},"roast":{"name":"Ростбиф","description":"(2-3 кусочка)","price":55,"image":"i/ingredients/products/roast.png"},"salami":{"name":"Салями","description":"(4 кусочка)","price":40,"image":"i/ingredients/products/salami.png"},"seafood":{"name":"Морепродукты","description":"(2 скупа)","price":45,"image":"i/ingredients/products/seafood.png"},"spicy-italian":{"name":"Острый итальянский","description":"","price":60,"image":"i/ingredients/products/spicy-italian.png"},"subway-club":{"name":"Сабвэй Клаб","description":"","price":70,"image":"i/ingredients/products/subway-club.png"},"tuna":{"name":"Тунец","description":"(2 скупа)","price":55,"image":"i/ingredients/products/tuna.png"},"turkey":{"name":"Индейка","description":"(3 кусочка)","price":45,"image":"i/ingredients/products/turkey.png"},"turkey-ham":{"name":"Индейка и ветчина","description":"(2/2 кусочка)","price":45,"image":"i/ingredients/products/turkey-ham.png"}},"volumes":{"S":{"name":"0.4 Л","short_name":"0.4"},"M":{"name":"0.5 Л","short_name":"0.5"},"L":{"name":"0.8 Л","short_name":"0.8"},"cheese":{"name":"сырный","short_name":"сырный"},"garlic":{"name":"чесночный","short_name":"чесночный"},"sweet-and-sour":{"name":"кисло-сладкий","short_name":"кисло-сладкий"},"curry":{"name":"карри","short_name":"карри"},"bbq":{"name":"барбекю","short_name":"барбекю"}},"sizes":{"1x":{"name":"15 См","price":0,"image":"i/sizes/1x.jpg"},"2x":{"name":"30 См","price":110,"image":"i/sizes/2x.jpg"}},"breads":{"white-italian":{"name":"Белый итальянский","description":"","price":0,"image":"i/bread/white-italian.png"},"white-sesame":{"name":"Белый с кунжутом","description":"","price":0,"image":"i/bread/white-sesame.png"},"oregano-parmesan":{"name":"Орегано-пармезан","description":"","price":0,"image":"i/bread/oregano-parmesan.png"},"grey":{"name":"Серый","description":"","price":0,"image":"i/bread/unknown_1.png"},"grey-with-cereal":{"name":"Серый с овсяными хлопьями","description":"","price":0,"image":"i/bread/grey-with-cereal.png"}},"vegetables":{"pekinka":{"name":"Пекинская капуста","description":"","price":0,"image":"i/ingredients/vegetables/pekinka.png"},"tomato":{"name":"Помидор","description":"","price":0,"image":"i/ingredients/vegetables/tomato.png"},"pickled-cucumber":{"name":"Соленый огурец","description":"","price":0,"image":"i/ingredients/vegetables/pickled-cucumber.png"},"onion-purple":{"name":"Красный лук","description":"","price":0,"image":"i/ingredients/vegetables/onion-purple.png"},"green-peppers-bulgarian":{"name":"Болгарский перец","description":"","price":0,"image":"i/ingredients/vegetables/green-peppers-bulgarian.png"},"olives":{"name":"Маслины","description":"","price":0,"image":"i/ingredients/vegetables/olives.png"},"pepper-hapapeno":{"name":"Острый перец Халапеньо","description":"","price":0,"image":"i/ingredients/vegetables/pepper-hapapeno.png"}},"sauces":{"1000-islands":{"name":"1000 Островов","description":"","price":0,"image":"i/ingredients/sauces/1000-islands.png"},"bbq":{"name":"Барбекю","description":"","price":0,"image":"i/ingredients/sauces/bbq.png"},"cheese":{"name":"Сырный","description":"","price":0,"image":"i/ingredients/sauces/cheese.png"},"chipotle":{"name":"Чиппотл","description":"","price":0,"image":"i/ingredients/sauces/chipotle.png"},"garlic":{"name":"Чесночный","description":"","price":0,"image":"i/ingredients/sauces/garlic.png"},"mayonnaise":{"name":"Майонез","description":"","price":0,"image":"i/ingredients/sauces/mayonnaise.png"},"mustard":{"name":"Горчица","description":"","price":0,"image":"i/ingredients/sauces/mustard.png"},"mustard-and-honey":{"name":"Горчица медовая","description":"","price":0,"image":"i/ingredients/sauces/mustard-and-honey.png"},"olive-oil":{"name":"Оливковое масло","description":"","price":0,"image":"i/ingredients/sauces/olive-oil.png"},"spicy-ketchup":{"name":"Острый кетчуп","description":"","price":0,"image":"i/ingredients/sauces/spicy-ketchup.png"},"sweet-and-sour":{"name":"Кисло-сладкий","description":"","price":0,"image":"i/ingredients/sauces/sweet-and-sour.png"},"sweet-onion":{"name":"Сладкий лук","description":"","price":0,"image":"i/ingredients/sauces/sweet-onion.png"},"wine-vinegar":{"name":"Винный уксус","description":"","price":0,"image":"i/ingredients/sauces/wine-vinegar.png"}},"markets":{"subway":{"name":"Subway","image":"i/markets/subway_logo.png"},"sfc":{"name":"South Fried Chicke","image":"i/markets/south_fried_chicken.png"},"doner":{"name":"Донер Кебаб","image":"i/markets/doner.png"}}}');

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CartComponent)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
/* harmony import */ var _src_public_i_others_cart_logo_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);


var _templateObject;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/**
 * Cart component.
 */
var CartComponent = /*#__PURE__*/function () {
  /**
   * @param {{
   *  containerElement: Node }} obj cart data
   * @return CartComponent
   */
  function CartComponent(obj) {
    _classCallCheck(this, CartComponent);
    console.log('BackPic', _src_public_i_others_cart_logo_png__WEBPACK_IMPORTED_MODULE_2__);
    this.containerElement = obj.containerElement;
    this.buildDOMElements();
    this.render();
  }
  _createClass(CartComponent, [{
    key: "buildDOMElements",
    value: function buildDOMElements() {
      this.cartElement = document.createElement('div');
      this.cartElement.classList.add('cart');
    }
  }, {
    key: "renderCartBody",
    value: function renderCartBody() {
      if (!this.cartElement) return;
      this.cartElement.innerHTML = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      <h2 class=\"cart__title\">\n        <span class=\"cart-logo\">\n          <img src=\"", "\" alt=\"\u041A\u043E\u0440\u0437\u0438\u043D\u0430\" />\n        </span>\n        <span class=\"cart-title__text\">\u041A\u043E\u0440\u0437\u0438\u043D\u0430</span>\n      </h2>\n      <div class=\"cart__content\">\n        <table class=\"cart-table\">\n          <tr class=\"cart-table__header\">\n            <th class=\"cart-table__name\">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</th>\n            <th class=\"cart-table__count\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E</th>\n          </tr>\n        </table>\n        <span class=\"cart-table__cart-overall\">\n          \u0418\u0442\u043E\u0433\u043E:&nbsp;<b class=\"cart-overall__price\">0</b>&nbsp;\u0440\u0443\u0431.\n        </span>\n        <button\n          type=\"submit\"\n          class=\"cart__checkout-button button-primary button-primary--grey\"\n        >\n          \u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437\n        </button>\n      </div>\n    "])), _src_public_i_others_cart_logo_png__WEBPACK_IMPORTED_MODULE_2__);
    }
  }, {
    key: "render",
    value: function render() {
      this.renderCartBody();
      this.containerElement.innerHTML = '';
      this.containerElement.appendChild(this.cartElement);
    }
  }]);
  return CartComponent;
}();


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(33);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 33 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Cart */

.cart {
  width: fit-content;
  min-width: 250px;
  height: fit-content;
  background-color: var(--light-yellow);
}

.cart__title {
  display: flex;
  justify-content: center;
  padding-top: 1.2rem;
  background-color: var(--yellow);
}

.cart-title__text {
  margin-left: -1.5rem;
  align-self: baseline;
  font-size: 2rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: 2px;
}

.cart-logo {
  margin-top: auto;
  display: inline-block;
}

.cart-logo,
.cart-logo img {
  width: 77px;
  height: 50px;
}

.cart__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem 1rem;
  font-weight: 700;
  color: var(--dark-gray);
}

.cart__checkout-button {
  display: block;
  margin-top: 1.5rem;
  width: 12rem;
  height: 2rem;
}

.product-card-info__to-cart-button {
  display: block;
  width: 150px;
  height: 40px;
}

/* Cart Table */

.cart-table {
  width: 100%;
}

.cart-table__header {
  width: 100%;
}

.cart-table__header th {
  padding: 0.5rem 0;
  border-bottom: var(--yellow) 3px solid;
}

.cart-table__name {
  text-align: start;
}

.cart-table__count {
  text-align: end;
}

.cart-table__cart-overall {
  display: inline-block;
  margin-top: 1rem;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 34 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "i/cart-logo.png";

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			0: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _components_productCatalog_ProductCatalog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _components_productNav_ProductNav_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* harmony import */ var _components_productNav_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _products_product__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _products_productCollection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26);
/* harmony import */ var _data_data_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var _components_cart_Cart__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(31);
/* harmony import */ var _products_markets__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2);


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }












/**
 * App entry point
 */
var App = /*#__PURE__*/function () {
  /**
   * @return AppComponent
   */
  function App() {
    _classCallCheck(this, App);
    this.currCategory = _components_productNav_constants__WEBPACK_IMPORTED_MODULE_2__.PRODUCT_CATEGORIES.SANDWICHES;
    console.log('jsonData', _data_data_json__WEBPACK_IMPORTED_MODULE_7__);
    this.fullData = _data_data_json__WEBPACK_IMPORTED_MODULE_7__;
    this.porductCollection = new _products_productCollection__WEBPACK_IMPORTED_MODULE_4__["default"](this.fullData.menu, _components_productNav_constants__WEBPACK_IMPORTED_MODULE_2__.PRODUCT_CATEGORIES.SANDWICHES);
    this.markets = new _products_markets__WEBPACK_IMPORTED_MODULE_9__["default"](this.fullData.markets);
    this.renderApp();
  }
  _createClass(App, [{
    key: "renderApp",
    value: function renderApp() {
      this.renderProductCatalog(this.porductCollection, this.markets);
      this.renderProductNav(this.porductCollection);
      this.renderCart();
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch('data/data.json');
            case 2:
              response = _context.sent;
              _context.next = 5;
              return response.json();
            case 5:
              data = _context.sent;
              return _context.abrupt("return", data);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function fetchData() {
        return _fetchData.apply(this, arguments);
      }
      return fetchData;
    }()
    /**
     * @param { ProductCollectionModel} products
     * @param {Markets} markets
     * @return ProductCatalogComponent
     */
  }, {
    key: "renderProductCatalog",
    value: function renderProductCatalog(products, markets) {
      var productCatalog = document.querySelector('[data-container="product-catalogue"]');
      new _components_productCatalog_ProductCatalog_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
        products: products,
        containerElement: productCatalog,
        markets: markets
      });
    }

    /**
     * @return CartComponent
     */
  }, {
    key: "renderCart",
    value: function renderCart() {
      var cartSection = document.querySelector('[data-container="cart"]');
      new _components_cart_Cart__WEBPACK_IMPORTED_MODULE_8__["default"]({
        containerElement: cartSection
      });
    }

    /**
     * @param {ProductCollectionModel} products
     * @return void
     */
  }, {
    key: "renderProductNav",
    value: function renderProductNav(products) {
      var _this = this;
      var productNav = document.querySelector('[data-container="product-nav"]');
      var handleProductCategoryChange = function handleProductCategoryChange(newCategory) {
        _this.porductCollection.setCategoryFilter(newCategory);
      };
      var allProductCategories = products.getAllProducts().reduce(function (categories, product) {
        var currCategory = product.category;
        if (!categories.includes(currCategory)) {
          categories.push(currCategory);
        }
        return categories;
      }, []);
      var orderedCategories = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_5__.sortAndFilterDuplicates)(allProductCategories, _components_productNav_constants__WEBPACK_IMPORTED_MODULE_2__.correctlyOrderedCategories);
      new _components_productNav_ProductNav_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
        categories: orderedCategories,
        containerElement: productNav,
        handleProductCategoryChange: handleProductCategoryChange,
        currentCategory: this.currCategory
      });
    }
  }]);
  return App;
}();

var app = new App();
})();

/******/ })()
;