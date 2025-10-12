"use client";

import { useRemoveSearchParams } from "@/hooks/otherHooks";
import { useTutorial } from "@/hooks/tutorialHooks";
import { BookOpen } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

import StudyButton from "../buttons/StudyButton";
import { useWelcomeModal } from "../structure/ModalProviders";
import { Button } from "../ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";

export default function WelcomeModal() {
  const { startNextStep } = useTutorial();
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
      <CredenzaContent className="w-fit min-w-72">
        <CredenzaHeader>
          <CredenzaTitle>Welcome to FLOZABLE!</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="flex flex-col gap-5">
          <Button
            icon={BookOpen}
            iconPlacement="right"
            onClick={() => {
              setIsWelcomeModal(false);
              startNextStep("newUser");
            }}>
            Start Tutorial
          </Button>
          <StudyButton
            onClick={() => {
              setIsWelcomeModal(false);
            }}
            effect={null}
          />
        </CredenzaBody>
        {isWelcomeModal && (
          <Fireworks
            autorun={{ speed: 1 }}
            className="w-screen h-screen absolute pointer-events-none"
          />
        )}
      </CredenzaContent>
    </Credenza>
  );
}
