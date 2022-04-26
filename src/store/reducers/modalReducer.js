import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    successModal: false,
    isModal: false,
    initModal: "",
    isSidebar: false,
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
        setSidebar: (state) => {
            state.isSidebar = !state.isSidebar;
        },
    },
});

export const { setIsModal, setSuccessModal, setInitModal, setSidebar } =
    modalReducer.actions;
export default modalReducer.reducer;
