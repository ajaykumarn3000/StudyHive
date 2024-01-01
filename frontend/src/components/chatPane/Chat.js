import React from "react";
import useUserContext from "../../hooks/useUserContext";
import YourChat from "./YourChat";
import OtherChat from "./OtherChat";

const Chat = (props) => {
  const { author } = props; // props: { author, userID, message, createdAt }
  const { user } = useUserContext();

  return (
    <>
      {author === user.username ? (
        <YourChat {...props} />
      ) : (
        <OtherChat {...props} />
      )}
    </>
  );
};

export default Chat;
