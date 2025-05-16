import { getPlans } from "@/apis/plansApi";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "./accountHooks";
import { DateTime } from "luxon";
import { useUpdater } from "./otherHooks";
import { CalendarPlan } from "@/types/plan";

export function usePlans(date: Date) {
  const { account } = useAccount();

  const dateTime = DateTime.fromJSDate(date)
    .startOf("day")
    .startOf("month")
    .toISODate()
    ?.toString();

  const queryResult = useQuery({
    queryKey: [`plans`, dateTime],
    queryFn: () => getPlans(dateTime || ""),
    staleTime: 1000 * 60 * 10,
    enabled: !!account && !!dateTime,
    select: (response) => response.data?.plans || [],
  });

  const {
    data: plansData,
    isLoading: plansIsLoading,
    refetch: plansRefetch,
  } = queryResult;

  const updatePlans = useUpdater<{ plans: CalendarPlan[] }, "plans">(
    ["plans", dateTime],
    "plans"
  );

  return {
    plansData,
    plansIsLoading,
    plansRefetch,
    updatePlans,
    ...queryResult,
  };
}
