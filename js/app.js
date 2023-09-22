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
    this.fetchData().then((data) => {
      const sandwichesData = data.menu.filter(
        (item) => item.category === 'sandwiches'
      );

      this.markets = new Markets(data.markets);
      this.renderProductCatalog(sandwichesData, this.markets);
      this.renderProductNav(data.menu);
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

  renderProductNav(products) {
    const productNav = document.querySelector('[data-container="product-nav"]');

    const allProductCategories = products.reduce((categories, product) => {
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
    });
  }
}

const app = new App();
const html = String.raw;
