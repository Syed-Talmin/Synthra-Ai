import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../slices/chatsSlice.js"; // import slice
import messageReducer from "../slices/messageSlice.js"
import activeChatReducer from "../slices/activeChatSlice.js"
import showIndicatorReducer from "../slices/showIndicator.js"
import showSidebarReducer from "../slices/showSidebar.js"

export const store = configureStore({
  reducer: {
    chats: chatReducer, 
    messages: messageReducer,
    activeChat: activeChatReducer,
    showIndicator: showIndicatorReducer,
    showSidebar: showSidebarReducer
  },
});
