// ⚡ src/services/socket.js
import { io } from "socket.io-client";

const URL = "http://localhost:5000"; // backend URL
export const socket = io(URL, { autoConnect: true });

socket.on("connect", () => {
  console.log("✅ Connected to backend Socket.io:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from backend Socket.io");
});
