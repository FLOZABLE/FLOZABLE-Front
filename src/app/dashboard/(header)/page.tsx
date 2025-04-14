"use client";

import { DatePicker } from "@/components/buttons/DatePicker";
import StudyTrendChart from "@/components/charts/StudyTrendChart";
import FriendsViewer from "@/components/friends/FriendsViewer";
import SelectorWrapper from "@/components/ui/select";
import { ViewerType } from "@/types/others";
import { useState } from "react";

export default function Dashboard() {
  const [viewDate, setViewDate] = useState<Date>(new Date());
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
      <div className="flex gap-5">
        <FriendsViewer />
        <StudyTrendChart viewDate={viewDate} viewer={viewer} />
      </div>
    </main>
  );
}
