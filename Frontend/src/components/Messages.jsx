import { useEffect } from "react";
import Input from "./Input";
import ChatDisplay from "./ChatDisplay";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../slices/messageSlice";
import socket from "../socket/socket";
import createChat from "../utils/createChat";
import Navbar from "./Navbar";
import { setShowIndicator } from "../slices/showIndicator.js";

const Messages = () => {
  const messages = useSelector((state) => state.messages.items);
  const activeChat = useSelector((state) => state.activeChat.items);

  const dispatch = useDispatch();

  const onSend = async (msg) => {
    let newChatId = null;
    if (activeChat === null) {
      const newChat = await createChat(msg, dispatch);
      newChatId = newChat._id;
    }

    dispatch(addMessage({ role: "user", content: msg }));

    socket.emit("ai-message", {
      content: msg,
      chatId: activeChat ? activeChat : newChatId,
    });

    dispatch(setShowIndicator(true));

  };

  useEffect(() => {
    socket.on("ai-response", (message) => {
      dispatch(addMessage({ role: "model", content: message }));
      dispatch(setShowIndicator(false));
    });
    return () => {
      socket.off("ai-response", handleAIResponse); 
    };
  }, []);

  return (
    <div
      className={`relative w-full h-screen bg-[#1A1A1A]  flex flex-col items-center justify-center py-20 px-5`}
    >
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center">
        <ChatDisplay messages={messages} />
        <Input onSend={onSend} />
      </div>
    </div>
  );
};

export default Messages;
