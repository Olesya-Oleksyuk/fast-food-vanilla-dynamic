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
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
  switch (action?.type) {
    case Action.SetCategoryFilter:
      return {
        ...state,
        categoryFilter: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
