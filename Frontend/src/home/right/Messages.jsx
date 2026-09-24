import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import Loading from "../../components/Loading.jsx";

function Messages() {
  const { loading } = useGetMessage();

  // Get messages from Zustand
  const messages = useConversation(
    (state) => state.messages
  );

  // Function to update messages
  const setMessages = useConversation(
    (state) => state.setMessages
  );

  // Get socket
  const { socket } = useSocketContext();

  const lastMsgRef = useRef(null);

  // Receive new messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      console.log("New message received:", newMessage);

      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage,
      ]);

      // Notification sound
      const sound = new Audio(
        "/sounds/notification.mp3"
      );

      sound.play().catch((error) => {
        console.log(
          "Notification sound blocked:",
          error
        );
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages]);

  // Scroll to latest message
  useEffect(() => {
    const timer = setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id}>
            <Message message={message} />
          </div>
        ))
      )}

      {/* Scroll target */}
      <div ref={lastMsgRef}></div>

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi 👋 to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;