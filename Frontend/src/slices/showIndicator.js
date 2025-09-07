import { createSlice } from "@reduxjs/toolkit";


const showIndicatorSlice = createSlice({
    name: "showIndicator",
    initialState: { items: false },
    reducers: {
        setShowIndicator: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { setShowIndicator } = showIndicatorSlice.actions;
export default showIndicatorSlice.reducer;