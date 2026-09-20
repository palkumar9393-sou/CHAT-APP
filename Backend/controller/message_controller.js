import Conversation from "../models/conversatio_model.js";
import Message from "../models/message_model.js";

export const sendMessage = async(req,res)=>{
// console.log("message send ",req.params.id,req.body.message);

try {
  const {message} = req.body;
  const {id:recevierId} = req.params;
  const senderId = req.user._id; //current login user
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId,recevierId] }
  })
  if(!conversation){
    conversation = await Conversation.create({
      participants: [senderId,recevierId],
      
    })

    const newMessage = new Message({
       senderId,
       recevierId,
      message,
    })

    if(newMessage){
      // await newMessage.save();
      conversation.messages.push(newMessage._id);
    
    }
    await Promise.all([ conversation.save(), newMessage.save() ])
    res.status(201).json({ message: "Message send successfully", newMessage })
  }
} catch (error) {
  console.log("Error in sending message",error);
  res.status(500).json({ message: "Internal server error " })
  
}  
};

export const getMessage = async (req,res) => {
    try {
      const {id: chatUser} = req.params;
  const senderId = req.user._id; 
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId,chatUser] }
  }).populate("messages")
    if(!conversation){
      return res.status(201).json({ message: "No conversation found" })
    }
    const messages = conversation.messages;
    res.status(201).json({ messages })
    } catch (error) {
      console.log("Message getting error",error);
  res.status(500).json({ message: "Internal server error " })
    }
}