import { FriendStatus } from "@/types/friendTypes";
import { useEffect, useState } from "react";
import MemberTimer from "../groups/MemberTimer";

interface FriendsViewerProps {
  userInfo: FriendStatus;
}

interface ActiveSubjectTimer {
  start: number;
  name: string;
  total: number;
}

export default function UserSubjectViewer({ userInfo }: FriendsViewerProps) {
  const [activeSubject, setActiveSubject] = useState<ActiveSubjectTimer>({
    start: 0,
    name: "",
    total: 0,
  });

  useEffect(() => {
    const activeSubject = {
      name: "Offline",
      start: userInfo?.status?.start_time ?? 0,
      total: 0,
    };
    if (!userInfo?.status) {
      setActiveSubject(activeSubject);
      return;
    }

    if (userInfo.status.subject_id !== "0") {
      activeSubject.name = `Studying ${userInfo.status.name}`;
    } else if (userInfo.status.subject_id === "0") {
      activeSubject.name = "Taking break";
    }
    setActiveSubject(activeSubject);
  }, [userInfo?.status]);

  return (
    <div className="p-2 rounded-md flex gap-2">
      <p className="whitespace-nowrap truncate">{activeSubject.name}</p>
      {activeSubject.start ? (
        <MemberTimer start={activeSubject.start} className="ml-auto" />
      ) : null}
    </div>
  );
}
