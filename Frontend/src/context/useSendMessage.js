import { useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const messages = useConversation(
    (state) => state.messages
  );

  const setMessages = useConversation(
    (state) => state.setMessages
  );

  const selectedConversation = useConversation(
    (state) => state.selectedConversation
  );

  const sendMessages = async (message) => {
    if (!message.trim()) {
      return;
    }

    if (!selectedConversation?._id) {
      console.log("No conversation selected");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        {
          message: message.trim(),
        },
        {
          withCredentials: true,
        }
      );

      console.log("Send message response:", res.data);

      // Backend returns { message, newMessage }
      const newMessage = res.data.newMessage;

      setMessages([...messages, newMessage]);
    } catch (error) {
      console.log(
        "Error in sending message:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendMessages,
  };
};

export default useSendMessage;