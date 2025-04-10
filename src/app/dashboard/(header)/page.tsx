"use client";

import { DatePicker } from "@/components/buttons/DatePicker";
import SelectorWrapper from "@/components/ui/select";
import { DateTimeUnit } from "luxon";
import { useState } from "react";

export default function Dashboard() {
  const [viewDate, setViewDate] = useState<Date>(new Date());
  const [viewer, setViewer] = useState<DateTimeUnit>("day");
  return (
    <main className="p-5">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex gap-3">
          <DatePicker
            viewDate={viewDate}
            setViewDate={setViewDate}
            viewer={viewer}
          />
          <SelectorWrapper
            value={viewer}
            onChange={(viewer: DateTimeUnit) => {
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
    </main>
  );
}
