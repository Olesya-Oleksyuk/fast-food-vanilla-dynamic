'use strict';

import CartComponent from './components/cart/Cart';
import ProductCatalogComponent from './components/productCatalog/ProductCatalog.js';
import ProductNavComponent from './components/productNav/ProductNav.js';
import './css/style.css';
import jsonData from './data/data.json';
import Markets from './products/markets';
import { PRODUCT_CATEGORIES } from './store/constants.js';
import reducer from './store/reducer.js';
import Store from './store/store.js';

/**
 * App entry point
 */
export default class App {
  /**
   * @return AppComponent
   */
  constructor() {
    this.currCategory = PRODUCT_CATEGORIES.SANDWICHES;
    this.fullData = jsonData;

    const initalState = {
      products: this.fullData.menu,
      markets: new Markets(this.fullData.markets),
      categoryFilter: PRODUCT_CATEGORIES.SANDWICHES,
    };

    const store = new Store(reducer, initalState);

    this.markets = new Markets(this.fullData.markets);
    this.renderApp(store);
  }

  renderApp(store) {
    this.renderProductCatalog(store);
    this.renderProductNav(store);
    this.renderCart();
  }

  async fetchData() {
    const response = await fetch('data/data.json');
    const data = await response.json();
    return data;
  }

  /**
   * @param { Store } store
   * @return ProductCatalogComponent
   */
  renderProductCatalog(store) {
    const productCatalog = document.querySelector(
      '[data-container="product-catalogue"]'
    );

    new ProductCatalogComponent({
      containerElement: productCatalog,
      store,
    });
  }

  /**
   * @return CartComponent
   */
  renderCart() {
    const cartSection = document.querySelector('[data-container="cart"]');

    new CartComponent({
      containerElement: cartSection,
    });
  }

  /**
   * @param {Store} store
   * @return void
   */
  renderProductNav(store) {
    const productNav = document.querySelector('[data-container="product-nav"]');

    new ProductNavComponent({
      containerElement: productNav,
      store,
    });
  }
}

const app = new App();
