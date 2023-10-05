export const Action = {
  SetCategoryFilter: "setCategoryFilter",
  AddToModal: "addToModal",
  UpdateComponentsOfProductInModal: "updateComponentsOfProductInModal",
  SetCurrentProductInModal: "setCurrentProductInModal",
};

/**
 * @param {string} payload
 */
export const setProductCategoryFilter = (payload) => ({
  type: Action.SetCategoryFilter,
  payload,
});

export const addToModal = (payload) => ({
  type: Action.AddToModal,
  payload,
});

export const setCurrentProductInModal = (payload) => ({
  type: Action.SetCurrentProductInModal,
  payload,
});

export const updateProductInModal = (payload) => ({
  type: Action.UpdateComponentsOfProductInModal,
  payload,
});
