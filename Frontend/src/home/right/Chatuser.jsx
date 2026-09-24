import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

const Chatuser = () => {
  const { selectedConversation } = useConversation();

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.some(
    (id) =>
      String(id) ===
      String(selectedConversation?._id)
  );

  console.log(
    "Selected user:",
    selectedConversation?._id
  );

  console.log(
    "Online users:",
    onlineUsers
  );

  console.log(
    "Is online:",
    isOnline
  );

  if (!selectedConversation) {
    return null;
  }

  return (
    <>
      <div className="pl-5 pt-5 pb-3 h-[12vh] flex space-x-4 bg-blue-400 hover:bg-slate-400 duration-300">

        <div>
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQGf-qu_KUiU5Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729500780156?e=1790812800&v=beta&t=CgJDRd48XhljsKl_8dOSf0aVUC2S6ImeoVQoWOhvEQI"
                className="w-full h-full object-cover"
              />
            </div>

            {isOnline && (
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-blue-400"></span>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-xl">
            {selectedConversation.name}
          </h1>

          <span className="text-sm">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

      </div>
    </>
  );
};

export default Chatuser;