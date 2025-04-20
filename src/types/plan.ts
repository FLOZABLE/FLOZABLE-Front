import { EventApi } from "@fullcalendar/core";
import { ApiResponse } from "./response";
import { DateTime } from "luxon";

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

export const convertToEventPlan = (event: EventApi): EventPlan => {
  const { id, title } = event;
  const { description, all_day, background_color, calendar_id, editable } =
    event.extendedProps;

  const start = DateTime.fromJSDate(event.start || new Date()).toISO() ?? "";
  const end =
    DateTime.fromJSDate(event.end || event.start || new Date()).toISO() ??
    start;

  return {
    id,
    title,
    description,
    start,
    end,
    all_day,
    background_color,
    calendar_id,
    editable,
  };
};

// GET /plans
export type PlansResponse = ApiResponse<{ plans: CalendarPlan[] }>;
