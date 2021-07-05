import { combineReducers } from "redux";
import category from "features/category/duck";
import header from "components/header/duck";
import cart from "features/cart-page/duck";

export default combineReducers({ category, header, cart });
