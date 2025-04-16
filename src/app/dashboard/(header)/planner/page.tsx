"use client";

import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import { useEffect, useState } from "react";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createResizePlugin } from "@schedule-x/resize";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";

const eventModal = createEventModalPlugin();

export default function Planner() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useNextCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2025-04-15 17:15",
        end: "2025-04-15 20:15",
      },
    ],
    plugins: [
      eventsService,
      eventModal,
      createResizePlugin(),
      createDragAndDropPlugin(),
    ],
    callbacks: {
      onRender: () => {
        // get all events
        eventsService.getAll();
      },
      onClickDate(date) {
        console.log("date cliekd", date);
      },
      onClickDateTime(dateTime) {
        console.log("time clicked", dateTime);
      },
    },
    theme: "shadcn",
  });

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}
