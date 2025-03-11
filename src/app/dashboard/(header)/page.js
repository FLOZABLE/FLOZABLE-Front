"use client";

import PlansTimeline from "@/components/plans/PlansTimeline/PlansTimeline";
import styles from "./page.module.css";
import { useState } from "react";
import SubjectsPie from "@/components/charts/SubjectsPie/SubjectsPie";
import Analysis from "@/components/charts/Analysis/Analysis";
import FriendsViewer from "@/components/friends/FriendsViewer/FriendsViewer";
import { useAccount } from "@/hooks/accountHooks";
import DateSelectorBtn from "@/components/buttons/DateSelectorBtn/DateSelectorBtn";

export default function Dashboard() {
  const { accountData } = useAccount();
  const [viewDate, setViewDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, setViewer] = useState("day");

  return (
    <div className="page">
      <main className={`main ${styles.page}`}>
        <div className={styles.top}>
          {accountData?.name ? (
            <h1>Welcome Back, {accountData?.name}!</h1>
          ) : (
            <h1>Welcome!</h1>
          )}
          <DateSelectorBtn
            viewDate={viewDate}
            setViewDate={setViewDate}
            viewer={viewer}
          />
        </div>
        <div className={styles.contents}>
          <div className={styles.left}>
            <Analysis viewer={viewer} viewDate={viewDate} />
          </div>
          <div className={styles.center}>
            <div className={`${styles.box}`} id={styles.planTimeline}>
              <PlansTimeline
                setViewDate={setViewDate}
                viewDate={viewDate}
                viewer={viewer}
                maxHeight="calc(80vh)"
              />
            </div>
            <div className={`${styles.box}`} id={styles.SubjectsPie}>
              <SubjectsPie
                viewDate={viewDate}
                setViewDate={setViewDate}
                viewer={viewer}
                setViewer={setViewer}
              />
            </div>
          </div>
          <div className={styles.right}>
            <div className={`${styles.box}`} id={styles.FriendsActivityViewer}>
              <FriendsViewer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
