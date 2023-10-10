import CartComponent from "./components/cart/Cart";
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
class App {
  /**
   * @return AppComponent
   */
  constructor() {
    this.fullData = jsonData;

    const initialState = {
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
      cart: {
        cartItems: [],
        totalPrice: 0,
      },
    };

    const store = new Store(reducer, initialState);

    this.markets = new Markets(this.fullData.markets);
    App.renderApp(store);
  }

  static renderApp(store) {
    App.renderProductCatalog(store);
    App.renderProductNav(store);
    App.renderCart(store);
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
   * @param { Store } store
   * @return CartComponent
   */
  static renderCart(store) {
    const cartSection = document.querySelector('[data-container="cart"]');

    new CartComponent({
      containerElement: cartSection,
      store,
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
