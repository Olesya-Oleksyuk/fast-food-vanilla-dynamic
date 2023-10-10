import {
  addToCart,
  addToModal,
  removeFromModal,
  setCurrentProductInModal,
} from "../../store/actions";
import Component from "../baseComponent/baseComponent";
import ProductCardComponent from "../productCard/productCard";
import "./style.css";
import ProductModalComponent from "../modal/Modal";
import { PRODUCT_CATEGORIES } from "../../store/constants";
import Store from "../../store/store";

/**
 * Product Catalog component. We call this a component as its behaviour is a
 * reusable component for web composition.
 *
 * With this design it is also easier to map it over to a true web-component,
 * which will hopefully soon become a standard in all the major browsers.
 */
export default class ProductCatalogComponent extends Component {
  /**
   * @param {{
   * containerElement: Element,
   * store: Store
   * }} obj product catalog data
   * @return ProductCatalogComponent
   */
  constructor(obj) {
    super();
    this.containerElement = obj.containerElement;
    this.store = obj.store;

    /**
     * Handles the click event of the cart button in Product Catalog.
     * @param {import("../../jsdocs/typedef").Product} productData
     */
    this.handleCartButtonClick = (productData) => {
      const currentCategory = this.store.getState().categoryFilter;
      if (currentCategory !== PRODUCT_CATEGORIES.SANDWICHES) {
        const productInCart = this.store
          .getState()
          .cart.cartItems.find((product) => productData.name === product.name);

        if (productInCart) {
          const newTotalPrice =
            productData.price * productData.count +
            productInCart.price * productInCart.count;
          const newCount = productData.count + productInCart.count;

          this.store.dispatch(
            addToCart({
              product: { ...productData, count: newCount },
              totalPrice: newTotalPrice,
            }),
          );
          return;
        }

        const totalProductPrice = productData.price * productData.count;
        this.store.dispatch(
          addToCart({
            product: productData,
            totalProductPrice,
          }),
        );
        return;
      }
      const productModalElement = document.querySelector(
        '[data-container="product-modal"]',
      );

      productModalElement.classList.remove("product-modal--closed");

      this.store.dispatch(setCurrentProductInModal(productData.name));

      const productInModal = { ...productData, components: {} };
      this.store.dispatch(
        addToModal({ productName: productData.name, productInModal }),
      );

      const closeModalHandler = (modalElement) => {
        productModalElement.classList.add("product-modal--closed");
        this.store.dispatch(removeFromModal());
        modalElement.remove();
      };

      new ProductModalComponent({
        containerElement: productModalElement,
        store: this.store,
        onCloseModal: closeModalHandler,
      });
    };

    this.updateProperties();
    this.buildDOMElements();
    this.render();
  }

  filterProductsByCategory() {
    this.filteredByCategoryList = this.store
      .getState()
      .products.filter(
        (product) => product.category === this.currentCategoryFilter,
      );
  }

  /**
   * Update component state & subscribe to store updates
   * @return void
   */
  updateProperties() {
    this.currentCategoryFilter = this.store.getState().categoryFilter;
    this.filterProductsByCategory();

    this.store.subscribeValue("categoryFilter", (category) => {
      this.currentCategoryFilter = category;
      this.filterProductsByCategory();
      this.buildDOMElements();
      this.render();
    });

    this.store.subscribeValue("products", () => {
      this.filterProductsByCategory();
      this.buildDOMElements();
      this.render();
    });
  }

  buildDOMElements() {
    this.productListElement = document.createElement("ul");
    this.productListElement.classList.add("product-catalogue__list");
  }

  renderProductCards() {
    if (!this.productListElement) return;

    this.filteredByCategoryList.forEach((product) => {
      new ProductCardComponent({
        containerElement: this.productListElement,
        product,
        store: this.store,
        onCartButtonClick: this.handleCartButtonClick,
      });
    });
  }

  render() {
    this.renderProductCards();
    this.containerElement.innerHTML = "";
    this.containerElement.appendChild(this.productListElement);
  }
}
