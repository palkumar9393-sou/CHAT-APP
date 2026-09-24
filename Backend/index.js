import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./route/user_route.js";
import messageRoute from "./route/message_route.js";

import { app, server } from "./SocketIO/server.js";

dotenv.config();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4001",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

const PORT = 5002;
const URI = process.env.MONGODB_URI;

const startServer = async () => {
  try {
    await mongoose.connect(URI);

    console.log("MongoDB Connected Successfully");

    server.listen(PORT, () => {
      console.log(`Server is Running on port ${PORT}`);
    });
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
};

startServer();