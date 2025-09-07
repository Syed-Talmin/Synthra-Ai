import express from "express";
import authRouter from "./routes/auth.route.js";
import chatRouter from "./routes/chat.route.js";
import messageRouter from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// __dirname banane ke liye ES module ka alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());

// Public folder serve karne ke liye
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

// React/Frontend ke liye catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;
