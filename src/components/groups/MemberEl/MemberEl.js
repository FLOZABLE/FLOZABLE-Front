import React, { useEffect, useState } from "react";
import styles from "./MemberEl.module.css";
import { IconRestPerson, IconStudyPerson } from "@/components/others/Svgs";
import Link from "next/link";
import MemberCamDisp from "../MemberCamDisp.js/MemberCamDisp";
import MemberTimer from "../MemberTimer/MemberTimer";
import ProfileImage from "@/components/users/ProfileImage/ProfileImage";

function MemberEl({ memberInfo, device, recvTransport }) {
  const [activeSubject, setActiveSubject] = useState({
    start: null,
    name: "",
    total: 0,
  });

  useEffect(() => {
    const activeSubject = {
      name: "Offline",
      start: memberInfo.activeSubject?.time,
      total: null,
    };
    if (
      memberInfo.activeSubject &&
      memberInfo.activeSubject?.subject_id !== "0"
    ) {
      activeSubject.name = `Studying ${memberInfo.activeSubject.name}`;
      activeSubject.total = memberInfo.study_time;
    }
    setActiveSubject(activeSubject);
  }, [memberInfo]);

  return (
    <div className={styles.Member}>
      <MemberCamDisp
        memberInfo={memberInfo}
        device={device}
        recvTransport={recvTransport}
      />
      <div className={styles.inner}>
        <Link
          href={`/dashboard/user/${memberInfo.user_id}`}
          className={styles.userInfo}
        >
          <div className={styles.userName}>{memberInfo.name}</div>
        </Link>
        <i className={styles.icon}>
          {activeSubject.start ? <IconStudyPerson /> : <IconRestPerson />}
        </i>
        <div className={styles.timer}>
          <MemberTimer
            initialSec={activeSubject.total}
            start={activeSubject.start}
          />
        </div>
        <div className={styles.ProfileImage}>
          <ProfileImage userId={memberInfo.user_id} />
        </div>
      </div>
    </div>
  );
}

export default MemberEl;
