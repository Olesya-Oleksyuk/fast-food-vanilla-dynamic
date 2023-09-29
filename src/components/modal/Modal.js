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

    this.updateProperties();
    this.buildDOMElements();
    this.render();
  }

  filterPorductsByCategory() {
    this.filteredByCategoryList = this.store
      .getState()
      .products.filter(
        (product) => product.category === this.currentCategoryFilter
      );
  }

  /**
   * Update component state & subscribe to store updates
   * @return void
   */
  updateProperties() {
    this.currentCategoryFilter = this.store.getState().categoryFilter;
    this.products = this.filterPorductsByCategory();
    this.markets = this.store.getState().markets;

    this.store.subscribeValue('categoryFilter', (category) => {
      this.currentCategoryFilter = category;
      this.products = this.filterPorductsByCategory();
      this.buildDOMElements();
      this.render();
    });

    this.store.subscribeValue('products', () => {
      this.products = this.filterPorductsByCategory();
      this.buildDOMElements();
      this.render();
    });
  }

  buildDOMElements() {
    this.productListElement = document.createElement('ul');
    this.productListElement.classList.add('product-catalogue__list');
  }

  renderProductCards() {
    if (!this.productListElement) return;

    this.filteredByCategoryList.map((product) => {
      new ProductCardComponent({
        containerElement: this.productListElement,
        product: product,
        store: this.store,
      });
    });
  }

  render() {
    this.renderProductCards();
    this.containerElement.innerHTML = '';
    this.containerElement.appendChild(this.productListElement);
  }
}
