"use client";

import { patchPlan } from "@/apis/plansApi";
import { DatePicker } from "@/components/buttons/DatePicker";
import PlanViewer from "@/components/plans/PlanViewer";
import UpcomingPlansViewer from "@/components/plans/UpcomingPlansViewer";
import { usePlanModal } from "@/components/structure/ModalProviders";
import { Button } from "@/components/ui/button";
import SelectorWrapper from "@/components/ui/select";
import { useWindowSize } from "@/hooks/otherHooks";
import { usePlans } from "@/hooks/plansHooks";
import { ViewerType } from "@/types/othersTypes";
import { convertToEventPlan, EventPlan } from "@/types/planTypes";
import newStyled from "@emotion/styled";
import {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventDropArg,
  EventInput,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  DateClickArg,
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { CalendarPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { DateTime } from "luxon";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const StyleWrapper = newStyled.div`
.fc.fc-media-screen.fc-direction-ltr.fc-theme-standard {
  height: 100%;
}

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
  font-weight: 500
}

.fc-scrollgrid tr:nth-of-type(1) .fc-timegrid-slot-label-frame  {
  display: none;
}

.fc-timegrid-slot-label {
  position: relative;
  border: 0px;
}

.fc-timegrid-slot-label-frame {
  position: absolute;
  top: 0px;
  right: 3px;
  transform: translateY(-50%);
}

.fc-event-title.fc-sticky {
  white-space:nowrap;
}
`;

const planViewerWidth = 400;

interface Position {
  top: number;
  left: number;
}

export default function Planner() {
  const [viewDate, setViewDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const [viewer, setViewer] = useState<ViewerType>("day");
  const { plansData, updatePlans } = usePlans(viewDate);

  const { setPlanModal } = usePlanModal();

  const calendarRef = useRef<FullCalendar>(null);

  const [plans, setPlans] = useState<EventInput[]>([]);

  const windowSize = useWindowSize();

  const planRef = useRef<HTMLElement | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EventPlan | null>(null);
  const [planViewerPos, setPlanViewerPos] = useState<Position>({
    top: 0,
    left: 0,
  });

  const [isPlanViewer, setIsPlanViewer] = useState(false);

  const eventElsRef = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    //prevent overwrite of setplanmodal viewdate
    setTimeout(() => {
      setPlanModal((prev) => ({ ...prev, calendarApi }));
    }, 100);

    return () => {
      setPlanModal((prev) => ({ ...prev, calendarApi: null }));
    };
  }, []);

  useEffect(() => {
    setPlanModal((prev) => ({ ...prev, viewDate }));
  }, [viewDate]);

  useEffect(() => {
    if (!plansData) return;

    const plans = plansData
      .flatMap((calendar) => calendar.events)
      .map((plan) => {
        return {
          ...plan,
          backgroundColor: plan.background_color,
          borderColor: plan.background_color,
        };
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
          : "dayGridMonth",
    );
  }, [viewer]);

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.gotoDate(viewDate);
  }, [viewDate]);

  const handleEventUpdate = useCallback(async (event: EventApi) => {
    const eventPlan = convertToEventPlan(event);
    const response = await patchPlan(eventPlan);
    const plan = response.data?.plan;

    if (!response.success || !plan) return;

    updatePlans((prev) =>
      prev.map((calendar) => {
        if (calendar.id === plan.calendar_id) {
          return {
            ...calendar,
            events: [
              ...calendar.events.filter((event) => event.id !== plan.id),
              plan,
            ],
          };
        }
        return calendar;
      }),
    );
  }, []);

  const onEventDrop = useCallback(
    (info: EventDropArg) => {
      handleEventUpdate(info.event);
    },
    [handleEventUpdate],
  );

  const onEventResize = useCallback(
    (info: EventResizeDoneArg) => {
      handleEventUpdate(info.event);
    },
    [handleEventUpdate],
  );

  const onEventClick = useCallback((info: EventClickArg) => {
    planRef.current = info.el;

    const eventPlan = convertToEventPlan(info.event);
    setSelectedPlan(eventPlan);

    setIsPlanViewer(true);
    locatePlanViewer();
  }, []);

  const onDateClick = useCallback((info: DateClickArg) => {
    console.log(info.date);
    /* const newPlan: EventPlan = {id: "new", description: "", start};
    setPlans((prev) => [...prev, {id: "new",}]); */
  }, []);

  const onDateSelect = useCallback((info: DateSelectArg) => {
    console.log(info.start, info.end);
    setPlanModal((prev) => ({
      ...prev,
      opened: true,
      plan_id: "new",
      calendarSelect: {
        start: info.start,
        end: info.end,
      },
    }));
  }, []);

  const debouncedDateSelect = useDebouncedCallback(onDateSelect, 100);

  const locatePlanViewer = useCallback(() => {
    const element = planRef.current?.getBoundingClientRect();
    if (!element) return;

    //min top set to 100
    const top = element.y > 100 ? element.y : 200;
    console.log(element.x, windowSize.width / 2);
    const left =
      element.x < windowSize.width / 2
        ? element.x + element.width
        : element.x - planViewerWidth - 10;
    setPlanViewerPos({ top, left });
  }, [windowSize.width]);

  console.log(windowSize);

  const onUpcomingPlanClick = useCallback((plan: EventInput) => {
    const api = calendarRef.current?.getApi();
    if (!api || !plan.id) return;

    const event = api.getEventById(plan.id);
    if (!event) return;

    const el = eventElsRef.current[plan.id];
    el.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    planRef.current = el;

    const eventPlan = convertToEventPlan(event);
    setSelectedPlan(eventPlan);

    setIsPlanViewer(true);

    setTimeout(() => {
      locatePlanViewer();
    }, 500);
  }, []);

  useEffect(() => {
    locatePlanViewer();
  }, [windowSize, viewer]);

  return (
    <main className="p-5">
      {/* <div className="flex mb-5">
        <h1 className="text-2xl font-semibold">Planner</h1>
      </div> */}
      <div className="flex h-screen gap-5">
        <div className="w-68 flex flex-col gap-5">
          <Button
            className="w-full"
            onClick={() => {
              const start = DateTime.now();
              const end = start.plus({ minute: 30 });
              setPlanModal((prev) => ({
                ...prev,
                plan_id: "new",
                opened: true,
                calendarSelect: {
                  start: start.toJSDate(),
                  end: end.toJSDate(),
                },
              }));
            }}>
            <CalendarPlus />
            Add Event
          </Button>
          <UpcomingPlansViewer
            plans={plans}
            viewer={viewer}
            viewDate={viewDate}
            onPlanClick={onUpcomingPlanClick}
          />
        </div>
        <div className="flex-1/2">
          <div className="flex gap-3">
            <Button
              onClick={() => {
                setViewDate(new Date(new Date().setHours(0, 0, 0, 0)));
              }}>
              Today
            </Button>
            <Button
              onClick={() => {
                const dateTime = DateTime.fromJSDate(viewDate).minus({
                  [viewer]: 1,
                });
                setViewDate(dateTime.toJSDate());
              }}>
              <ChevronLeft />
            </Button>
            <Button
              onClick={() => {
                const dateTime = DateTime.fromJSDate(viewDate).plus({
                  [viewer]: 1,
                });
                setViewDate(dateTime.toJSDate());
              }}>
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
              eventClassNames={"event"}
              editable={true}
              eventDrop={onEventDrop}
              eventResize={onEventResize}
              eventClick={onEventClick}
              dateClick={onDateClick}
              select={debouncedDateSelect}
              nowIndicator
              selectable={true}
              selectMirror={true}
              unselectAuto={false}
              dayMaxEvents={true}
              expandRows={true}
              eventDidMount={({ event, el }) => {
                eventElsRef.current[event.id] = el;
              }}
            />
            <PlanViewer
              open={isPlanViewer}
              setOpen={setIsPlanViewer}
              position={planViewerPos}
              plan={selectedPlan}
              width={planViewerWidth}
              viewDate={viewDate}
            />
          </StyleWrapper>
        </div>
      </div>
    </main>
  );
}
