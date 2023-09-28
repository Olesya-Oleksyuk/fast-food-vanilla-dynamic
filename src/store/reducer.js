import Action from './actions';

const initialState = {
  products: [],
  markets: [],
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
