import { getPlans } from "@/apis/plansApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "./accountHooks";
import { DateTime } from "luxon";
import { useCallback } from "react";
import { updateQueryData } from "@/utils/tools";
import { useUpdater } from "./otherHooks";
import { CalendarPlan, EventPlan } from "@/types/plan";

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
/* 
function usePlansGoogle(date) {
  const { account } = useAccount();

  const dateTime = DateTime.fromJSDate(date)
    .startOf("day")
    .startOf("month")
    .toISODate();

  const queryResult = useQuery({
    queryKey: [`usePlansGoogle`, dateTime],
    queryFn: () => getPlansGoogle(dateTime),
    staleTime: 1000 * 60 * 10,
    enabled: !!account && !!dateTime,
    select: (response) => {
      if (!response?.data?.plans) {
        return [];
      }

      const plans = [...response.data.plans].map((plan) => {
        plan.start = new Date(plan.start);
        plan.end = new Date(plan.end);
        return plan;
      });
      return plans;
    },
    placeholderData: [],
  });

  const {
    data: plansGoogleData,
    isLoading: plansGoogleIsLoading,
    refetch: plansGoogleRefetch,
  } = queryResult;

  return {
    plansGoogleData,
    plansGoogleIsLoading,
    plansGoogleRefetch,
    ...queryResult,
  };
}

function usePlanUsers({ plan_id, isEditable, type }) {
  const queryClient = useQueryClient();

  const queryResult = useQuery({
    queryKey: [`usePlanUsers`, plan_id],
    queryFn: () => getPlansPlanUsers(plan_id),
    staleTime: 1000 * 60 * 10,
    enabled:
      !!plan_id && plan_id !== "0000000000" && isEditable && type !== "google",
    select: (response) => response?.data?.users || [],
    placeholderData: [],
  });

  const clearPlanUsers = useCallback((planId) => {
    queryClient.removeQueries({ queryKey: ["usePlanUsers", planId] });
  }, []);

  const { data: planUsers, isLoading: planUsersIsLoading } = queryResult;

  const updatePlanUsers = useCallback(async (planId, newData) => {
    await queryClient.setQueryData(["usePlanUsers", planId], (oldData) => {
      return updateQueryData(oldData, newData, "users");
    });
  }, []);

  return {
    planUsers,
    planUsersIsLoading,
    clearPlanUsers,
    updatePlanUsers,
    ...queryResult,
  };
}

export { usePlans, usePlansGoogle, usePlanUsers };
 */
