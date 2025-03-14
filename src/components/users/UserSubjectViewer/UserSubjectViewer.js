import styles from "./UserSubjectViewer.module.css";
import React, { useEffect, useState } from "react";
import MemberTimer from "@/components/groups/MemberTimer/MemberTimer";

function UserSubjectViewer({ userInfo }) {
  const [activeSubject, setActiveSubject] = useState({
    start: null,
    name: "",
    total: 0,
  });

  useEffect(() => {
    const activeSubject = {
      name: "Offline",
      start: userInfo?.activeSubject?.time,
    };
    if (!userInfo?.activeSubject) {
      setActiveSubject(activeSubject);
      return;
    }

    if (userInfo.activeSubject.subject_id !== "0") {
      activeSubject.name = `Studying ${userInfo.activeSubject.name}`;
    } else if (userInfo.activeSubject.subject_id === "0") {
      activeSubject.name = "Taking break";
    }
    setActiveSubject(activeSubject);
  }, [userInfo?.activeSubject]);

  return (
    <div className={styles.UserSubjectViewer}>
      <p>{activeSubject.name}</p>
      {activeSubject.start ? <MemberTimer start={activeSubject.start} /> : null}
    </div>
  );
}

export default UserSubjectViewer;
