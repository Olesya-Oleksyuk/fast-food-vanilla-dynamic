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
    this.currCategory = PRODUCT_CATEGORIES.SANDWICHES;
    this.fetchData().then((data) => {
      this.porductCollection = this.createProductCollection(data.menu);
      this.filterProductsByCategory(this.currCategory);

      this.markets = new Markets(data.markets);
      this.renderApp();
    });
  }

  renderApp() {
    this.renderProductCatalog(this.currCategoryProducts, this.markets);
    this.renderProductNav(this.porductCollection, this.currCategoryProducts);
  }

  /**
   * @param {Product[]} products author data
   * @return ProductModel[]
   */
  createProductCollection(products) {
    return products.map((item) => {
      return new ProductModel({
        description: item.description,
        image: item.image,
        category: item.category,
        market: item.market,
        name: item.name,
        price: item.price,
        type: item.type,
        weight: item.weight,
      });
    });
  }

  async fetchData() {
    const response = await fetch('../data/data.json');
    const data = await response.json();
    return data;
  }

  /**
   * @param {string} category
   * @return void
   */
  filterProductsByCategory(category) {
    if (!category) return;
    this.currCategory = category;
    this.currCategoryProducts = this.porductCollection.filter(
      (item) => item.category === this.currCategory
    );
  }

  /**
   * @param { ProductModel[]} products
   * @param {MarketsModel} markets
   * @return ProductCatalogComponent
   */
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

  /**
   * @param { ProductModel[]} products
   * @return void
   */
  renderProductNav(products) {
    const productNav = document.querySelector('[data-container="product-nav"]');
    const handleProductCategoryChange = (newCategory) => {
      this.filterProductsByCategory(newCategory);
      this.renderProductCatalog(this.currCategoryProducts, this.markets);
    };

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
      handleProductCategoryChange: handleProductCategoryChange,
      currentCategory: this.currCategory,
    });
  }
}

const app = new App();
const html = String.raw;
