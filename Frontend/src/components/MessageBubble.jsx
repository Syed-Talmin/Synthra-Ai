import ShowMarkdown from "./ShowMarkdown";

export const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div
      className={`flex w-full my-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl md:text-[1rem] text-sm shadow-md transition-all duration-300 
        ${isUser ? "bg-orange-500 text-white rounded-br-sm" : "bg-[#2A2A2A] text-gray-200 rounded-bl-sm"}`}
      >
        <ShowMarkdown content={text} />
      </div>
    </div>
  );
};