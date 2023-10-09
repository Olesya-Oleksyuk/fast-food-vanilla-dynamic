import {
  addToModal,
  removeFromModal,
  setCurrentProductInModal,
} from "../../store/actions";
import Store from "../../store/store";
import Component from "../baseComponent/baseComponent";
import ProductCardComponent from "../productCard/productCard";
import "./style.css";
import ProductModalComponent from "../modal/Modal";

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
     * @param {import('../../jsdocs/typedef').Product} productData
     */
    this.handleCartButtonClick = (productData) => {
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

  filterPorductsByCategory() {
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
    this.filterPorductsByCategory();

    this.store.subscribeValue("categoryFilter", (category) => {
      this.currentCategoryFilter = category;
      this.filterPorductsByCategory();
      this.buildDOMElements();
      this.render();
    });

    this.store.subscribeValue("products", () => {
      this.filterPorductsByCategory();
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
