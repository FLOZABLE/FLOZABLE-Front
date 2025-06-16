import steps from "@/lib/steps";
import { useNextStep } from "nextstepjs";
import { useCallback } from "react";

export const useTutorial = (tutorialName: string = steps[0].tour) => {
  const nextStep = useNextStep();

  const setCurrentStep = useCallback(
    (step: number, delay?: number) => {
      //console.log("shit shit", step, tutorialName, nextStep.currentTour);
      if (tutorialName !== nextStep.currentTour) return;
      nextStep.setCurrentStep(step - 1, delay);
    },
    [tutorialName, nextStep],
  );

  const currentStep = nextStep.currentStep + 1;

  return {
    ...nextStep,
    currentStep,
    setCurrentStep,
  };
};
