import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: false,
    error: null,
    totalCount: 0,
    zoomImage: "",
};

const productReducer = createSlice({
    name: "product",
    initialState,
    reducers: {
        productPending: (state) => {
            state.status = true;
        },
        productFulfilled: (state, action) => {
            state.status = false;
            state.data = action.payload.data;
        },
        productRejected: (state, action) => {
            state.error = action.payload.error;
        },
        setProductCount: (state, action) => {
            state.totalCount = action.payload.total;
        },
        setZoomImage: (state, action) => {
            state.zoomImage = action.payload.image;
        },
    },
});

export const {
    productPending,
    productFulfilled,
    productRejected,
    setProductCount,
    setZoomImage,
} = productReducer.actions;
export default productReducer.reducer;
