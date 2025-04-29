"use client";

import StudyTrendChart from "@/components/charts/StudyTrendChart";
import ProfileCard from "@/components/users/ProfileCard";
import { useAccountProfile } from "@/hooks/accountHooks";
import { ViewerType } from "@/types/others";
import { use, useState } from "react";

type UserPageProps = {
  params: Promise<{ userId: string }>;
};

export default function UserPage({ params }: UserPageProps) {
  const { userId } = use(params);
  const { accountProfile } = useAccountProfile(userId);
  const [viewDate, setViewDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, setViewer] = useState<ViewerType>("day");

  if (!accountProfile?.userinfo) return;

  return (
    <main className="p-5">
      <div className="flex mb-5">
        <h1 className="text-2xl font-semibold">User</h1>
      </div>
      <div className="flex gap-5">
        <ProfileCard
          userInfo={accountProfile.userinfo}
          subjects={accountProfile.subjects}
          groupedSubjects={accountProfile.grouped_subjects}
          className="w-96 shrink-0 "
        />
        <StudyTrendChart
          viewDate={viewDate}
          viewer={viewer}
          groupedSubjects={accountProfile.grouped_subjects}
          isMine={false}
          className="w-full overflow-hidden"
        />
      </div>
    </main>
  );
}
