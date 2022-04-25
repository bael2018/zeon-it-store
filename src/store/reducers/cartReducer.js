import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: [],
};

const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartProducts: (state, action) => {
            state.carts.push(action.payload.cart);
        },
        deleteCartItem: (state, action) => {
            state.carts = state.carts.filter(
                (item) => item.id !== action.payload.id
            );
        },
        incrementCartItem: (state, action) => {
            const incrementItem = state.carts.find(
                (item) => item.id === action.payload.id
            );
            incrementItem.count = incrementItem.count + 1;
        },
        decrementCartItem: (state, action) => {
            const decrementItem = state.carts.find(
                (item) => item.id === action.payload.id
            );
            decrementItem.count = decrementItem.count - 1;
        },
    },
});

export const {
    setCartProducts,
    deleteCartItem,
    decrementCartItem,
    incrementCartItem,
} = cartReducer.actions;
export default cartReducer.reducer;
