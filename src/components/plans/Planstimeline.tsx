import { useAccountGoogle } from "@/hooks/accountHooks";
import { usePlans } from "@/hooks/plansHooks";
import { cn } from "@/lib/utils";
import { ViewerType } from "@/types/othersTypes";
import { EventInput } from "@fullcalendar/core";
import { CirclePlus } from "lucide-react";
import { DateTime } from "luxon";
import {
  ComponentProps,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import GoogleLoginButton from "../buttons/GoogleLoginButton";
import { usePlanModal } from "../structure/ModalProviders";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PlanContainer } from "./UpcomingPlansViewer";

interface PlanstimelineProps extends ComponentProps<"div"> {
  viewDate: Date;
  viewer?: ViewerType;
  closeButton?: ReactNode;
}

export default function Planstimeline({
  viewer,
  viewDate,
  className,
  closeButton,
  ...props
}: PlanstimelineProps) {
  const { accountGoogleData } = useAccountGoogle();

  const { plansData } = usePlans(viewDate);
  const { setPlanModal } = usePlanModal();

  const [filteredPlans, setFilteredPlans] = useState<EventInput[]>([]);

  useEffect(() => {
    if (!plansData) return;

    const dt = DateTime.fromJSDate(viewDate);
    let rangeStart: DateTime;
    let rangeEnd: DateTime;

    if (viewer === "day") {
      rangeStart = dt.startOf("day");
      rangeEnd = dt.endOf("day");
    } else if (viewer === "week") {
      rangeStart = dt.startOf("week");
      rangeEnd = dt.endOf("week");
    } else {
      rangeStart = dt.startOf("month");
      rangeEnd = dt.endOf("month");
    }

    const filtered = plansData
      .flatMap((calendar) => calendar.events)
      .map((plan) => ({
        ...plan,
        backgroundColor: plan.background_color,
        borderColor: plan.background_color,
      }))
      .filter((plan) => {
        const planStart = DateTime.fromISO(plan.start?.toString() || "");
        return planStart >= rangeStart && planStart <= rangeEnd;
      })
      .sort((a, b) => {
        const aStart = DateTime.fromISO(a.start?.toString() || "").toMillis();
        const bStart = DateTime.fromISO(b.start?.toString() || "").toMillis();
        return aStart - bStart;
      });

    setFilteredPlans(filtered);
  }, [plansData, viewDate, viewer]);

  const onPlanClick = useCallback((plan: EventInput) => {
    setPlanModal((prev) => ({ ...prev, opened: true, plan_id: plan.id || "" }));
  }, []);

  return (
    <Card {...props} className={cn("overflow-hidden", className)}>
      <CardHeader className="flex items-center">
        {closeButton}
        <CardTitle className="">Plans</CardTitle>
        <Badge variant={"outline"} className="ml-5">
          <p>{filteredPlans.length} Plans</p>
        </Badge>
        <Button
          variant={"outline"}
          className="ml-auto"
          onClick={() => {
            setPlanModal((prev) => ({
              ...prev,
              opened: true,
              plan_id: "new",
            }));
          }}>
          <CirclePlus /> Add Plan
        </Button>
      </CardHeader>
      <CardContent className="overflow-auto h-full">
        {accountGoogleData?.scopes?.some((scope) =>
          scope.includes("calendar"),
        ) ? (
          filteredPlans.map((plan, i) => {
            return (
              <PlanContainer onPlanClick={onPlanClick} plan={plan} key={i} />
            );
          })
        ) : (
          <div className="flex flex-col justify-center h-full gap-5">
            <p>
              {`You're not connected to Google Calendar. Please sign in to
              authorize access.`}
            </p>
            <GoogleLoginButton
              className="w-fit"
              scope={"email profile https://www.googleapis.com/auth/calendar"}
              required="calendar"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
