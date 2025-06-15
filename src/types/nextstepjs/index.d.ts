import { Step as OriginalStep } from "nextstepjs"; // Assuming 'Step' is exported directly

declare module "nextstepjs" {
  // Extend the Step interface
  export interface Step extends OriginalStep {
    prevDelay?: number;
    nextDelay?: number;
    isPrevButton?: boolean;
    isNextButton?: boolean;
  }
}
