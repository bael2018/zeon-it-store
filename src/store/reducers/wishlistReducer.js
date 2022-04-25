import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishes: [],
};

const wishlistReducer = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlistProducts: (state, action) => {
            state.wishes.push(action.payload.wishes);
        },
        deleteWishlistProduct: (state, action) => {
            state.wishes = state.wishes.filter(
                (item) => item.id !== action.payload.id
            );
        },
    },
});

export const { setWishlistProducts, deleteWishlistProduct } =
    wishlistReducer.actions;
export default wishlistReducer.reducer;
