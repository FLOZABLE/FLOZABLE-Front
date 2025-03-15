"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useAccount } from "@/hooks/accountHooks";
import RankingsTrendsChart from "@/components/charts/RankingsTrendsChart/RankingsTrendsChart";
import TopLeaderBoard from "@/components/leaderboard/TopLeaderBoard/TopLeaderBoard";
import Leaderboard from "@/components/leaderboard/Leaderboard/Leaderboard";

function Ranking({}) {
  const { accountData } = useAccount();

  const [viewDate, setViewDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, setViewer] = useState("day");
  const [isOnlyFriends, setIsOnlyFriends] = useState(false);

  return (
    <div className={`page`}>
      <main className="main">
        <div className={styles.layer}>
          <div className={styles.left}>
            <div className={styles.rankingsTrendChart}>
              <RankingsTrendsChart
                viewDate={viewDate}
                setViewDate={setViewDate}
                viewer={viewer}
                userId={accountData?.user_id}
              />
            </div>
            <div className={styles.leaderboard}>
              <Leaderboard
                viewDate={viewDate}
                viewer={viewer}
                isOnlyFriends={isOnlyFriends}
              />
            </div>
          </div>
          <div className={styles.right}>
            <TopLeaderBoard
              viewer={viewer}
              viewDate={viewDate}
              setViewDate={setViewDate}
              setViewer={setViewer}
              isOnlyFriends={isOnlyFriends}
              setIsOnlyFriends={setIsOnlyFriends}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Ranking;
