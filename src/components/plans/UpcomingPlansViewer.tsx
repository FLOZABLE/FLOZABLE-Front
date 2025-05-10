import { EventInput } from "@fullcalendar/core";
import { Badge } from "../ui/badge";
import { ViewerType } from "@/types/others";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { Clock } from "lucide-react";
import { useAccountGoogle } from "@/hooks/accountHooks";
import GoogleLoginBtn from "../buttons/GoogleLoginBtn";

interface PlanContainerProps extends React.HTMLProps<HTMLDivElement> {
  plan: EventInput;
  onPlanClick?: (plan: EventInput) => void;
}

export function PlanContainer({ plan, onPlanClick }: PlanContainerProps) {
  const dispTime = DateTime.fromISO(
    plan.start?.toString() || ""
  ).toLocaleString({
    month: "short", // e.g., "Mar"
    day: "numeric", // e.g., "7"
    year: "numeric", // e.g., "2025"
    hour: "numeric", // e.g., "4"
    minute: "2-digit", // e.g., "00"
    hour12: true, // AM/PM format
  });
  return (
    <div
      className="flex p-4 gap-2 border-b-2 hover:bg-muted transition-colors duration-200 cursor-pointer"
      onClick={() => {
        onPlanClick?.(plan);
      }}
    >
      <span
        className={`rounded-4xl w-5 h-5 shrink-0`}
        style={{ backgroundColor: plan.backgroundColor }}
      ></span>
      <div className="overflow-hidden">
        <p className="truncate">{plan.title}</p>
        <span className="flex gap-1 items-center">
          <Clock size={15} />
          <p className="whitespace-nowrap text-secondary-foreground text-sm">
            {dispTime}
          </p>
        </span>
      </div>
    </div>
  );
}

interface UpcomingPlansViewerProps extends React.HTMLProps<HTMLDivElement> {
  plans: EventInput[];
  viewer: ViewerType;
  viewDate: Date;
  onPlanClick?: (plan: EventInput) => void;
}

export default function UpcomingPlansViewer({
  plans,
  viewer,
  viewDate,
  onPlanClick,
}: UpcomingPlansViewerProps) {
  const { accountGoogleData } = useAccountGoogle();

  const filteredPlans = useMemo(() => {
    const dt = DateTime.fromJSDate(viewDate);
    let rangeStart: DateTime;
    let rangeEnd: DateTime;

    if (viewer === "day") {
      rangeStart = dt.startOf("day");
      rangeEnd = dt.endOf("day");
    } else if (viewer === "week") {
      const weekday = dt.weekday; // 1 = Monday, 7 = Sunday
      const startOfWeek = dt.minus({ days: weekday % 7 }); // back to Sunday
      rangeStart = startOfWeek.startOf("day");
      rangeEnd = startOfWeek.plus({ days: 6 }).endOf("day"); // Saturday end
    } else {
      rangeStart = dt.startOf("month");
      rangeEnd = dt.endOf("month");
    }

    return plans
      .filter((plan) => {
        const planStart = DateTime.fromISO(plan.start?.toString() || "");
        return planStart >= rangeStart && planStart <= rangeEnd;
      })
      .sort((a, b) => {
        const aStart = DateTime.fromISO(a.start?.toString() || "").toMillis();
        const bStart = DateTime.fromISO(b.start?.toString() || "").toMillis();
        return aStart - bStart;
      });
  }, [plans, viewer, viewDate]);

  return (
    <div className="overflow-auto">
      <div className="flex gap-5 mb-5">
        <h3 className="text-lg">Upcoming Events</h3>
        <Badge variant={"outline"}>
          <p>{filteredPlans.length} Events</p>
        </Badge>
      </div>
      {accountGoogleData?.scopes?.some((scope) =>
        scope.includes("calendar")
      ) ? (
        <div className="rounded-md border-2">
          {filteredPlans.map((plan, i) => {
            return (
              <PlanContainer key={i} plan={plan} onPlanClick={onPlanClick} />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-center gap-5">
          <p>
            {`You're not connected to Google Calendar. Please sign in to
              authorize access.`}
          </p>
          <GoogleLoginBtn
            className="w-fit"
            scope={"email profile https://www.googleapis.com/auth/calendar"}
            required="calendar"
          />
        </div>
      )}
    </div>
  );
}
