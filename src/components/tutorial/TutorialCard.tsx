import { Step } from "nextstepjs";
import React, { JSX } from "react";

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
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  skipTour,
  arrow,
}: CardComponentProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm min-w-80 sm:max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{step.title}</h2>
        {step.icon && <span className="text-xl">{step.icon}</span>}
      </div>

      <div className="mb-4 text-sm">{step.content}</div>

      <div className="mb-4 bg-gray-200 rounded-full h-2.5">
        <div
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          className="bg-blue-600 h-2.5 rounded-full"></div>
      </div>
      <div className="flex justify-between items-center gap-4 text-xs">
        <button
          onClick={() => {
            if (step.prevDelay) {
              setTimeout(() => {
                prevStep();
              }, step.prevDelay);
            } else {
              prevStep();
            }
          }}
          className={`
            px-4 py-2 font-medium text-gray-700 bg-gray-100 rounded-md cursor-pointer
            ${step.showControls ? "block" : "hidden"}
            ${
              currentStep === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }
          `}
          disabled={currentStep === 0}>
          Previous
        </button>
        <span className="text-gray-600 whitespace-nowrap">
          {currentStep + 1} of {totalSteps}
        </span>
        {currentStep === totalSteps - 1 ? (
          <button
            onClick={skipTour} // This button acts as "Finish"
            className={`
              px-4 py-2 font-medium text-white bg-green-500 rounded-md cursor-pointer
              ${step.showControls ? "block" : "hidden"}
              hover:bg-green-600
            `}>
            Finish
          </button>
        ) : (
          <button
            onClick={() => {
              if (step.nextDelay) {
                setTimeout(() => {
                  nextStep();
                }, step.nextDelay);
              } else {
                nextStep();
              }
            }}
            className={`
              px-4 py-2 font-medium text-white bg-blue-600 rounded-md cursor-pointer
              ${step.showControls ? "block" : "hidden"}
              hover:bg-blue-700
            `}>
            Next
          </button>
        )}
      </div>

      {arrow}

      {/* Conditional rendering for Skip Tour button */}
      {skipTour && currentStep < totalSteps - 1 && (
        <button
          onClick={skipTour}
          className={`
            mt-4 text-xs w-full px-4 py-2 font-medium text-gray-700 bg-gray-100 rounded-md cursor-pointer
            ${step.showSkip ? "block" : "hidden"}
            hover:bg-gray-200
          `}>
          Skip Tour
        </button>
      )}
    </div>
  );
}

export default TutorialCard;
