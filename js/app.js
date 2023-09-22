'use strict';
/**
 * App entry point
 */
class App {
  /**
   * @param {{products: ProductModel[], containerElement: Node, markets: Markets}} obj author data
   * @return ProductCatalogComponent
   */
  constructor() {
    debugger;
    this.fetchData().then((data) => {
      const sandwichesData = data.menu.filter(
        (item) => item.category === 'sandwiches'
      );

      this.markets = new Markets(data.markets);
      this.renderProductCatalog(sandwichesData, this.markets);
    });
  }

  async fetchData() {
    const response = await fetch('../data/data.json');
    const data = await response.json();
    return data;
  }

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
}

const app = new App();
const html = String.raw;
