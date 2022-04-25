import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    successModal: false,
    isModal: false,
    initModal: false,
};

const modalReducer = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setSuccessModal: (state, action) => {
            state.successModal = action.payload;
        },
        setIsModal: (state, action) => {
            state.isModal = action.payload;
        },
        setInitModal: (state, action) => {
            state.initModal = action.payload;
        },
    },
});

export const { setIsModal, setSuccessModal, setInitModal } =
    modalReducer.actions;
export default modalReducer.reducer;
