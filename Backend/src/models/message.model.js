import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: { type: String, required: true },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true
  },
  role: { type: String, enum: ['user', "model","System"], required: true }
},{
    timestamps: true
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
