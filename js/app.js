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
      this.porductCollection = new ProductCollectionModel(
        data.menu,
        PRODUCT_CATEGORIES.SANDWICHES
      );

      this.markets = new Markets(data.markets);
      this.renderApp();
    });
  }

  renderApp() {
    this.renderProductCatalog(this.porductCollection, this.markets);
    this.renderProductNav(this.porductCollection);
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
   * @param {ProductCollectionModel} products
   * @return void
   */
  renderProductNav(products) {
    const productNav = document.querySelector('[data-container="product-nav"]');
    const handleProductCategoryChange = (newCategory) => {
      this.porductCollection.setCategoryFilter(newCategory);
    };

    const allProductCategories = products
      .getAllProducts()
      .reduce((categories, product) => {
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
