import { getPlanAll } from "@/apis/planApi";
import { CalendarPlan } from "@/types/planTypes";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import { useAccountGoogle } from "./accountHooks";
import { useUpdater } from "./otherHooks";

export function usePlans(date: Date) {
  const { accountGoogleData } = useAccountGoogle();

  const dateTime = DateTime.fromJSDate(date)
    .startOf("day")
    .startOf("month")
    .toISODate()
    ?.toString();

  const queryResult = useQuery({
    queryKey: [`plans`, dateTime],
    queryFn: () => getPlanAll(dateTime || ""),
    staleTime: 1000 * 60 * 10,
    enabled:
      !!accountGoogleData?.scopes?.some((scope) =>
        scope.includes("calendar"),
      ) && !!dateTime,
    select: (response) => response.data?.plans || [],
  });

  const {
    data: plansData,
    isLoading: plansIsLoading,
    refetch: plansRefetch,
  } = queryResult;

  const updatePlans = useUpdater<{ plans: CalendarPlan[] }, "plans">(
    ["plans", dateTime],
    "plans",
  );

  return {
    plansData,
    plansIsLoading,
    plansRefetch,
    updatePlans,
    ...queryResult,
  };
}
