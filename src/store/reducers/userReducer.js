import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
};

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.isAuth = action.payload.auth;
        },
    },
});

export const { setAuthUser } = userReducer.actions;
export default userReducer.reducer;
