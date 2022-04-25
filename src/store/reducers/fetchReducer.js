import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: false,
    error: null,
};

const fetchReducer = createSlice({
    name: "fetch",
    initialState,
    reducers: {
        fetchPending: (state) => {
            state.status = true;
        },
        fetchFulfilled: (state, action) => {
            state.status = false;
            state.data = action.payload.data;
        },
        fetchRejected: (state, action) => {
            state.error = action.payload.error;
        },
    },
});

export const { fetchPending, fetchFulfilled, fetchRejected } =
    fetchReducer.actions;
export default fetchReducer.reducer;
