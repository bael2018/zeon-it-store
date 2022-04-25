import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: false,
    error: null,
    totalCount: 0,
    page: 1,
    isFetching: true
};

const newsReducer = createSlice({
    name: "news",
    initialState,
    reducers: {
        newsPending: (state) => {
            state.status = true;
        },
        newsFulfilled: (state, action) => {
            state.status = false;
            state.data = [...state.data, ...action.payload.data];
        },
        newsRejected: (state, action) => {
            state.error = action.payload.error;
        },
        setNewsTotalCount: (state, action) => {
            state.totalCount = action.payload.count;
        },
        setNewsPage: (state, action) => {
            state.page = action.payload.page;
        },
        setIsFetching: (state, action) => {
            state.isFetching = action.payload.fetching
        }
    },
});

export const {
    newsFulfilled,
    newsPending,
    newsRejected,
    setNewsPage,
    setNewsTotalCount,
    setIsFetching
} = newsReducer.actions;
export default newsReducer.reducer;
