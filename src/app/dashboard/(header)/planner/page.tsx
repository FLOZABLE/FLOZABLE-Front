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
import { usePlans } from "@/hooks/plansHooks";
import GoogleLoginBtn from "@/components/buttons/GoogleLoginBtn";
import { EventPlan } from "@/types/plan";
import { DateTime } from "luxon";

const eventModal = createEventModalPlugin();

export default function Planner() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const [viewDate, setViewDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const { plansData } = usePlans(viewDate);

  const [plans, setPlans] = useState<EventPlan[]>([]);

  useEffect(() => {
    if (!plansData) return;

    const plans = plansData
      .flatMap((calendar) => calendar.events)
      .map((plan) => {
        plan.start = DateTime.fromISO(plan.start).toFormat("yyyy-MM-dd HH:mm");
        plan.end = DateTime.fromISO(plan.end).toFormat("yyyy-MM-dd HH:mm");
        console.log(`!bg-[${plan.background_color}]`, "!bg-[#9a9cff]");
        plan._options = {
          additionalClasses: [`!bg-[${plan.background_color}]`],
        };
        return plan;
      });
    setPlans(plans);
  }, [plansData]);

  const calendar = useNextCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: plans,
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

  useEffect(() => {
    calendar?.events.set(plans);
    console.log("events passed to calendar", calendar?.events.getAll(), plans);
  }, [calendar, plans]);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
      <div className="bg-red-100 color-red"></div>
      <GoogleLoginBtn
        scope={"email profile https://www.googleapis.com/auth/calendar"}
        required="calendar"
      />
    </div>
  );
}
