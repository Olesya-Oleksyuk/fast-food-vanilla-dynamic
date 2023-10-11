import CartComponent from "./components/cart/Cart";
import ProductCatalogComponent from "./components/productCatalog/ProductCatalog";
import ProductNavComponent from "./components/productNav/ProductNav";
import "./css/style.css";
import jsonData from "./data/data.json";
import Markets from "./products/markets";
import { PRODUCT_CATEGORIES } from "./store/constants";
import reducer from "./store/reducer";
import Store from "./store/store";
import ButtonBurgerComponent from "./components/buttons/burger/Burger";

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
    App.addEventListeners();
  }

  static renderApp(store) {
    App.renderProductCatalog(store);
    App.renderProductNav(store);
    App.renderCart(store);
    App.renderBurgerButton();
  }

  static handleBurgerMenuClose() {
    const homePage = document.querySelector(".home-page");
    const asideMenu = document.querySelector(".home-page__aside-menu");

    const width = window.innerWidth;
    const burgerNavBreakpoint = 800;
    if (width >= burgerNavBreakpoint) return;

    if (asideMenu.classList.contains("open")) {
      asideMenu.classList.remove("open");
      homePage.classList.remove("no-scroll");
    } else {
      asideMenu.classList.add("open");
      homePage.classList.add("no-scroll");
    }
  }

  static addEventListeners() {
    const burgerMenuButton = document.querySelector(".burger-button");

    burgerMenuButton.addEventListener("click", App.handleBurgerMenuClose);
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
      onCategoryChange: this.handleBurgerMenuClose,
      store,
    });
  }

  static renderBurgerButton() {
    const productAside = document.querySelector(
      '[data-container="product-aside"]',
    );

    const burgerMarkup = ButtonBurgerComponent.render({
      classPositioning: "product-aside__button",
    });

    productAside.prepend(burgerMarkup);
  }
}

new App();
