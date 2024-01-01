import  { useMemo } from "react";
import useUserContext from "../../hooks/useUserContext";
import Group from "./Group";

const getGroups = async (token, setGroups) => {
  const response = await fetch("http://localhost:4000/api/group/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log("DATA", data);
  setGroups(data);
}

const GroupList = ({currentChat, setCurrentChat, groups, setGroups}) => {
  const { user } = useUserContext();
  
  
  useMemo(() => {
    getGroups(user.token, setGroups);
  }, [user.token, setGroups]);

  return (
    <div className="GroupList m-2 bg-white shadow rounded grow overflow-y-scroll scroll-smooth">
      {groups.map((group) => {
        let {_id, groupName} = group;
        return <Group key={_id} _id={_id} groupName={groupName} setCurrentChat={setCurrentChat} currentChat={currentChat}/>;
      })}
    </div>
    
  );
};

export default GroupList;
