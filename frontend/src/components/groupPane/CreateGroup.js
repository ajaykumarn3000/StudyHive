import React, { useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import { serverUrl } from "../../setup";

const createNewGroup = async (token, groupName, setGroups) => {
  const response = await fetch(serverUrl + "/api/group/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ groupName: groupName }),
  });
  if (response.ok) {
    const data = await response.json();
    console.log("New Group: ", data);
    setGroups((prev) => [...prev, data]);
  }
};

const CreateGroup = ({ setGroups, setNewGroup }) => {
  const [groupName, setGroupName] = useState("");
  const { user } = useUserContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewGroup(user.token, groupName, setGroups);
    setGroupName("");
  };

  const handleClose = () => {
    setNewGroup(null);
  };

  return (
    <div
      className="CreateGroup m-2 mt-0 bg-white shadow rounded py-2 px-4 relative"
      onKeyDown={(e) => {
        if (e.key === "Escape") handleClose();
      }}
    >
      <h3 className="text-center text-gray-600 font-medium mb-4">
        Create Group
      </h3>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="block border-2 border-gray-500 rounded w-75% px-2 py-1 mb-2"
          placeholder="Group Name"
          type="text"
          autoFocus
          name="groupName"
          id="groupName"
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
          value={groupName}
        />
        <button
          className="hover:bg-yellow-100 mb-2 shadow rounded text-3xl rounded-full w-10 h-10 bg-yellow-100 text-gray-500 hover:bg-yellow-200 hover:text-gray-800 active:bg-yellow-300 active:text-black shadow active:shadow-none transition-colors flex items-center justify-center"
          type="submit"
        >
          <span className="material-symbols-rounded text-3xl">add</span>
        </button>
        <p
          className="cursor-pointer absolute top-0 right-0 h-5 w-5 m-1 flex items-center justify-center text-gray-600 hover:text-red-500 rounded-full"
          onClick={handleClose}
        >
          <span className="material-symbols-rounded text-lg">close</span>
        </p>
      </form>
    </div>
  );
};

export default CreateGroup;
