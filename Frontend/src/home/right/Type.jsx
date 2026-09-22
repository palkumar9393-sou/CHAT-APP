import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

const Type = () => {
  const { loading, sendMessages } = useSendMessage();

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    await sendMessages(message);

    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh] text-center bg-blue-400">

        <div className="w-[85%] mx-4">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Type here"
            disabled={loading}
            className="border-[1px] border-gray-700 flex items-center w-full py-3 px-3 rounded-xl grow outline-none bg-blue-800 mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-3"
        >
          <IoSend className="text-3xl" />
        </button>

      </div>
    </form>
  );
};

export default Type;