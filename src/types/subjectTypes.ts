import { ApiResponse } from "./responseTypes";

export type TimeRange = [number, number]; // [start, duration]

export interface TimelineEntry {
  date: string;
  data: TimeRange[]; // Array of [start, duration]
}

export interface TotalEntry {
  date: string;
  data: number; // Represents total time/focus in minutes or another unit
}

export interface FocusEntry {
  date: string;
  data: number; // Represents focus time
}

export interface TimePeriodData {
  timeline: TimelineEntry[];
  total: TotalEntry[];
  focus: FocusEntry[];
}

export interface Subject {
  subject_id: string;
  name: string;
  color: string;
  created_at: number;
  timeline: TimeRange[];
  day: TimePeriodData;
  week: TimePeriodData;
  month: TimePeriodData;
}

export interface GroupedSubjects {
  day: TimePeriodData;
  week: TimePeriodData;
  month: TimePeriodData;
}

export interface ActiveSubject {
  subject_id: string;
  start_time: number;
  name: string;
}

export interface NewSubject
  extends Pick<Subject, "name" | "color" | "created_at" | "subject_id"> {
  user_id: string; //this is honestly useless. only used in db
}

// GET /subjects
export type SubjectsResponse = ApiResponse<{
  subjects: Subject[];
  grouped_subjects: GroupedSubjects;
}>;

// PUT /subjects/subject
export type PutSubjectResponse = ApiResponse<{
  subject: NewSubject;
}>;
