"use client";

import DynamicRankingTrendChart from "@/components/dynamic/charts/DynamicRankingTrendChart";
import DynamicStudyTrendChart from "@/components/dynamic/charts/DynamicStudyTrendChart";
import ProfileCard from "@/components/users/ProfileCard";
import { useUserProfile } from "@/hooks/userHooks";
import { ViewerType } from "@/types/otherTypes";
import { use, useState } from "react";

type UserPageProps = {
  params: Promise<{ userId: string }>;
};

export default function UserPage({ params }: UserPageProps) {
  const { userId } = use(params);
  const { userProfile } = useUserProfile(userId);
  const [viewDate, _setViewDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const [viewer, _setViewer] = useState<ViewerType>("day");

  if (!userProfile?.userinfo) return;

  return (
    <main className="p-5">
      <div className="flex mb-5">
        <h1 className="text-2xl font-semibold">User</h1>
      </div>
      <div className="flex gap-5">
        <div className="">
          <ProfileCard
            userInfo={userProfile.userinfo}
            subjects={userProfile.subjects}
            groupedSubjects={userProfile.grouped_subjects}
            className="w-96 shrink-0 "
          />
        </div>
        <div className="flex flex-col gap-5 flex-1/2">
          <DynamicStudyTrendChart
            viewDate={viewDate}
            viewer={viewer}
            groupedSubjects={userProfile.grouped_subjects}
            isMine={false}
            className="h-[30rem]"
          />
          <DynamicRankingTrendChart
            viewDate={viewDate}
            viewer={viewer}
            userId={userProfile?.userinfo.user_id}
            className="h-[30rem]"
          />
        </div>
      </div>
    </main>
  );
}
