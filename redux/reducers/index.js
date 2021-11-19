import { combineReducers } from "redux";
import { basketReducer } from "./basket";

const reducer = combineReducers({
    basket: basketReducer,
});

export default reducer;