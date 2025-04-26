import { CalendarApi } from "@fullcalendar/core";

export type JoinGroupModalState = {
  opened: boolean;
  group_id: null | string;
};

export type PlanModalState = {
  opened: boolean;
  plan_id: string | null;
  calendarApi?: CalendarApi | null;
  viewDate: Date;
  calendarSelect?: {
    start: Date;
    end: Date;
  } | null;
};
