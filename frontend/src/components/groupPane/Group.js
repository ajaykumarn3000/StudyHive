import useSocketContext from "../../hooks/useSocketContext";
import { useState } from "react";

const Group = (props) => {
  const { _id, groupName, setCurrentChat, currentChat } = props;
  const socket = useSocketContext();
  const [copy, setCopy] = useState("content_copy");

  const handleClick = () => {
    if (currentChat) {
      console.log("Room not null ", currentChat);
      socket.emit("leave-room", currentChat);
    }
    socket.emit("join-room", _id);
    setCurrentChat(_id);
  };

  return (
    <div
      className={
        currentChat === _id
          ? "snap-start Group shadow py-2 px-5 bg-yellow-200 transition-all"
          : "Group shadow py-2 px-5 hover:bg-yellow-100 transition-colors"
      }
      onClick={handleClick}
    >
      <p className="text-xl text-gray-600 font-medium">{groupName}</p>
      {currentChat === _id && (
        <div className="flex gap-2">
          <span>{_id}</span>{" "}
          <span
            className="CopyBtn text-gray-600 text-xl transition-all hover:text-gray-400 hover:cursor-pointer material-symbols-rounded"
            onClick={(e) => {
              navigator.clipboard.writeText(_id);
              setCopy("done_all");
              setTimeout(() => {
                setCopy("content_copy");
              }, 1000);
            }}
          >
            {copy}
          </span>
        </div>
      )}
      {/* <p>{_id}</p> */}
    </div>
  );
};

export default Group;
