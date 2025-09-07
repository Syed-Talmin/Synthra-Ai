import React, { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useSelector } from "react-redux";

const ChatDisplay = ({ messages }) => {
  const chatRef = useRef(null);
  const showIndicator = useSelector((state) => state.showIndicator.items);

  useEffect(() => {
    const chat = chatRef.current;
    if (chat) {
      chat.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  
  return (
    <div ref={chatRef} className="flex flex-col w-full max-w-[50rem] py-2 ">
      {messages.length === 0 ? (
        <div className="flex w-full items-center justify-center flex-col">
          <h1 className="md:text-[5vw] text-[2rem] opacity-50 leading-tight text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-orange-500 to-orange-800">
            SYNTHRA
          </h1>
          <p className="text-white text-center md:text-sm text-xs opacity-55 uppercase font-semibold">
            Type a message to start a beautiful conversation
          </p>
        </div>
      ) : (
        <div className="chat w-full h-[80vh] overflow-y-auto  px-2">
          {messages.map((msg, index) => (
            <MessageBubble key={index} sender={msg.role} text={msg.content} />
          ))}
          { showIndicator && <TypingIndicator /> }
        </div>
      )}
    </div>
  );
};

export default ChatDisplay;
