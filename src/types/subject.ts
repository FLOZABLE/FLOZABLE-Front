import { ApiResponse } from "./response";

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
  color: string;
  created_at: number;
  timeline: TimeRange[];
  day: TimePeriodData;
  week: TimePeriodData;
  month: TimePeriodData;
}

export interface Subjects {
  [index: number]: Subject;
}

export interface GroupedSubjects {
  day: TimePeriodData;
  week: TimePeriodData;
  month: TimePeriodData;
}

export interface ActiveSubject {
  subject_id: string;
  time: number;
  name: string;
}

// get /subjects
export type SubjectsResponse = ApiResponse<{
  subjects: Subjects;
  grouped_subjects: GroupedSubjects;
}>;
