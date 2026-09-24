import Conversation from "../models/conversatio_model.js";
import Message from "../models/message_model.js";
import { getReceiverSocketId } from "../SocketIo/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recevierId } = req.params;
    const senderId = req.user._id;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        message: "Message cannot be empty",
      });
    }

    // Find existing conversation
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, recevierId],
      },
    });

    // Create conversation if it doesn't exist
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recevierId],
        messages: [],
      });
    }

    // Create message
    const newMessage = await Message.create({
      senderId,
      recevierId,
      message: message.trim(),
    });

    // Add message to conversation
    conversation.messages.push(newMessage._id);

    await conversation.save();

    const receiversocketId = getReceiverSocketId(recevierId);
    if(receiversocketId){
      io.to(receiversocketId).emit("newMessage",newMessage);
    }

    return res.status(201).json({
      message: "Message sent successfully",
      newMessage,
    });

  } catch (error) {
    console.log("Error in sending message:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, chatUser],
      },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({
        messages: [],
      });
    }

    return res.status(200).json({
      messages: conversation.messages,
    });

  } catch (error) {
    console.log("Message getting error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};