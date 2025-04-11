"use client";

import { useFriendsTrends } from "@/hooks/friendsHooks";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DateTime } from "luxon";
import { useAccount } from "@/hooks/accountHooks";
import AccountWall from "../others/AccountWall/AccountWall";
import { secondConverter } from "@/utils/tools";
import { SUBJECTS_PIE_COLORS } from "@/utils/constants";
import CircularLoading from "../loadings/CircularLoading/CircularLoading";

function FriendsTrendChart() {
  const { account } = useAccount();

  const { friendsTrendData, friendsTrendsIsLoading } = useFriendsTrends();

  if (friendsTrendsIsLoading) {
    return <CircularLoading />;
  }

  if (!account) {
    return <AccountWall />;
  }

  if (!friendsTrendData.length) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={friendsTrendData.map((trend) => {
          const date = DateTime.fromSeconds(trend.date).toFormat("M/d");
          const friendsData = { date };

          trend.friends.map((friend) => {
            friendsData[friend.user_id] = friend.study_time;
          });
          return friendsData;
        })}
        /* margin={{
          top: 5,
          right: 30,
          left: -20,
          bottom: 5,
        }} */
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          tickFormatter={(sec) => {
            const formattedValue = secondConverter({ sec });
            return formattedValue;
          }}
        />
        <Tooltip
          formatter={(sec) => {
            const formattedValue = secondConverter({ sec });
            return formattedValue;
          }}
        />
        <Legend />
        {friendsTrendData[0].friends.map((friend, i) => {
          return (
            <Bar
              key={i}
              dataKey={friend.user_id}
              name={friend.name}
              fill={SUBJECTS_PIE_COLORS[i % SUBJECTS_PIE_COLORS.length]}
              barSize={40}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default FriendsTrendChart;
