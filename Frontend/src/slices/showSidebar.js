import { createSlice } from "@reduxjs/toolkit";


const showSidebarSlice = createSlice({
    name: "showSidebar",
    initialState: { items: true },
    reducers: {
        setShowSidebar: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { setShowSidebar } = showSidebarSlice.actions;
export default showSidebarSlice.reducer;