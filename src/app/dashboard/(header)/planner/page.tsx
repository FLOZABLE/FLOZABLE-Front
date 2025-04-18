"use client";

import { useEffect, useRef, useState } from "react";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { usePlans } from "@/hooks/plansHooks";
import { EventPlan } from "@/types/plan";
import { DateTime } from "luxon";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ViewerType } from "@/types/others";
import { DatePicker } from "@/components/buttons/DatePicker";
import SelectorWrapper from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import newStyled from "@emotion/styled";


const StyleWrapper = newStyled.div`
.fc-col-header {
  border-radius: 16px !important;
}

.fc-scrollgrid-section > td {
  border-radius: 0px 0px 16px 16px !important;
}

.fc-scrollgrid-section > th {
  border-radius: 0px 16px 0px 0px !important;
}

.fc-scrollgrid {
  border-radius: 16px !important;
}
`;

export default function Planner() {
  const [viewDate, setViewDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, setViewer] = useState<ViewerType>("day");
  const { plansData } = usePlans(viewDate);

  const calendarRef = useRef<FullCalendar>(null);

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

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.changeView(
      viewer === "day"
        ? "timeGridDay"
        : viewer === "week"
        ? "timeGridWeek"
        : "dayGridMonth"
    );
  }, [viewer]);

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.gotoDate(viewDate);
  }, [viewDate]);

  return (
    <main className="p-5">
      {/* <div className="flex mb-5">
        <h1 className="text-2xl font-semibold">Planner</h1>
      </div> */}
      <div className="flex h-screen gap-5">
        <div className="w-68 flex flex-col gap-5">
          <Button className="w-full">
            <CalendarPlus />
            Add Event
          </Button>
          <div className="flex gap-5">
            <p>Upcoming Events</p>
            <Badge variant={"outline"}>
              <p>15 Events</p>
            </Badge>
          </div>
          <div className="rounded-md border-2">
            <p>dd</p>
          </div>
        </div>
        <div className="flex-1/2">
          <div className="flex gap-3">
            <Button
              onClick={() => {
                setViewDate(new Date(new Date().setHours(0, 0, 0, 0)));
              }}
            >
              Today
            </Button>
            <Button
              onClick={() => {
                const dateTime = DateTime.fromJSDate(viewDate)
                  .startOf(viewer)
                  .minus({ [viewer]: 1 });
                setViewDate(dateTime.toJSDate());
              }}
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={() => {
                const dateTime = DateTime.fromJSDate(viewDate)
                  .startOf(viewer)
                  .plus({ [viewer]: 1 });
                setViewDate(dateTime.toJSDate());
              }}
            >
              <ChevronRight />
            </Button>
            <DatePicker
              viewDate={viewDate}
              setViewDate={setViewDate}
              viewer={viewer}
            />
            <SelectorWrapper
              value={viewer}
              onChange={(viewer: ViewerType) => {
                setViewer(viewer);
              }}
              options={[
                { value: "day", label: "Day" },
                { value: "week", label: "Week" },
                { value: "month", label: "Month" },
              ]}
            />
          </div>
          <StyleWrapper className="h-full w-full">
            <FullCalendar
              ref={calendarRef}
              events={plans}
              slotLabelFormat={{
                hour: "numeric",
                hour12: true,
              }}
              headerToolbar={{ left: "", right: "", center: "" }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={
                viewer === "day"
                  ? "timeGridDay"
                  : viewer === "week"
                  ? "timeGridWeek"
                  : "dayGridMonth"
              }
              editable={true}
            />
          </StyleWrapper>
        </div>
      </div>
    </main>
  );
}
