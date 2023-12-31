export const Action = {
  SetCategoryFilter: "setCategoryFilter",
  AddToModal: "addToModal",
  UpdateComponentsOfProductInModal: "updateComponentsOfProductInModal",
  SetCurrentProductInModal: "setCurrentProductInModal",
  RemoveFromModal: "removeFromModal",
  SetProductCountInModal: "setProductCountInModal",
  SetProductOverallPriceInModal: "setProductOverallPriceInModal",
  AddToCart: "addToCart",
  AddSandwichToCart: "addSandwichToCart",
};

export const setProductCategoryFilter = (payload) => ({
  type: Action.SetCategoryFilter,
  payload,
});

export const addToModal = (payload) => ({
  type: Action.AddToModal,
  payload,
});

export const removeFromModal = () => ({
  type: Action.RemoveFromModal,
});

export const setCurrentProductInModal = (payload) => ({
  type: Action.SetCurrentProductInModal,
  payload,
});

export const updateProductInModal = (payload) => ({
  type: Action.UpdateComponentsOfProductInModal,
  payload,
});

export const setProductCountInModal = (payload) => ({
  type: Action.SetProductCountInModal,
  payload,
});

export const addToCart = (payload) => ({
  type: Action.AddToCart,
  payload,
});

export const addSandwichToCart = (payload) => ({
  type: Action.AddSandwichToCart,
  payload,
});
