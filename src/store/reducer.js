import Action from "./actions";
import { BrightnessTheme } from "./enums";

const initialState = {
  products: [],
  categoryFilter: '',
};

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
