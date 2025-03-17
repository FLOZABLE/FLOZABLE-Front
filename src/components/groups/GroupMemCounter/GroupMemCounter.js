import socket from "@/utils/sockets/socket";
import React, { useEffect, useState } from "react";

function GroupMemCounter({ initialMembers, groupId }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (!groupId) return;

    const onNewMember = (data) => {
      console.log("newMember", data);
      if (data.groupId !== groupId) return;
      setMembers((prev) => [...prev, data.userInfo.userId]);
    };

    const onRemoveMember = (data) => {
      if (data.groupId !== groupId) return;
      setMembers((prev) => {
        return prev.filter((memberId) => {
          return memberId !== data.userId;
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
