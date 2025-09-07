import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
  name: "chats",
  initialState: { items: [] },
  reducers: {
    setChats: (state, action) => {
      state.items = action.payload; 
    },
    addChats: (state, action) => {
      state.items.unshift(action.payload); 
    },
    updateChat: (state, action) => {
      const { chatId, updatedChat } = action.payload;
      const chatIndex = state.items.findIndex((chat) => chat._id === chatId);
      if (chatIndex !== -1) {
        state.items[chatIndex] = updatedChat;
      }
    },
  },
});

export const { setChats, addChats, updateChat } = chatsSlice.actions;
export default chatsSlice.reducer;
