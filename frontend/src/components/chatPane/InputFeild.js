import React, { useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import useSocketContext from "../../hooks/useSocketContext";
import { serverUrl } from "../../setup";

const newChat = async (body, token, groupID, setChats, socket) => {
  const response = await fetch(serverUrl + `/api/chat/new/${groupID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ chatBody: body }),
  });
  const data = await response.json();
  await socket.emit("send-message", { data, roomID: groupID });
  setChats((prev) => [...prev, data]);
};

const InputFeild = ({ setChats, groupID }) => {
  const { user } = useUserContext();
  const [text, setText] = useState("");
  const [row, setRow] = useState(1);
  const socket = useSocketContext();

  const handleClick = () => {
    if (text === "") return;
    newChat(text, user.token, groupID, setChats, socket);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    let scrollHeight = document.getElementById("textbox").scrollHeight;
    let clientHeight = document.getElementById("textbox").clientHeight;

    if (scrollHeight > clientHeight) {
      setRow((prev) => prev + 1);
    }
  };

  return (
    <div
      className={
        "InputFeild grow-0 w-full mt-2 flex shadow border-2 rounded p-[2px] transition-colors" +
        (text !== "" ? " border-yellow-500/50" : " border-gray-400 ")
      }
    >
      <textarea
        id="textbox"
        rows={row}
        className="grow ml-2 text-lg p-1 font-semibold bg-transparent outline-none text-gray-500 resize-y"
        autoFocus
        type="text"
        placeholder="Type a message..."
        onChange={handleChange}
        value={text}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleClick();
          }
        }}
      />
      <button
        disabled={text === "" ? true : false}
        className={
          "grow-0 rounded-sm flex items-center justify-center h-full aspect-square max-w-12 transition-colors" +
          (text !== ""
            ? " bg-yellow-400/50 text-gray-400"
            : " bg-gray-400 text-white")
        }
        onClick={handleClick}
      >
        <span className="ml-1 material-symbols-rounded">send</span>
      </button>
    </div>
  );
};

export default InputFeild;
