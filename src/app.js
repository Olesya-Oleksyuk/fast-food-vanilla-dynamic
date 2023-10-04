import CartComponent from "./components/cart/Cart";
import ProductModalComponent from "./components/modal/Modal";
import ProductCatalogComponent from "./components/productCatalog/ProductCatalog";
import ProductNavComponent from "./components/productNav/ProductNav";
import "./css/style.css";
import jsonData from "./data/data.json";
import Markets from "./products/markets";
import { PRODUCT_CATEGORIES } from "./store/constants";
import reducer from "./store/reducer";
import Store from "./store/store";

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
      productSupplements: {
        breads: this.fullData.breads,
        sizes: this.fullData.sizes,
        sauces: this.fullData.sauces,
        vegetables: this.fullData.vegetables,
        fillings: this.fullData.fillings,
      },
      markets: new Markets(this.fullData.markets),
      categoryFilter: PRODUCT_CATEGORIES.SANDWICHES,
      modal: {},
      currentProductInModal: null,
    };

    const store = new Store(reducer, initalState);

    this.markets = new Markets(this.fullData.markets);
    App.renderApp(store);
  }

  static renderApp(store) {
    App.renderProductCatalog(store);
    App.renderProductNav(store);
    App.renderCart();
    App.renderProductModal(store);
  }

  static async fetchData() {
    const response = await fetch("data/data.json");
    const data = await response.json();
    return data;
  }

  /**
   * @param { Store } store
   * @return ProductCatalogComponent
   */
  static renderProductCatalog(store) {
    const productCatalog = document.querySelector(
      '[data-container="product-catalogue"]',
    );

    new ProductCatalogComponent({
      containerElement: productCatalog,
      store,
    });
  }

  /**
   * @return CartComponent
   */
  static renderCart() {
    const cartSection = document.querySelector('[data-container="cart"]');

    new CartComponent({
      containerElement: cartSection,
    });
  }

  /**
   * @return ModalComponent
   */
  static renderProductModal(store) {
    const productModalElement = document.querySelector(
      '[data-container="product-modal"]',
    );

    const closeModalHandler = () => {
      productModalElement.classList.add("product-modal--closed");
    };

    new ProductModalComponent({
      containerElement: productModalElement,
      store,
      onCloseModal: closeModalHandler,
    });
  }

  /**
   * @param {Store} store
   * @return void
   */
  static renderProductNav(store) {
    const productNav = document.querySelector('[data-container="product-nav"]');

    new ProductNavComponent({
      containerElement: productNav,
      store,
    });
  }
}

new App();
