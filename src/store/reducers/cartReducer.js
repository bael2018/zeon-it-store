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
            state.carts = state.carts.filter((item) => {
                if (item.id === action.payload.id) {
                    return (
                        item.id === action.payload.id &&
                        item.pickedColor !== action.payload.pickedColor
                    );
                } else {
                    return item.id !== action.payload.id;
                }
            });
        },
        incrementCartItem: (state, action) => {
            const incrementItem = state.carts.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.pickedColor === action.payload.pickedColor
            );
            incrementItem.count = incrementItem.count + 1;
        },
        decrementCartItem: (state, action) => {
            const decrementItem = state.carts.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.pickedColor === action.payload.pickedColor
            );
            decrementItem.count = decrementItem.count - 1;
        },
        clearCartProduct: (state) => {
            state.carts = [];
        },
    },
});

export const {
    setCartProducts,
    deleteCartItem,
    decrementCartItem,
    incrementCartItem,
    clearCartProduct,
} = cartReducer.actions;
export default cartReducer.reducer;
