import { useState } from "react";
import createChat from "../utils/createChat";
import { useDispatch, useSelector } from "react-redux";
import { setChats, updateChat } from "../slices/chatsSlice";
import axios from "../axios/axiosInstance";
export default function InputPopup({ setIsOpen, isRename = null }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const chats = useSelector((state) => state.chats.items);
  const dispatch = useDispatch();

  const handleSave = async () => {
    const wordCount = title.trim().split(/\s+/).length;
    if (wordCount > 5) {
      setError("Title cannot be more than 5 words");
      return;
    }
    setError("");

    if (isRename) {
      try {
        await axios.patch(`/chat/rename/${isRename}`, { title });
        dispatch(
          updateChat({
            chatId: isRename,
            updatedChat: { chatName: title },
          })
        );
        setIsOpen(false);
      } catch (error) {
        console.log(error);
      }
      return;
    }

    await createChat(title, dispatch);

    setIsOpen(false);
    setTitle("");
    setDescription("");
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
      className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="w-[420px] rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-lg">
        {/* Heading */}
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
          <span className="text-orange-600 dark:text-orange-500 font-semibold">
            {" "}
            {isRename ? "Rename" : "Enter"}
          </span>{" "}
          Details
        </h2>

        {/* Title Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Marketing Plan"
            className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {/* Description Input */}
        {!isRename && (
          <div>
            <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
              Short Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short sentence describing this..."
              rows="3"
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none transition"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-8">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded-md bg-orange-600 text-white font-medium hover:bg-orange-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
