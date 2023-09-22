'use strict';
/**
 * Markets model
 */
class Markets {
  /**
   * @param {[{name: String, image: String}]} obj market data list
   * @return MarketsModel
   */
  constructor(obj) {
    this.list = obj;
    this.marketNames = Object.keys(obj);
  }

  /**
   * @return string[] market name list
   */
  getMarketNames() {
    return this.marketNames;
  }

  /**
   * @return string market logo source url
   */
  getMarketLogo(marketName) {
    return this.list[marketName].image;
  }
}
