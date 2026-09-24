import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],

  setSelectedConversation: (selectedConversation) => {
    set({ selectedConversation });
  },

  setMessages: (messages) => {
    set((state) => ({
      messages:
        typeof messages === "function"
          ? messages(state.messages)
          : messages,
    }));
  },
}));

export default useConversation;