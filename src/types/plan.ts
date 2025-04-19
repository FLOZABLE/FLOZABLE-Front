import { ApiResponse } from "./response";

export interface CalendarPlan {
  id: string;
  summary: string;
  background_color: string;
  foreground_color: string;
  events: EventPlan[];
}

export interface EventOption {
  disableDND?: boolean;
  disableResize?: boolean;
  additionalClasses?: string[];
}

export interface EventPlan {
  id: string;
  title: string;
  description: string;
  html_link?: string | null;
  start: string; // ISO format
  end: string; // ISO format
  all_day: boolean;
  background_color: string;
  calendar_id: string;
  editable: boolean;
}

// GET /plans
export type PlansResponse = ApiResponse<{ plans: CalendarPlan[] }>;
