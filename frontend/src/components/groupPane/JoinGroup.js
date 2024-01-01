import React, { useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import { serverUrl } from "../../setup";

const JoinNewGroup = async (token, groupID, setGroups) => {
  const response = await fetch(serverUrl + `/api/group/join/${groupID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    console.log("New Group: ", data);
    setGroups((prev) => [...prev, data]);
  } else {
    console.log("Error: ", response);
  }
};

const JoinGroup = ({ setGroups, setNewGroup }) => {
  const [groupID, setGroupID] = useState("");
  const { user } = useUserContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    JoinNewGroup(user.token, groupID, setGroups);
    setGroupID("");
  };

  const handleClose = () => {
    setNewGroup(null);
  };

  return (
    <div
      className="JoinGroup m-2 mt-0 bg-white shadow rounded py-2 px-4 relative"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          handleClose();
        }
      }}
    >
      <h3 className="text-center text-gray-600 font-medium mb-4">
        Join a Group
      </h3>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="block border-2 border-gray-500 rounded w-75% px-2 py-1 mb-2"
          placeholder="Group ID"
          type="text"
          name="groupID"
          id="groupID"
          autoFocus
          onChange={(e) => {
            setGroupID(e.target.value);
          }}
          value={groupID}
        />
        <button
          className="hover:bg-yellow-100 mb-2 p-2 shadow rounded text-3xl rounded-full w-12 h-12 bg-yellow-100 text-gray-500 hover:bg-yellow-200 hover:text-gray-800 active:bg-yellow-300 active:text-black shadow active:shadow-none transition-colors"
          type="submit"
        >
          <span className="material-symbols-rounded text-3xl">add</span>
        </button>
        <button
          className="absolute top-0 right-0 h-5 w-5 m-1 flex items-center justify-center text-gray-600 hover:text-red-500 rounded-full"
          onClick={handleClose}
        >
          <span className="material-symbols-rounded text-lg">close</span>
        </button>
      </form>
    </div>
  );
};

export default JoinGroup;
