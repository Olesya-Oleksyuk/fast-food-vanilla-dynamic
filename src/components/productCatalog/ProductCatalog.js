import Store from "../../store/store";
import Component from "../baseComponent/baseComponent";
import ProductCardComponent from "../productCard/productCard";
import "./style.css";

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
    this.handleCartButtonClick = () => {
      document
        .querySelector('[data-container="product-modal"]')
        .classList.remove("product-modal--closed");
      // this.store.dispatch({ type: 'ADD_TO_CART' });
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
