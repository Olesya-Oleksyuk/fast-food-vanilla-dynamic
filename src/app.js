'use strict';

import ProductCatalogComponent from './components/productCatalog/ProductCatalog.js';
import ProductNavComponent from './components/productNav/ProductNav.js';
import {
  PRODUCT_CATEGORIES,
  correctlyOrderedCategories,
} from './components/productNav/constants';
import ProductModel from './products/product';
import ProductCollectionModel from './products/productCollection';
import { sortAndFilterDuplicates } from './utils/utils';
import './css/style.css';
import jsonData from './data/data.json';
import CartComponent from './components/cart/Cart';
import Markets from './products/markets';
import markets from './products/markets';

/**
 * App entry point
 */
export default class App {
  /**
   * @return AppComponent
   */
  constructor() {
    this.currCategory = PRODUCT_CATEGORIES.SANDWICHES;
    console.log('jsonData', jsonData);
    this.fullData = jsonData;

    this.porductCollection = new ProductCollectionModel(
      this.fullData.menu,
      PRODUCT_CATEGORIES.SANDWICHES
    );

    this.markets = new Markets(this.fullData.markets);
    this.renderApp();
  }

  renderApp() {
    this.renderProductCatalog(this.porductCollection, this.markets);
    this.renderProductNav(this.porductCollection);
    this.renderCart();
  }

  async fetchData() {
    const response = await fetch('data/data.json');
    const data = await response.json();
    return data;
  }

  /**
   * @param { ProductCollectionModel} products
   * @param {Markets} markets
   * @return ProductCatalogComponent
   */
  renderProductCatalog(products, markets) {
    const productCatalog = document.querySelector(
      '[data-container="product-catalogue"]'
    );

    new ProductCatalogComponent({
      products,
      containerElement: productCatalog,
      markets,
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
   * @param {ProductCollectionModel} products
   * @return void
   */
  renderProductNav(products) {
    const productNav = document.querySelector('[data-container="product-nav"]');
    const handleProductCategoryChange = newCategory => {
      this.porductCollection.setCategoryFilter(newCategory);
    };

    const allProductCategories = products
      .getAllProducts()
      .reduce((categories, product) => {
        const currCategory = product.category;
        if (!categories.includes(currCategory)) {
          categories.push(currCategory);
        }
        return categories;
      }, []);

    const orderedCategories = sortAndFilterDuplicates(
      allProductCategories,
      correctlyOrderedCategories
    );

    new ProductNavComponent({
      categories: orderedCategories,
      containerElement: productNav,
      handleProductCategoryChange: handleProductCategoryChange,
      currentCategory: this.currCategory,
    });
  }
}

const app = new App();
