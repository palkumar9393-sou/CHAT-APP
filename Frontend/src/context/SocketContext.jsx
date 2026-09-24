import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthProvider.jsx";
import io from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { authUser } = useAuth();

  useEffect(() => {
    const userId = authUser?.user?._id;

    if (!userId) {
      setSocket(null);
      setOnlineUsers([]);
      return;
    }

    console.log(
      "Creating socket for user:",
      userId
    );

    const newSocket = io("http://localhost:5002", {
      query: {
        userId: String(userId),
      },
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(
        "Socket connected:",
        newSocket.id
      );
    });

    newSocket.on("getOnlineUsers", (users) => {
      console.log(
        "Online users received:",
        users
      );

      // Make sure every ID is a string
      setOnlineUsers(
        users.map((id) => String(id))
      );
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    newSocket.on(
      "connect_error",
      (error) => {
        console.log(
          "Socket connection error:",
          error.message
        );
      }
    );

    return () => {
      console.log(
        "Closing socket:",
        newSocket.id
      );

      newSocket.close();
      setSocket(null);
      setOnlineUsers([]);
    };
  }, [authUser]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};