import React from "react";
// import useUserContext from "../../hooks/useUserContext";
import { format } from "date-fns";

const OtherChat = (props) => {
  const { author, message, createdAt } = props; // props: { author, userID, message, createdAt }
  // const { user } = useUserContext();

  return (
    <div className="Chat OtherChat flex flex-col relative bg-blue-100 rounded w-2/3 px-3 py-2 m-2">
      <p className="text-sm font-bold text-gray-600">{author}</p>
      <p className="text-lg font-normal mb-2">{message}<span className="invisible">hello :)</span></p>
      <p className="absolute bottom-2 right-2 text-xs self-end text-gray-600">
        {format(new Date(createdAt), "h:mm aaa")}
      </p>
    </div>
  );
};

export default OtherChat;
