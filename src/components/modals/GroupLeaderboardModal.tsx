"use client";

import { useGroupLeaderboard } from "@/hooks/groupHooks";
import { useState } from "react";

import { useGroupLeaderboardModal } from "../structure/ModalProviders";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";

export default function GroupLeaderboardModal() {
  const { groupLeaderboardModal, setGroupLeaderboardModal } =
    useGroupLeaderboardModal();

  const [viewDate, setViewDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );

  const { groupLeaderboardData } = useGroupLeaderboard(
    groupLeaderboardModal.group_id,
    viewDate,
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
          <CredenzaTitle className="text-2xl">Add Subject</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <div></div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
