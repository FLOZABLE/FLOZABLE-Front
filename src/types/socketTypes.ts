import { UserStatus } from "./accountTypes";
import { ActiveGroup } from "./groupTypes";
import { ActiveSubject } from "./subjectTypes";

export interface OnStudying {
  userId: string;
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
  userId: string;
  group: ActiveGroup;
}

export interface OnDeActiveGroup {
  userId: string;
}
