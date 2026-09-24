import React from "react";

function Message({ message }) {
  const messenger = JSON.parse(
    localStorage.getItem("messenger")
  );

  const authUserId = messenger?.user?._id;

  const itsme =
    String(message.senderId) === String(authUserId);

  const chatName = itsme ? "chat-end" : "chat-start";

  const chatColor = itsme
    ? "bg-blue-500"
    : "";
  const createdAt = new Date(message.createdAt)
  const formattedTime = createdAt.toLocaleTimeString([],{
    hour: '2-digit',
    minute: "2-digit"
  })

  console.log("Individual Message:", message);

  return (
    <div className="p-2 w-full">
      <div className={`chat ${chatName}`}>
        <div
          className={`chat-bubble text-white ${chatColor}`}
        >
          {message.message}
          <div>{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;