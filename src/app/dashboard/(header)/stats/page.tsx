"use client";

import { DatePicker } from "@/components/buttons/DatePicker";
import SubjectsTrendChart from "@/components/charts/SubjectsTrendChart";
import SelectorWrapper from "@/components/ui/select";
import { useSubjects } from "@/hooks/subjectsHooks";
import { ViewerType } from "@/types/others";
import { useState } from "react";

export default function Stats() {
  const [viewDate, setViewDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, setViewer] = useState<ViewerType>("day");

  const { subjects } = useSubjects();

  return (
    <main className="p-5">
      <div className="flex justify-between w-full items-center mb-5">
        <h1 className="text-2xl font-semibold">Stats</h1>
        <div className="flex gap-3 fixed right-8 top-16">
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
      <div className="flex flex-col gap-4">
        <SubjectsTrendChart
          viewDate={viewDate}
          viewer={viewer}
          subjects={subjects}
          className="h-[30rem]"
        />
      </div>
    </main>
  );
}
