import { Dispatch, SetStateAction } from "react";

export interface WorkersContextType {
  membersTimerWorker: Worker | null;
  subjectTimerWorker: Worker | null;
  createWorker: (name: string, script: string) => void;
  terminateWorker: (name: string) => void;
  getWorker: (name: string) => Worker | null;
}
export interface CallOptionsContextType {
  isCam: boolean;
  setIsCam: Dispatch<SetStateAction<boolean>>;
  isMic: boolean;
  setIsMic: Dispatch<SetStateAction<boolean>>;
  isHeadphone: boolean;
  setIsHeadphone: Dispatch<SetStateAction<boolean>>;
}
