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

/**
 * @typedef {Object} ElementBySelector
 * @property {Element} element the matching element
 * @property {number} index the matching element's index
 */

/**
 * Gets an item by selector in a NodeList.
 *
 * @param {NodeList} nodeList - The NodeList to search in.
 * @param {string} selector - The CSS selector to use for searching.
 * @return {ElementBySelector|null} The matching element or null if not found.
 */
export function getElementBySelector(nodeList, selector) {
  return (
    Array.from(nodeList).reduce((result, currElement, index) => {
      if (currElement.classList.contains(selector)) {
        return { element: currElement, index };
      }
      return result;
    }, {}) || null
  );
}

/**
 * Generates a class selectors list string
 *
 * @param {Object} obj
 * @param {string} [obj.classPositioning] - The positioning class.
 * @param {string} obj.classBlockName - The block name class.
 * @param {Array} [obj.classModifiers] - The array of class modifiers.
 * @return {string} The generated class list string.
 */
export const composeClassList = (obj) => {
  const {
    classPositioning = "",
    classBlockName = "",
    classModifiers = [],
  } = obj;

  const hasModifiers =
    Boolean(classBlockName) && Boolean(classModifiers.length);

  const classModifiersList = hasModifiers
    ? classModifiers
        .map((modifier) => `${classBlockName}--${modifier}`)
        .join(" ")
    : "";

  const fullClassName =
    `${classPositioning} ${classBlockName} ${classModifiersList}`.trim();
  return fullClassName;
};

export const capitalize = (string) =>
  (string &&
    typeof string === "string" &&
    string[0].toUpperCase() + string.slice(1)) ||
  "";

export function getObjectFromFormData(form) {
  const formData = new FormData(form);
  const formObject = {};
  Array.from(formData.entries()).forEach(([key, currValue]) => {
    if (formObject[key]) {
      const oldValue = formObject[key];
      const newValue = Array.isArray(oldValue)
        ? [...oldValue, currValue]
        : [oldValue, currValue];
      formObject[key] = newValue;
    } else {
      formObject[key] = currValue;
    }
  });
  return formObject;
}
