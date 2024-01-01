import { createContext, useMemo } from "react";
import io from "socket.io-client";

const socketContext = createContext();

const SocketProvider = ({ children }) => {
  const socketIO = useMemo(() => io.connect("http://localhost:4001"), []);

  return (
    <socketContext.Provider value={socketIO}>
      {children}
    </socketContext.Provider>
  );
};

export { socketContext, SocketProvider };
