export const Action = {
  SetCategoryFilter: 'setCategoryFilter',
};

export const setProductCategoryFilter = payload => ({
  type: Action.SetCategoryFilter,
  payload,
});

export default Action;
