import { useTutorial } from "@/hooks/tutorialHooks";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Step } from "nextstepjs";
import React, { JSX, useCallback, useEffect } from "react";

import { useAddSubjectModal } from "../structure/ModalProviders";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface CardComponentProps {
  step: Step;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  skipTour?: () => void;
  arrow: JSX.Element;
}

// Convert to a standard functional component
function TutorialCard({
  step,
  totalSteps,
  nextStep,
  prevStep,
  skipTour,
  arrow,
}: CardComponentProps) {
  const { setAddSubjectModal } = useAddSubjectModal();

  const { currentStep, setCurrentStep, currentTour } = useTutorial();
  const router = useRouter();

  const handleCustomStepLogic = useCallback(
    (stepNumber: number) => {
      if (currentTour !== "newUser") return;

      switch (stepNumber) {
        case 2:
          setAddSubjectModal((prev) => ({ ...prev, opened: false }));
          break;
        case 3:
          setAddSubjectModal((prev) => ({ ...prev, opened: true }));
          break;
        /* case 8:
          setTimeout(() => {
            console.log("current", currentStep);
            if (currentStep !== 8) return;
            setCurrentStep(9);
          }, 5000);
          break; */
        default:
          break;
      }
    },
    [currentTour, setAddSubjectModal, setCurrentStep, currentStep],
  );

  const handleStepChange = useCallback(
    (direction: "next" | "prev") => {
      const newStep = direction === "next" ? currentStep + 1 : currentStep - 1;
      const route = direction === "next" ? step.nextRoute : step.prevRoute;
      const delay = direction === "next" ? step.nextDelay : step.prevDelay;

      if (route) router.push(route);
      handleCustomStepLogic(newStep);

      setTimeout(() => {
        setCurrentStep(newStep);
      }, delay || 0);
    },
    [currentStep, step, handleCustomStepLogic, setCurrentStep, router],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentStep > 1) {
        handleStepChange("prev");
      } else if (e.key === "ArrowRight" && currentStep < totalSteps) {
        handleStepChange("next");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleStepChange, currentStep, totalSteps]);

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-card rounded-lg shadow-lg p-4 max-w-sm min-w-80 sm:max-w-md flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{step.title}</h2>
        {step.icon && <span className="text-xl">{step.icon}</span>}
      </div>

      <div className="text-sm">{step.content}</div>

      <Progress value={progress} className={`w-[${progress}%]`} />

      <div className="flex justify-between items-center gap-4 text-xs relative">
        <Button
          onClick={() => {
            if (currentTour === "newUser") {
              switch (currentStep - 1) {
                case 2:
                  setAddSubjectModal((prev) => ({ ...prev, opened: false }));
                  break;
                case 3:
                  setAddSubjectModal((prev) => ({ ...prev, opened: true }));
                  break;
                case 8:
                  setTimeout(() => {
                    setCurrentStep(9);
                  }, 5000);
                  break;
                default:
              }
            }

            setTimeout(() => {
              prevStep();
            }, step.prevDelay || 0);
          }}
          className={cn(
            step.isPrevButton ? "block" : "opacity-0 pointer-events-none",
          )}
          variant={"secondary"}>
          Previous
        </Button>
        <span className="whitespace-nowrap absolute-center">
          {currentStep} of {totalSteps}
        </span>
        {currentStep === totalSteps ? (
          <Button
            onClick={skipTour}
            className={"bg-green-500 hover:bg-green-600"}>
            Finish
          </Button>
        ) : (
          <Button
            onClick={() => {
              if (currentTour === "newUser") {
                switch (currentStep + 1) {
                  case 3:
                    setAddSubjectModal((prev) => ({ ...prev, opened: true }));
                    break;
                  case 8:
                    setTimeout(() => {
                      setCurrentStep(9);
                    }, 5000);
                    break;
                  default:
                }
              }

              setTimeout(() => {
                nextStep();
              }, step.nextDelay || 0);
            }}
            className={cn(step.isNextButton ? "block" : "hidden")}>
            Next
          </Button>
        )}
      </div>

      {arrow}

      {/* Conditional rendering for Skip Tour button */}
      {skipTour && currentStep < totalSteps && (
        <Button
          onClick={skipTour}
          className={cn("w-full")}
          variant={"secondary"}>
          Skip Tour
        </Button>
      )}
    </div>
  );
}

export default TutorialCard;
