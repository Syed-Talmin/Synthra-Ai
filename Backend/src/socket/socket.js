import { Server } from "socket.io";
import { generateResponse, generateVector } from "../services/ai-service.js";
import messageModel from "../models/message.model.js";
import jwt from "jsonwebtoken";
import { createMemory, queryMemory } from "../services/vector-service.js";

const initSocketIo = (httpServer) => {
  const io = new Server(httpServer);

  io.use((socket, next) => {
    
    const token = socket.handshake.headers?.cookie?.split("=")[1] || socket.handshake?.auth?.token?.split(" ")[1];
    if (!token) {
      return next(new Error("Unauthorized"));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode) {
      socket.user = { id: decode._id };
      next();
    } else {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", async (socket) => {
    console.log("New client connected");

    socket.on("ai-message", async (message) => {

      const [userMessage, vector] = await Promise.all([
        messageModel.create({
          user: socket.user.id,
          content: message.content,
          chatId: message.chatId,
          role: "user",
        }),
        generateVector(message.content),
      ]);

      const [memory, chatHistory] = await Promise.all([
        await queryMemory({
          queryVector: vector,
          limit: 3,
          metadata: {
            userId: { $eq: socket.user.id }
          },
        }),

      messageModel.find({ chatId: message.chatId })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean()
        .then((messages) => {
          return messages.reverse();
        }),

        await createMemory({
        messageId: userMessage._id,
        vectors: vector,
        metaData: {
          userId: socket.user.id,
          chat: message.chatId,
          text: message.content,
        },
      }),
      ]);


      const stm = chatHistory.map((msg) => {
        return {
          role: msg.role,
          parts: [{ text: msg.content }],
        };
      });

      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: ` these are the some previous messages, use them to generate a response:

                ${memory.map((m) => m.metadata.text).join("\n")}
              `,
            },
          ],
        },
      ];

      const aiResponse = await generateResponse([...ltm, ...stm]);

      socket.emit("ai-response", aiResponse);

      const [aiMessage,aiVector] = await Promise.all([
        messageModel.create({
        user: socket.user.id,
        content: aiResponse,
        chatId: message.chatId,
        role: "model",
      }),
       generateVector(aiResponse)

      ]);

      await createMemory({
        messageId: aiMessage._id,
        vectors: aiVector,
        metaData: {
          userId: socket.user.id,
          chat: message.chatId,
          text: aiResponse,
        },
      });
      
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
  return io;
};

export default initSocketIo;
