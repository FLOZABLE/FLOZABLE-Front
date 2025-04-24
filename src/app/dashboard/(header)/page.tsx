"use client";

import { DatePicker } from "@/components/buttons/DatePicker";
import StudyTrendChart from "@/components/charts/StudyTrendChart";
import FriendsViewer from "@/components/friends/FriendsViewer";
import TopLeaderboard from "@/components/leaderboard/TopLeaderboard";
import Welcome from "@/components/others/Welcome";
import Planstimeline from "@/components/plans/Planstimeline";
import SelectorWrapper from "@/components/ui/select";
import { ViewerType } from "@/types/others";
import { useState } from "react";

export default function Dashboard() {
  const [viewDate, setViewDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, setViewer] = useState<ViewerType>("day");
  return (
    <main className="p-5">
      <div className="flex justify-between w-full items-center mb-5">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex gap-3">
          <DatePicker
            viewDate={viewDate}
            setViewDate={setViewDate}
            viewer={viewer}
          />
          <SelectorWrapper
            value={viewer}
            onChange={(viewer: ViewerType) => {
              setViewer(viewer);
            }}
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
          />
        </div>
      </div>
      <div className="flex gap-5 flex-col">
        <div className="flex gap-5 max-h-80">
          <Welcome className="flex-1/3" />
          <Planstimeline
            viewer={viewer}
            viewDate={viewDate}
            className="flex-1/3"
          />
          <TopLeaderboard
            viewer={viewer}
            viewDate={viewDate}
            className="flex-1/3"
          />
        </div>
        <div className="flex gap-5">
          <FriendsViewer />
          <StudyTrendChart
            viewDate={viewDate}
            viewer={viewer}
            className="w-full"
          />
        </div>
      </div>
    </main>
  );
}
