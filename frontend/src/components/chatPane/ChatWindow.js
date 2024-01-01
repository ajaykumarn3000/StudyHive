import React, { useState, useMemo } from "react";
import useUserContext from "../../hooks/useUserContext";
import Chat from "./Chat";
import InputFeild from "./InputFeild";
import useSocketContext from "../../hooks/useSocketContext";

const getChats = async (groupID, token, setChats) => {
  const response = await fetch(
    `http://localhost:4000/api/chat/all/${groupID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  setChats(data);
};

const ChatWindow = (props) => {
  const { groupID } = props;
  const { user } = useUserContext();
  const [chats, setChats] = useState();
  const socket = useSocketContext();

  useMemo(() => {
    getChats(groupID, user.token, setChats);
  }, [groupID, user.token]);

  useMemo(() => {
    socket.on("receive-message", ({ data, roomID }) => {
      console.log("Receive data: ", data);
      setChats((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <div className="ChatWindow grow-[2] bg-white m-2 ml-0 shadow rounded flex flex-col p-5 pb-3">
      <div className="AllChats grow overflow-y-scroll flex flex-col">
        {chats &&
          chats.map((chat) => {
            return (
              <Chat
                key={chat._id}
                author={chat.userName}
                userID={chat.userID}
                message={chat.body}
                createdAt={chat.createdAt}
              />
            );
          })}
      </div>
      <InputFeild setChats={setChats} groupID={groupID} />
    </div>
  );
};

export default ChatWindow;
