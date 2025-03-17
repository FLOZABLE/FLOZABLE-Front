import socket from "@/utils/sockets/socket";
import React, { useEffect, useState } from "react";

function GroupMemCounter({ initialMembers, groupId }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (!groupId) return;

    const onNewMember = ({ groupId, userInfo }) => {
      console.log("newMember", groupId, userInfo);
      if (group.group_id !== groupId) return;
      setMembers((prev) => [...prev, userInfo.userId]);
    };

    const onRemoveMember = ({ groupId, userId }) => {
      if (!group.group_id === groupId) return;
      setMembers((prev) => {
        return prev.filter((memberId) => {
          return memberId !== userId;
        });
      });
    };

    socket.on("group:member:new", onNewMember);
    socket.on("group:member:left", onRemoveMember);
    return () => {
      socket.on("group:member:new", onNewMember);
      socket.on("group:member:left", onRemoveMember);
    };
  }, [groupId]);

  useEffect(() => {
    setMembers(initialMembers);
  }, [initialMembers]);

  return <p>{members.length}</p>;
}

export default GroupMemCounter;
