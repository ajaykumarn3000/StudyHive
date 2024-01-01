import { useContext } from "react";
import { socketContext } from "../context/socketContext";

export default function useSocketContext() {
  const socket = useContext(socketContext);

  if (!socket) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return socket;
}
