import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    breads: [],
}

const breadCrumbReducer = createSlice({
    name: 'breadCrumbs',
    initialState,
    reducers: {
        setBreadCrumbs: (state , action) => {
            state.breads = action.payload.breads
        },
    }
})

export const { setBreadCrumbs} = breadCrumbReducer.actions
export default breadCrumbReducer.reducer