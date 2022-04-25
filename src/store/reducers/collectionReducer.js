import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: false,
    error: null,
    isFinished: false,
    page: 1
};

const collectionReducer = createSlice({
    name: "collection",
    initialState,
    reducers: {
        collectionPending: (state) => {
            state.status = true;
        },
        collectionFulfilled: (state, action) => {
            state.status = false;
            state.data = [...state.data, ...action.payload.data];
        },
        collectionInit: (state, action) => {
            state.data = action.payload.data
        },
        collectionRejected: (state, action) => {
            state.error = action.payload.error;
        },
        collectionFinished: (state, action) => {
            state.isFinished = action.payload.finished;
        },
        setCollectionPage: (state, action) => {
            state.page = action.payload.page
        }
    },
});

export const {
    collectionFinished,
    collectionFulfilled,
    collectionInit,
    collectionPending,
    collectionRejected,
    setCollectionPage
} = collectionReducer.actions;
export default collectionReducer.reducer;