import {
  ADD_TO_BASKET, CLEAR_BASKET, OPEN_BASKET, CLOSE_BASKET,
} from './types';

export function addToBasket(product) {
  return {
    type: ADD_TO_BASKET,
    payload: product,
  };
}

export function clearBasket() {
  return {
    type: CLEAR_BASKET,
  };
}

export function openBasket() {
  return {
    type: OPEN_BASKET,
  };
}

export function closeBasket() {
  return {
    type: CLOSE_BASKET,
  };
}
