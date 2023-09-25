'use strict';
/**
 * Product model
 */
class ProductModel {
  /**
   * @typedef {{name: String, description: String, image: String, price: Number, category: String, market: String, type: String, weight: Number}} Product
   */

  /**
   * @param {Product} obj product data
   * @return ProductModel
   */
  constructor(obj) {
    this.updateProperties(obj);
  }

  /**
   * Map properties to this instance
   *
   * @param {Product} obj product data
   * @return void
   */
  updateProperties(obj) {
    if (obj.name) this.name = obj.name;
    if (obj.description) this.description = obj.description;
    if (obj.image) this.image = obj.image;
    if (obj.price) this.price = obj.price;
    if (obj.category) this.category = obj.category;
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
