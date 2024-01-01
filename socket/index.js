import { Server } from "socket.io";
import http from "http";
import express from "express";

const port = process.env.SOCKET_PORT || 4001;
const clientURI = process.env.CLIENT_URI || "http://localhost:3000";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: clientURI,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Connected: ", socket.id);

  socket.on("join-room", (roomID) => {
    socket.join(roomID);
    console.log(`Joined room ${roomID}`);
  });

  socket.on("leave-room", (roomID) => {
    socket.leave(roomID);
    console.log(`Left room ${roomID}`);
  });

  socket.on("send-message", ({ data, roomID }) => {
    console.log("Send data: ", data);
    console.log("RoodID: ", roomID);
    socket.to(roomID).emit("receive-message", { data, roomID });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected: ", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Socket Server listening to port ${port}`);
});
