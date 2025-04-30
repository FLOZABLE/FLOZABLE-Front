"use client";

import { DatePicker } from "@/components/buttons/DatePicker";
import RankingTrendChart from "@/components/charts/RankingTrendChart";
import StudyHeatMap from "@/components/charts/StudyHeatMap";
import SubjectsTrendChart from "@/components/charts/SubjectsTrendChart";
import SelectorWrapper from "@/components/ui/select";
import { useAccount } from "@/hooks/accountHooks";
import { useSubjects } from "@/hooks/subjectsHooks";
import { ViewerType } from "@/types/others";
import { useState } from "react";

export default function Stats() {
  const { account } = useAccount();

  const [viewDate, setViewDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, setViewer] = useState<ViewerType>("day");

  const { subjects } = useSubjects();

  return (
    <main className="p-5">
      <div className="flex justify-between w-full items-center mb-5 z-10">
        <h1 className="text-2xl font-semibold">Stats</h1>
        <div className="flex gap-3 fixed right-8 top-16 z-10">
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

        <RankingTrendChart
          viewDate={viewDate}
          viewer={viewer}
          userId={account?.user_id}
          className="h-[30rem]"
        />

        <StudyHeatMap />
      </div>
    </main>
  );
}
