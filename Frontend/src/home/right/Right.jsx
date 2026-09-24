import React from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";

export default function Right() {
  const selectedConversation = useConversation(
    (state) => state.selectedConversation
  );

  return (
    <div className="w-full h-screen bg-blue-300 text-white flex flex-col">
      {!selectedConversation ? (
        <Nochat />
      ) : (
        <>
          <Chatuser />

          <div className="flex-1 overflow-y-auto min-h-0">
            <Messages />
          </div>

          <Type />
        </>
      )}
    </div>
  );
}

const Nochat = () => {
  const { authUser } = useAuth();

  // Get logged-in user's name safely
  const userName =
    authUser?.user?.name ||
    authUser?.name ||
    "User";

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-semibold text-3xl">
          Welcome, {userName} 👋
        </h1>

        <p className="mt-3 text-lg">
          Select a conversation to start a chat.
        </p>
      </div>
    </div>
  );
};