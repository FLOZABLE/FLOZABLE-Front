import styles from "./RankingsTrendsChart.module.css";
import { useRankingsUser } from "@/hooks/rankingsHooks";
import AccountWall from "@/components/others/AccountWall/AccountWall";
import { updateRankingTrend } from "@/utils/statTools";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function RankingsTrendsChart({ viewDate, viewer, userId }) {
  const [rankingsTrend, setRankingsTrend] = useState([]);

  const { rankingsUserData } = useRankingsUser({
    userId,
    mode: viewer,
    viewDate,
  });

  useEffect(() => {
    if (!rankingsUserData?.success || !viewer || !viewDate) return;

    const rankingTrend = updateRankingTrend(
      rankingsUserData.data.rankings,
      viewer,
      rankingsUserData.data.max_length
    );

    setRankingsTrend(rankingTrend);
  }, [rankingsUserData, viewDate, viewer]);

  return (
    <div className={`box ${styles.RankingsTrendsChart}`}>
      <div className={`header ${styles.header}`}>
        <h2>Ranking Trend</h2>
      </div>
      {!userId ? (
        <AccountWall />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rankingsTrend} margin={{ left: -10 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" />
            <YAxis reversed={true} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={"ranking"}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default RankingsTrendsChart;
