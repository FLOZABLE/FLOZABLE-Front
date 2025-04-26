"use client";

import { useJoinGroupModal } from "../structure/ModalProviders";
import {
  Credenza,
  CredenzaBody,
  CredenzaHeader,
  CredenzaContent,
  CredenzaTitle,
  CredenzaDescription,
} from "../ui/credenza";

export default function JoinGroupModal() {
  const { joinGroupModal, setJoinGroupModal } = useJoinGroupModal();
  return (
    <Credenza
      open={joinGroupModal.opened}
      onOpenChange={(opened) => {
        setJoinGroupModal((prev) => ({ ...prev, opened }));
      }}
    >
      <CredenzaContent desktopClassName="!max-w-100">
        <CredenzaHeader className="justify-self-center justify-center items-center text-center">
          <CredenzaTitle className="text-2xl">Join Group</CredenzaTitle>
          <CredenzaDescription>sdf</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <p></p>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
