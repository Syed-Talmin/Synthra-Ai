import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"
export const createChatController = async (req, res) => {
    try {
        const { chatName} = req.body;
        
        const newChat = await chatModel.create({ chatName, user:req.user._id });

        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ message: "Error creating chat", error });
    }
};

export const renameChatController = async (req, res) => {
    try {
        const { title } = req.body;
        const { chatId } = req.params;
        const updatedChat = await chatModel.findByIdAndUpdate(chatId, { chatName:title }, { new: true });
        res.status(200).json(updatedChat);
    } catch (error) {
        res.status(500).json({ message: "Error updating chat", error });
    }
}

export const listChatsController = async (req, res) => {
    try {
        const chats = await chatModel.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching chats", error });
    }
}

export const deleteChatController = async (req, res) => {
    try {
        const { chatId } = req.params;
        await chatModel.findByIdAndDelete(chatId);
        await messageModel.deleteMany({ chatId });
        res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting chat", error });
    }
}