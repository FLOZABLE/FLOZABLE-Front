"use client";

import { useGroupLeaderboard } from "@/hooks/groupHooks";
import { secondConverter } from "@/lib/utils";
import { ViewerType } from "@/types/otherTypes";
import { useState } from "react";

import { DatePicker } from "../buttons/DatePicker";
import { useGroupLeaderboardModal } from "../structure/ModalProviders";
import { Badge } from "../ui/badge";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";
import SelectorWrapper from "../ui/select";
import UserContainer from "../users/UserContainer";

export default function GroupLeaderboardModal() {
  const { groupLeaderboardModal, setGroupLeaderboardModal } =
    useGroupLeaderboardModal();

  const [viewDate, setViewDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const [viewer, setViewer] = useState<ViewerType>("day");

  const { groupLeaderboardData } = useGroupLeaderboard(
    groupLeaderboardModal.group_id,
    viewDate,
    viewer,
  );

  console.log(groupLeaderboardData, "gd");

  return (
    <Credenza
      open={groupLeaderboardModal.opened}
      onOpenChange={(opened) => {
        setGroupLeaderboardModal((prev) => ({ ...prev, opened }));
      }}>
      <CredenzaContent desktopClassName="!max-w-100" id="tour1-step3">
        <CredenzaHeader className="justify-self-center">
          <CredenzaTitle className="text-2xl">Group Leaderboard</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
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
            <div className="h-60 overflow-auto">
              {groupLeaderboardData?.map((member, i) => {
                return (
                  <div key={member.user_id} className="flex items-center">
                    {i + 1}
                    <UserContainer userinfo={member} />
                    <Badge className="ml-auto" variant={"secondary"}>
                      {secondConverter({ sec: member.study_time })}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
