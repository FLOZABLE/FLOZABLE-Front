"use client";

import { DatePicker } from "@/components/buttons/DatePicker";
import SummaryViewer from "@/components/charts/SummaryViewer";
import FriendsViewer from "@/components/friends/FriendsViewer";
import TopLeaderboard from "@/components/leaderboard/TopLeaderboard";
import Planstimeline from "@/components/plans/Planstimeline";
import { Button } from "@/components/ui/button";
import SelectorWrapper from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import YoutubePlayer from "@/components/youtube/YouTubePlayer";
import { ViewerType } from "@/types/others";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const [viewDate, setViewDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, setViewer] = useState<ViewerType>("day");

  const router = useRouter();
  return (
    <main className="p-5">
      <div className="flex flex-col gap-5">
        <div className="relative">
          <YoutubePlayer
            videoId="29XymHesxa0"
            volume={0}
            className="w-full rounded-xl overflow-hidden h-[50vh]"
          />
          <Button
            variant={"secondary"}
            className="absolute left-[50%] bottom-10 translate-x-[-50%]"
            onClick={() => {
              router.push("/dashboard/study");
            }}
          >
            <Play />
            Begin Study
          </Button>
        </div>
        <div className="flex gap-5">
          <SummaryViewer className="flex-1/2" />
          <div className="my-5">
            <Separator orientation="vertical" className="h-full border-2" />
          </div>
          <Planstimeline
            viewer={viewer}
            viewDate={viewDate}
            className="flex-1/2 border-0 shadow-none"
          />
        </div>
        <Separator className="border-2" />
        <div className="flex gap-5">
          <FriendsViewer className="h-[50vh] w-[30rem] border-0 shadow-none" />
          <div className="flex-1/2">
            <div className="flex gap-5 mb-5 justify-end">
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
            <TopLeaderboard viewer={viewer} viewDate={viewDate} />
          </div>
        </div>
      </div>
    </main>
  );
}
