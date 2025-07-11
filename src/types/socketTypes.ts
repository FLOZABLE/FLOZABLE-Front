import { UserStatus } from "./accountTypes";
import { ActiveGroup } from "./groupTypes";
import { ActiveSubject } from "./subjectTypes";

export interface OnStudying {
  user_id: string;
  subject: ActiveSubject;
}

export interface OnMyStudying {
  subject: ActiveSubject;
}

export interface OnStopStudying {
  user_id: string;
  status: UserStatus;
  duration: number;
}

export interface OnMyStopStudying {
  stopped_subject_id: string;
  duration: number;
}

export interface OnActiveGroup {
  user_id: string;
  group: ActiveGroup;
}

export interface OnDeActiveGroup {
  user_id: string;
}
