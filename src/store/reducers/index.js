import collectionReducer from "./collectionReducer";
import breadCrumbReducer from "./breadCrumbReducer";
import newArrivalReducer from "./newArrivalReducer";
import bestsellerReducer from "./bestsellerReducer";
import paginationReducer from "./paginationReducer";
import wishlistReducer from "./wishlistReducer";
import productReducer from "./productReducer";
import searchReducer from "./searchReducer";
import fetchReducer from "./fetchReducer";
import modalReducer from "./modalReducer";
import newsReducer from "./newsReducer";
import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

export const rootReducer = combineReducers({
    collection: collectionReducer,
    pagination: paginationReducer,
    breads: breadCrumbReducer,
    product: productReducer,
    wishes: wishlistReducer,
    best: bestsellerReducer,
    new: newArrivalReducer,
    search: searchReducer,
    fetch: fetchReducer,
    modal: modalReducer,
    cart: cartReducer,
    news: newsReducer,
});
