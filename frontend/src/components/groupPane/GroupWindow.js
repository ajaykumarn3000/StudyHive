import React, { useState } from "react";
import GroupList from "./GroupList";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";

const GroupWindow = ({ currentChat, setCurrentChat }) => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState(null);

  return (
    <div className="GroupWindow grow-0 w-72 flex flex-col">
      <GroupList
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        groups={groups}
        setGroups={setGroups}
      />
      {newGroup === null && (
        <div className="m-2 mt-0 bg-white shadow rounded px-3 py-3">
          <h1 className="text-center mb-2 text-gray-600 font-medium">
            New Group
          </h1>
          <div className="flex justify-around gap-x-2 ">
            <button
              className="bg-yellow-100 grow hover:grow-[2] transition-all shadow rounded font-medium text-gray-600 hover:bg-yellow-200 active:bg-yellow-300"
              onClick={(e) => setNewGroup("create")}
            >
              Create
            </button>
            <button
              className="bg-yellow-100 grow hover:grow-[2] transition-all shadow rounded font-medium text-gray-600 hover:bg-yellow-200 active:bg-yellow-300"
              onClick={(e) => setNewGroup("join")}
            >
              Join
            </button>
          </div>
        </div>
      )}
      {newGroup === "create" && <CreateGroup setGroups={setGroups} setNewGroup={setNewGroup} />}
      {newGroup === "join" && <JoinGroup setGroups={setGroups} setNewGroup={setNewGroup} />}
    </div>
  );
};

export default GroupWindow;
