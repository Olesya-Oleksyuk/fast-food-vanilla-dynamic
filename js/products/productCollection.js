class ProductCollectionModel extends Observable {
   #products;
  /**
   * Map properties to this instance
   *
   * @param {ProductModel[]} products
   * @param {string} initialCategory
   * @return ProductCollectionModel
   */
  constructor(products, initialCategory = PRODUCT_CATEGORIES.SANDWICHES) {
    super();
    this.#products = products;
    this.categoryFilter = initialCategory;
  }

  /**
   * Loop through all registered products and return
   * the product object that matches the id.
   *
   * @param {number} id
   * @return ProductModel
   */
  getProduct(id) {
    return this.#products.find((item) => item.id === id);
  }

  /**
   * Register a new product to this collection.
   * Notify the subscribers.
   *
   * @param {ProductModel} product
   * @return void
   */
  addProduct(product) {
    this.#products.push(product);
    this.notifySubscribers();
  }

  /**
   * Update a product object.
   * Notify the subscribers.
   *
   * @param Object obj
   * @return void
   */
  updateProduct(obj) {
    const product = this.getProduct(obj.id);
    product.updateProperties(obj);
    this.notifySubscribers();
  }

  getAllProducts() {
    return this.#products;
  }

  getFilteredProducts() {
    return this.#products.filter(
      (item) => item.category === this.categoryFilter
    );
  }

  /**
   * @param {string} category
   * @return void
   */
  setCategoryFilter(category) {
    this.categoryFilter = category;
    this.notifySubscribers();
  }
}
