// src/socket.js
import { io } from "socket.io-client";


const socket = io("https://synthra-ai.onrender.com/",{
    transports: ['websocket'],
    withCredentials: true,
});


export default socket;
