import { EventApi } from "@fullcalendar/core";
import { ApiResponse } from "./responseTypes";
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
  start: string; // ISO format
  end: string; // ISO format
  all_day: boolean;
  background_color: string;
  calendar_id: string;
  editable: boolean;
  html_link?: string | null;
}

export interface NewEventPlan {
  title: string;
  description?: string;
  start: string; // ISO format
  end: string; // ISO format
}

export const defaultPlan: EventPlan = {
  id: "",
  title: "",
  description: "",
  html_link: null,
  start: DateTime.now().toISO() ?? "",
  end: DateTime.now().toISO() ?? "",
  all_day: false,
  background_color: "#000000",
  calendar_id: "",
  editable: true,
};

export const convertToEventPlan = (event: EventApi): EventPlan => {
  const { id, title, startEditable } = event;
  const { description, all_day, background_color, calendar_id } =
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
    editable: startEditable,
  };
};

// GET /plans
export type PlansResponse = ApiResponse<{ plans: CalendarPlan[] }>;

// PUT /plans/plan
export type PutPlanResponse = ApiResponse<{ plan: EventPlan }>;

// PATCH /plans/plan
export type PatchPlanResponse = ApiResponse<{ plan: EventPlan }>;
