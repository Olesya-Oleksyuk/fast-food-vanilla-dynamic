function sortAndFilterDuplicates(arr, order) {
  const orderMap = {};
  order.forEach((item, index) => {
    orderMap[item] = index;
  });

  const sortedArray = arr.sort((a, b) => orderMap[a] - orderMap[b]);

  const uniqueArray = [];
  const seen = new Set();

  sortedArray.forEach((item) => {
    if (!seen.has(item)) {
      uniqueArray.push(item);
      seen.add(item);
    }
  });

  return uniqueArray;
}

class Observable {
  constructor() {
    this.subscribers = [];
  }

  /**
   * Subscribe for changes
   * Add a function you want to be executed whenever this model changes.
   *
   * @param {Function} fn
   * @return null
   */
  subscribe(fn) {
    this.subscribers.push(fn);
  }

  /**
   * Unsubscribe from being notified when this model changes.
   *
   * @param {Function} fn
   * @return null
   */
  unsubscribe(fn) {
    this.subscribers = this.subscribers.filter((item) => item !== fn);
  }

  /**
   * Notify subscribers
   *
   * @return null
   */
  notifySubscribers() {
    this.subscribers.forEach((fn) => fn());
  }
}
