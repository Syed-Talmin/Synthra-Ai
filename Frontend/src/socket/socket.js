import { io } from "socket.io-client";

const socket = io("https://synthra-ai.onrender.com/", {
  transports: ["websocket"],
  withCredentials: true,
  auth: {
    token: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default socket;
