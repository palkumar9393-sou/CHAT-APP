import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../statemanage/useConversation.js";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);

  const selectedConversation = useConversation(
    (state) => state.selectedConversation
  );

  const setMessages = useConversation(
    (state) => state.setMessages
  );

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) {
        setMessages([]);
        return;
      }

      try {
        setLoading(true);

        console.log(
          "Getting messages for:",
          selectedConversation._id
        );

        const res = await axios.get(
          `/api/message/get/${selectedConversation._id}`,
          {
            withCredentials: true,
          }
        );

        console.log("API Response:", res.data);

        // API returns { messages: [...] }
        const messageArray = res.data?.messages || [];

        console.log("Messages Array:", messageArray);

        setMessages(messageArray);
      } catch (error) {
        console.log(
          "Error in getting messages:",
          error.response?.data || error.message
        );

        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading };
};

export default useGetMessage;