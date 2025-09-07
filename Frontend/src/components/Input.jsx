import React, { useState } from "react";
import { LogIn, Send } from "lucide-react";

const Input = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="w-full max-w-[50rem] flex items-center gap-3 md:p-3 p-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl shadow-lg mb-10">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 bg-transparent outline-none px-3 py-2 text-gray-200 placeholder-gray-500 text-sm tracking-wide"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="p-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-all shadow-md hover:shadow-orange-500/30"
      >
        <Send className="md:w-5 md:h-5 w-3 h-3" />
      </button>
    </div>
  );
};

export default Input;
