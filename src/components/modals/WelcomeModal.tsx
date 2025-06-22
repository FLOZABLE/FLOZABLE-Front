"use client";

import { useRemoveSearchParams } from "@/hooks/otherHooks";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import StudyButton from "../buttons/StudyButton";
import TutorialButton from "../buttons/TutorialButton";
import { useWelcomeModal } from "../structure/ModalProviders";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";

export default function WelcomeModal() {
  const { isWelcomeModal, setIsWelcomeModal } = useWelcomeModal();

  const searchParams = useSearchParams();

  const isWelcome: boolean = searchParams.get("welcome") === "true";

  const deleteSearchParams = useRemoveSearchParams();

  useEffect(() => {
    if (!isWelcome) return;
    deleteSearchParams("welcome");

    setIsWelcomeModal(true);
  }, [isWelcome]);

  return (
    <Credenza open={isWelcomeModal} onOpenChange={setIsWelcomeModal}>
      <CredenzaContent className="w-fit">
        <CredenzaHeader>
          <CredenzaTitle>Welcome to FLOZABLE!</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="flex flex-col gap-5">
          <StudyButton />
          <TutorialButton />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
