import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageStart: 0,
    pageEnd: 4,
};

const paginationReducer = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        pageStartIncrement: (state) => {
            state.pageStart = state.pageStart + 1;
        },
        pageStartDecrement: (state) => {
            state.pageStart = state.pageStart - 1;
        },
        pageEndIncrement: (state) => {
            state.pageEnd = state.pageEnd + 1;
        },
        pageEndDecrement: (state) => {
            state.pageEnd = state.pageEnd - 1;
        },
        setPageStart: (state, action) => {
            state.pageStart = action.payload
        },
        setPageEnd: (state, action) => {
            state.pageEnd = action.payload
        },
    },
});

export const {
    pageEndDecrement,
    pageEndIncrement,
    pageStartDecrement,
    pageStartIncrement,
    setPageEnd,
    setPageStart,
} = paginationReducer.actions;
export default paginationReducer.reducer;
