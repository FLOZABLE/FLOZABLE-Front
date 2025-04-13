import { FriendStatus } from "@/types/friend";
import { useEffect, useState } from "react";

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
      start: userInfo?.active_subject?.time ?? 0,
      total: 0,
    };
    if (!userInfo?.active_subject) {
      setActiveSubject(activeSubject);
      return;
    }

    if (userInfo.active_subject.subject_id !== "0") {
      activeSubject.name = `Studying ${userInfo.active_subject.name}`;
    } else if (userInfo.active_subject.subject_id === "0") {
      activeSubject.name = "Taking break";
    }
    setActiveSubject(activeSubject);
  }, [userInfo?.active_subject]);

  return (
    <div >
      <p>{activeSubject.name}</p>
      {/* {activeSubject.start ? <MemberTimer start={activeSubject.start} /> : null} */}
    </div>
  );
}
