'use strict';

class ProductModel {
  /**
   * @param {{name: String, description: String, image: String, price: Number, market: String, type: String, weight: Number}} book data
   * @return ProductModel
   */
  constructor(obj) {
    this.updateProperties(obj);
  }

  /**
   * Map properties to this instance
   *
   * @param {{name: String, description: String, image: String, price: Number, market: String, type: String, weight: Number}} book data
   * @return void
   */
  updateProperties(obj) {
    if (obj.name) this.name = obj.name;
    if (obj.description) this.description = obj.description;
    if (obj.image) this.image = obj.image;
    if (obj.price) this.price = obj.price;
    if (obj.market) this.market = obj.market;
    if (obj.type) this.type = obj.type;
    if (obj.weight) this.weight = obj.weight;
  }

  /**
   * Get a list of properties for this class
   *
   * @returns {string[]}
   */
  static getFields() {
    return [
      'name',
      'description',
      'image',
      'price',
      'market',
      'type',
      'weight',
    ];
  }
}

/**
 * Product Catalog component. We call this a component as its behaviour is a
 * reusable component for web composition.
 *
 * With this design it is also easier to map it over to a true web-component,
 * which will hopefully soon become a standard in all the major browsers.
 */
class ProductCatalogComponent {
  /**
   * @param {{products: ProductModel[], containerElement: Node}} obj author data
   * @return ProductCatalogComponent
   */
  constructor(obj) {
    this.containerElement = obj.containerElement;
    this.fields = ProductModel.getFields();
    this.updateProperties(obj);
    this.buildDOMElements();
    this.render();
  }

  /**
   * @param {{products: ProductModel[], containerElement: Node}} obj author data
   * @return void
   */
  updateProperties(obj) {
    this.products = obj.products;
  }

  buildDOMElements() {
    this.productListElement = document.createElement('ul');
    this.productListElement.classList.add('product-catalogue__list');
  }

  renderProductCards() {
    // map() will loop the fields property and create product card fields
    this.productListElement.innerHTML = `
			<tr>
			${this.products
        .map(
          (product) => `
            <li class="product-card">
            ${renderProductCardBody(product)}
            </li>
            `
        )
        .join('')}
			</tr>\
		`;
  }

  renderProductCardBody(product) {
    return `
    <div>Product Info</div>
		`;
  }

  render() {
    this.renderHead();
    this.renderBody();

    this.containerElement.innerHTML = '';
    this.containerElement.appendChild(this.productListElement);
  }
}
