import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: false,
    error: null,
    isFinished: false,
    page: 1
};

const bestsellerReducer = createSlice({
    name: "bestseller",
    initialState,
    reducers: {
        bestsellerPending: (state) => {
            state.status = true;
        },
        bestsellerFulfilled: (state, action) => {
            state.status = false;
            state.data = [...state.data, ...action.payload.data];
        },
        bestsellerInit: (state, action) => {
            state.data = action.payload.data
        },
        bestsellerRejected: (state, action) => {
            state.error = action.payload.error;
        },
        bestsellerFinished: (state, action) => {
            state.isFinished = action.payload.finished;
        },
        setBestsellerPage: (state, action) => {
            state.page = action.payload.page
        }
    },
});

export const {
    bestsellerPending,
    bestsellerFulfilled,
    bestsellerRejected,
    bestsellerFinished,
    setBestsellerPage,
    bestsellerInit
} = bestsellerReducer.actions;
export default bestsellerReducer.reducer;
