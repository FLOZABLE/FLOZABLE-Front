"use client";

import ProfileCard from "@/components/users/ProfileCard";
import { useAccountProfile } from "@/hooks/accountHooks";
import { use } from "react";

type UserPageProps = {
  params: Promise<{ userId: string }>;
};

export default function UserPage({ params }: UserPageProps) {
  const { userId } = use(params);
  const { accountProfile } = useAccountProfile(userId);
  if (!accountProfile?.userinfo) return;

  return (
    <main className="p-5">
      <div className="flex mb-5">
        <h1 className="text-2xl font-semibold">User</h1>
      </div>
      <div>
        <ProfileCard
          userInfo={accountProfile.userinfo}
          subjects={accountProfile.subjects}
          groupedSubjects={accountProfile.grouped_subjects}
        />
      </div>
    </main>
  );
}
