"use client";

import PlansTimeline from "@/components/plans/PlansTimeline/PlansTimeline";
import styles from "./page.module.css";
import { useState } from "react";
import SubjectsPie from "@/components/charts/SubjectsPie/SubjectsPie";
import Analysis from "@/components/charts/Analysis/Analysis";
import FriendsViewer from "@/components/friends/FriendsViewer/FriendsViewer";

export default function Dashboard() {
  const [viewDate, setViewDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, setViewer] = useState("day");

  return (
    <main className={`main ${styles.page}`}>
      <div className={styles.left}>
        <div className={`${styles.box} boxContainer`} id={styles.planTimeline}>
          <PlansTimeline
            setViewDate={setViewDate}
            viewDate={viewDate}
            viewer={viewer}
            maxHeight="calc(80vh)"
          />
        </div>
        <div className={`${styles.box} boxContainer`} id={styles.SubjectsPie}>
          <SubjectsPie
            viewDate={viewDate}
            setViewDate={setViewDate}
            viewer={viewer}
            setViewer={setViewer}
          />
        </div>
      </div>
      <div className={styles.center}>
        <Analysis viewer={viewer} viewDate={viewDate} />
      </div>
      <div className={styles.right}>
        <div
          className={`${styles.box} boxContainer`}
          id={styles.FriendsActivityViewer}
        >
          <FriendsViewer />
        </div>
      </div>
    </main>
  );
}
