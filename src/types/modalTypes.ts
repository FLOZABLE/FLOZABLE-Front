import { CalendarApi } from "@fullcalendar/core";
import { Swiper } from "swiper/types";

import { Group } from "./groupTypes";
import { Theme } from "./themeTypes";

export interface DefaultModalState {
  opened: boolean;
}

export interface JoinGroupModalState extends DefaultModalState {
  group: null | Group;
  myGroupsSwiper: null | Swiper;
}

export interface PlanModalState extends DefaultModalState {
  plan_id: string | null;
  calendarApi?: CalendarApi | null;
  viewDate: Date;
  calendarSelect?: {
    start: Date;
    end: Date;
  } | null;
}

export interface ChatModalState extends DefaultModalState {
  chatroom_id: string | null;
  name: string;
  totalNewMsg: number;
}

export interface ThemeModalState extends DefaultModalState {
  theme: Theme | null;
}
