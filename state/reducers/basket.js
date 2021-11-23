import {
  ADD_TO_BASKET, CLEAR_BASKET, OPEN_BASKET, CLOSE_BASKET,
} from '../types';

const initialState = {
  isOpened: false,
  products: [],
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET: {
      return { ...state, products: [...state.products, action.payload], isOpened: true };
    }
    case CLEAR_BASKET: {
      return initialState;
    }
    case OPEN_BASKET: {
      return { ...state, isOpened: true };
    }
    case CLOSE_BASKET: {
      return { ...state, isOpened: false };
    }
    default: return state;
  }
};
