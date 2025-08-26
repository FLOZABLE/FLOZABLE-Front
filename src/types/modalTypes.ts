import { CalendarApi } from "@fullcalendar/core";
import { Swiper } from "swiper/types";

export type JoinGroupModalState = {
  opened: boolean;
  group_id: null | string;
  myGroupsSwiper: null | Swiper;
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

export type ChatModalState = {
  chatroom_id: string | null;
  name: string;
  opened: boolean;
  totalNewMsg: number;
};

export type SearchUsersModalState = {
  opened: boolean;
};
