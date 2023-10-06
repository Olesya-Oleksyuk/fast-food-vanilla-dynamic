import { Action } from "./actions";

/**
 * The initial state of the application.
 * @constant {Object}
 * @property {Array} products - The list of products.
 * @property {Array} markets - The list of markets.
 * @property {string} categoryFilter - The category filter.
 * */
const initialState = {
  products: [],
  markets: [],
  categoryFilter: "",
  modal: {},
  currentProductInModal: null,
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
  switch (action?.type) {
    case Action.SetCategoryFilter:
      return {
        ...state,
        categoryFilter: action.payload,
      };
    case Action.AddToModal:
      return {
        ...state,
        modal: {
          ...state.modal,
          [action.payload.productName]: action.payload.productInModal,
        },
      };
    case Action.RemoveFromModal:
      return {
        ...state,
        modal: {},
      };
    case Action.UpdateComponentsOfProductInModal:
      return {
        ...state,
        modal: {
          ...state.modal,
          [action.payload.productName]: {
            ...state.modal[action.payload.productName],
            components: {
              ...state.modal[action.payload.productName].components,
              ...action.payload.productData,
            },
          },
        },
      };
    case Action.SetProductCountInModal:
      return {
        ...state,
        modal: {
          ...state.modal,
          [action.payload.productName]: {
            ...state.modal[action.payload.productName],
            count: action.payload.count,
          },
        },
      };
    case Action.SetCurrentProductInModal:
      return {
        ...state,
        currentProductInModal: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
