import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: false,
    error: null,
    isSearched: false,
    isVisible: false,
};

const searchReducer = createSlice({
    name: "search",
    initialState,
    reducers: {
        searchPending: (state) => {
            state.status = true;
        },
        searchFulfilled: (state, action) => {
            state.status = false;
            state.data = action.payload.data;
        },
        searchRejected: (state, action) => {
            state.error = action.payload.error;
        },
        setIsSearched: (state) => {
            state.isSearched = !state.isSearched;
        },
        setIsVisible: (state) => {
            state.isVisible = !state.isVisible;
        },
    },
});

export const {
    searchPending,
    searchFulfilled,
    searchRejected,
    setIsSearched,
    setIsVisible,
} = searchReducer.actions;
export default searchReducer.reducer;
