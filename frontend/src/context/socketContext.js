import { createContext, useMemo } from "react";
import io from "socket.io-client";
import { socketUrl } from "../setup";

const socketContext = createContext();

const SocketProvider = ({ children }) => {
  const socketIO = useMemo(() => io.connect(socketUrl), []);

  return (
    <socketContext.Provider value={socketIO}>{children}</socketContext.Provider>
  );
};

export { socketContext, SocketProvider };
