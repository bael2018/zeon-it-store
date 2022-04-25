import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: false,
    error: null,
    isFinished: false,
    page: 1
};

const newArrivalReducer = createSlice({
    name: "newArrival",
    initialState,
    reducers: {
        newArrivalPending: (state) => {
            state.status = true;
        },
        newArrivalFulfilled: (state, action) => {
            state.status = false;
            state.data = [...state.data, ...action.payload.data];
        },
        newArrivalInit: (state, action) => {
            state.data = action.payload.data
        },
        newArrivalRejected: (state, action) => {
            state.error = action.payload.error;
        },
        setNewArrivalFinished: (state, action) => {
            state.isFinished = action.payload.finished;
        },
        newArrivalPage: (state, action) => {
            state.page = action.payload.page
        }
    },
});

export const {
    newArrivalPending,
    newArrivalFulfilled,
    newArrivalRejected,
    setNewArrivalFinished,
    newArrivalInit,
    newArrivalPage
} = newArrivalReducer.actions;
export default newArrivalReducer.reducer;
