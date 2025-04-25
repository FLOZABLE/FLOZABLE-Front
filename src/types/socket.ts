import { ActiveGroup } from "./group";
import { ActiveSubject } from "./subject";

export interface OnStudying {
  userId: string;
  subject: ActiveSubject;
}

export interface OnStopStudying {
  userId: string;
  subject: ActiveSubject;
  activeSubject: ActiveSubject;
  duration: number;
}

export interface OnActiveGroup {
  userId: string;
  group: ActiveGroup;
}

export interface OnDeActiveGroup {
  userId: string;
}
