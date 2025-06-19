import AxiosInstance from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/utils";
import {
  EventPlan,
  NewEventPlan,
  PatchPlanResponse,
  PlanAllResponse,
  PutPlanResponse,
} from "@/types/planTypes";

export async function getPlanAll(date: string): Promise<PlanAllResponse> {
  return requestHandler(AxiosInstance.get(`/plan/all`, { params: { date } }));
}

export async function patchPlan(plan: EventPlan): Promise<PatchPlanResponse> {
  return requestHandler(AxiosInstance.patch(`/plan/${plan.id}`, { plan }));
}

export async function putPlan(plan: NewEventPlan): Promise<PutPlanResponse> {
  return requestHandler(AxiosInstance.put(`/plan`, { plan }));
}

export async function deletePlan(calendarId: string, planId: string) {
  return requestHandler(
    AxiosInstance.delete(`/plan/${planId}`, {
      data: {
        calendar_id: calendarId,
      },
    }),
  );
}
