"use client";

import RankingTrendChart from "@/components/charts/RankingTrendChart";
import StudyTrendChart from "@/components/charts/StudyTrendChart";
import ProfileCard from "@/components/users/ProfileCard";
import { useAccountProfile } from "@/hooks/accountHooks";
import { ViewerType } from "@/types/othersTypes";
import { use, useState } from "react";

type UserPageProps = {
  params: Promise<{ userId: string }>;
};

export default function UserPage({ params }: UserPageProps) {
  const { userId } = use(params);
  const { accountProfile } = useAccountProfile(userId);
  const [viewDate, _setViewDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, _setViewer] = useState<ViewerType>("day");

  if (!accountProfile?.userinfo) return;

  return (
    <main className="p-5">
      <div className="flex mb-5">
        <h1 className="text-2xl font-semibold">User</h1>
      </div>
      <div className="flex gap-5">
        <div className="">
          <ProfileCard
            userInfo={accountProfile.userinfo}
            subjects={accountProfile.subjects}
            groupedSubjects={accountProfile.grouped_subjects}
            className="w-96 shrink-0 "
          />
        </div>
        <div className="flex flex-col gap-5 flex-1/2">
          <StudyTrendChart
            viewDate={viewDate}
            viewer={viewer}
            groupedSubjects={accountProfile.grouped_subjects}
            isMine={false}
            className="h-[30rem]"
          />
          <RankingTrendChart
            viewDate={viewDate}
            viewer={viewer}
            userId={accountProfile?.userinfo.user_id}
            className="h-[30rem]"
          />
        </div>
      </div>
    </main>
  );
}
