import {ADD_TO_BASKET, CLEAR_BASKET} from "../types";

const initialState = [];

export const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_BASKET: {
            return [...state, action.payload]
        }
        case CLEAR_BASKET: {
            return initialState;
        }
        default: return state;
    }
}