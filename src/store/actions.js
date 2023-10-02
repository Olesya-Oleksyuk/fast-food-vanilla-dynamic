export const Action = {
  SetCategoryFilter: 'setCategoryFilter',
};

/**
 * @param {string} payload
 */
export const setProductCategoryFilter = (payload) => ({
  type: Action.SetCategoryFilter,
  payload,
});

export default Action;
