import {ADD_TO_BASKET, CLEAR_BASKET} from "./types";

export function addToBasket(product) {
    return {
        type: ADD_TO_BASKET,
        payload: product
    }
}

export function clearBasket() {
    return {
        type: CLEAR_BASKET,
    }
}