import axios from "../axios/axiosInstance";
import { setActiveChat } from "../slices/activeChatSlice";
import { addChats } from "../slices/chatsSlice.js"

const createChat = async (data, dispatch) => {
  const chatName = data.split(" ").slice(0, 4).join(" ");

  const res = await axios.post("/chat/create", { chatName });

  if (res?.status === 201) {
    dispatch(setActiveChat(res.data._id));
    dispatch(addChats(res.data));
  }

  return res?.data;
};

export default createChat;
