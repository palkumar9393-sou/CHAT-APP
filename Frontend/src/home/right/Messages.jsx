import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import useConversation from "../../statemanage/useConversation.js";
import Loading from "../../components/Loading.jsx";

function Messages() {
  const { loading } = useGetMessage();

  const messages = useConversation(
    (state) => state.messages
  );

  console.log("Messages:", messages);

  const lastMessageRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div className="w-full flex-1 overflow-y-auto px-2">
      
      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-full">
          <Loading />
        </div>
      )}

      {/* No messages */}
      {!loading && messages.length === 0 && (
        <div className="flex justify-center">
          <p className="text-center mt-[20%] text-gray-500">
            Say Hi 👋 to start the conversation
          </p>
        </div>
      )}

      {/* Messages */}
      {!loading && messages.length > 0 && (
        <div className="flex flex-col">
          {messages.map((message) => (
            <Message
              key={message._id}
              message={message}
            />
          ))}

          <div ref={lastMessageRef}></div>
        </div>
      )}
    </div>
  );
}

export default Messages;