export const html = String.raw;

export function sortAndFilterDuplicates(arr, order) {
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

export class Component {
  constructor() {}

  /**
   * useState
   *
   * @param {any} defaultValue
   * @return [function, function]
   */
  useState(defaultValue) {
    let value = defaultValue;
    const getValue = () => {
      return value;
    };
    const setValue = (newValue) => {
      value = newValue;
      this.render();
    };
    return [getValue, setValue];
  }

  render() {}
}