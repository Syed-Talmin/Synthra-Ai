import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "../axios/axiosInstance";
import { setMessages } from "../slices/messageSlice";
import { setActiveChat } from "../slices/activeChatSlice";
import InputPopup from "./InputPopup";
import { Ellipsis, Pencil, Trash, Trash2 } from "lucide-react";
import PopUpWrapper from "./popUpWrapper";
import { setChats } from "../slices/chatsSlice";
import { Plus } from "lucide-react";

const Sidebar = () => {
  const chats = useSelector((state) => state.chats.items);
  const activeChat = useSelector((state) => state.activeChat.items);
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(true);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEditDeleteMenu, setShowEditDeleteMenu] = useState(false);
  const [editDeletMenuPosition, setEditDeleteMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isdelete, setIsDelete] = useState(false);
  const [isRename, setIsRename] = useState(false);
  const [chatIdOfMenu, setChatIdOfMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowEditDeleteMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChatSwitch = async (chat) => {
    dispatch(setActiveChat(chat._id));
    const messages = await axios.get(`/message/${chat._id}`);
    dispatch(setMessages(messages.data));
  };

  const handleChatDelete = async () => {
    if (!chatIdOfMenu) {
      return;
    }
    await axios.delete(`/chat/delete/${chatIdOfMenu}`);
    dispatch(setChats(chats.filter((chat) => chat._id !== chatIdOfMenu)));
    dispatch(setActiveChat(null));
    dispatch(setMessages([]));
    setIsDelete(false);
  };

  return (
    <div
      className={` h-screen flex flex-col justify-between bg-[#1A1A1A] border border-[#2A2A2A] text-orange-500 font-bold text-2xl p-3 transition-all duration-300
        ${collapsed ? "relative md:w-[5rem] w-[4rem]" : "md:w-[20rem] fixed top-0 z-99 left-0 w-[15rem]"}`}
    >

      
      {showCreatePopup && <InputPopup setIsOpen={setShowCreatePopup} />}

        {/*asking confirm & showing popUp for deleting*/}
        {isdelete && (
          <PopUpWrapper>
            <div className="w-[90%] max-w-md bg-[#121212] border border-[#2A2A2A]/50 rounded-2xl shadow-2xl p-6 flex flex-col gap-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-100">
                Delete Chat?
              </h3>
              <p className="text-sm text-gray-400">
                This action is{" "}
                <span className="text-red-400 font-medium">permanent</span> and
                cannot be undone.
              </p>

              <div className="flex gap-4 w-full">
                <button
                  onClick={handleChatDelete}
                className="w-fit px-5 text-xl flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 text-white font-medium transition-all shadow-lg hover:shadow-red-500/30">
                  <Trash2 className="w-4 h-4 " /> Yes
                </button>
                
                <button
                  onClick={() =>
                    {
                      setChatIdOfMenu(null)
                      setIsDelete(false)}
                    } 
                className="w-fit px-5 text-xl py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-all shadow-md hover:shadow-gray-700/30">
                  Cancel
                </button>
              </div>
            </div>
          </PopUpWrapper>
        )}

        {
          isRename && (
            <PopUpWrapper>
              <InputPopup setIsOpen={setIsRename} isRename={chatIdOfMenu} />
            </PopUpWrapper>
          )
        }

      <div>

        <div className="flex items-center gap-2 w-full mb-10">
          <img className="md:w-12 md:h-12 h-8 w-8" src="/AI LOGO.png" alt="Logo" />
        </div>

        <button
          onClick={() => setShowCreatePopup(true)}
          className={`mt-5 font-semibold text-white py-2 px-4  rounded-lg text-lg flex items-center justify-center transition-all duration-300 ease-in-out transform
            bg-gradient-to-r from-orange-500 to-orange-600 shadow-md hover:shadow-orange-500/40 hover:scale-105 active:scale-95
            ${collapsed ? "md:w-[3rem] md:h-[3rem] h-8 w-8 rounded-full" : "w-[90%]"}`}
        >
          {collapsed ? (
            <span className="text-2xl font-bold">
              <Plus className="md:w-5 md:h-5 w-3 h-3" />
            </span>
          ) : (
            "New Chat"
          )}
        </button>

        <div className="mt-5 border-1 border-zinc-800 w-[90%]"></div>
        <ul
          className={`mt-5 ${
            collapsed ? "w-full" : "w-[90%]"
          } h-[65vh] text-[1.1rem] font-normal overflow-hidden`}
        >
          {chats.map((chat) => (
            <li
              key={chat._id}
              onClick={(e) => {
                if (e.target !== e.currentTarget) return;
                handleChatSwitch(chat);
              }}
              className={`py-2 px-4 inline-flex items-center justify-between w-full rounded-lg cursor-pointer text-zinc-300 transition-colors truncate
                ${
                  activeChat === chat._id && !collapsed
                    ? "border-1 bg-zinc-800 border-zinc-600"
                    : ""
                }`}
            >
              {!collapsed && chat.chatName}
              {!collapsed && (
                <Ellipsis
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditDeleteMenuPosition({ x: e.clientX, y: e.clientY });
                    setShowEditDeleteMenu(true);
                    setChatIdOfMenu(chat._id);
                  }}
                />
              )}
            </li>
          ))}

          {showEditDeleteMenu && (
            <div
              ref={menuRef} 
              style={{
                left: editDeletMenuPosition.x,
                top: editDeletMenuPosition.y,
                position: "absolute",
              }}
              className="absolute rounded-lg z-50 bg-zinc-800 w-[10rem] flex flex-col items-start p-2 gap-2"
            >
              <button
                onClick={() => setIsRename(true)}
              className="px-4 py-1 text-white flex items-center gap-2 hover:bg-zinc-600 w-full rounded-md">
                <Pencil size={"1.1rem"} /> Rename
              </button>
              <button
                onClick={() => setIsDelete(true)}
              className="px-4 py-1 text-red-500 flex items-center gap-2 hover:bg-zinc-600 w-full rounded-md">
                <Trash size={"1.1rem"} /> Delete
              </button>
            </div>
          )}
        </ul>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-white bg-orange-500 py-2 px-3 rounded-lg text-sm mb-5"
      >
        {collapsed ? "»" : "«"}
      </button>
    </div>
  );
};

export default Sidebar;
