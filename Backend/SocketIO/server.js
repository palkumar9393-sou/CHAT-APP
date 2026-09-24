import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4001",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// userId -> socketId
const users = {};

// Get receiver socket ID
export const getReceiverSocketId = (receiverId) => {
  return users[String(receiverId)];
};

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    const id = String(userId);

    users[id] = socket.id;

    console.log("User connected:", id);
    console.log("Online users:", Object.keys(users));
  }

  // IMPORTANT: same event name as frontend
  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);

    if (userId) {
      const id = String(userId);

      // Only delete if this socket belongs to this user
      if (users[id] === socket.id) {
        delete users[id];
      }
    }

    console.log(
      "Online users after disconnect:",
      Object.keys(users)
    );

    // IMPORTANT: same event name as frontend
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };