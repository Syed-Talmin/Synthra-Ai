import { createSlice } from "@reduxjs/toolkit";


const activeChatSlice = createSlice({
    name: "activeChat",
    initialState: { items: null },
    reducers: {
        setActiveChat: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { setActiveChat } = activeChatSlice.actions;
export default activeChatSlice.reducer;