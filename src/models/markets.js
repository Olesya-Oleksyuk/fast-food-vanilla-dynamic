/**
 * Markets model
 */
export default class Markets {
  /**
   * @typedef {{name: String, image: String}} Market
   * @param {Object.<string, Market>} obj market data list
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
    if (!marketName) return;
    // eslint-disable-next-line consistent-return
    return this.list[marketName].image;
  }
}
