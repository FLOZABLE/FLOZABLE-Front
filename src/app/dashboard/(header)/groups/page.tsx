"use client";

import GroupContainer from "@/components/groups/GroupContainer";
import MyGroupsViewer from "@/components/groups/MyGroupsViewer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGroups } from "@/hooks/groupHook";
import { useRankings } from "@/hooks/rankingHooks";

export default function Groups() {
  const { groups } = useGroups();
  const { rankingsData } = useRankings(
    "day",
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  return (
    <main className="p-5">
      <Card className="p-6">
        <MyGroupsViewer />
      </Card>
      <Card className="mt-10">
        <CardHeader>Groups</CardHeader>
        <CardContent>
          <div className="grid grid-cols-[repeat(auto-fill,_20rem)] gap-4 justify-center">
            {groups?.map((group, i) => (
              <GroupContainer key={i} group={group} rankings={rankingsData} />
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
