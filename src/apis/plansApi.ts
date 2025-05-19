import {
  EventPlan,
  NewEventPlan,
  PatchPlanResponse,
  PlansResponse,
  PutPlanResponse,
} from "@/types/plan";
import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

export async function getPlans(date: string): Promise<PlansResponse> {
  return requestHandler(AxiosInstance.get(`/plans`, { params: { date } }));
}

export async function patchPlan(plan: EventPlan): Promise<PatchPlanResponse> {
  return requestHandler(AxiosInstance.patch(`/plans/plan`, { plan }));
}

export async function putPlan(plan: NewEventPlan): Promise<PutPlanResponse> {
  return requestHandler(AxiosInstance.put(`/plans/plan`, { plan }));
}

export async function deletePlan(calendarId: string, planId: string) {
  return requestHandler(
    AxiosInstance.delete(`/plans/plan`, {
      data: {
        calendar_id: calendarId,
        plan_id: planId,
      },
    })
  );
}
/* 
async function getPlansGoogle(date) {
  return requestHandler(
    AxiosInstance.get(`/plans/google`, { params: { date } })
  );
}

async function patchPlan(planModal) {
  const start = Math.floor(planModal.start.getTime() );
  const end = Math.floor(planModal.end.getTime() / 1000);
  const completed = planModal.completed ? 1 : 0;
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.patch(`/plans/plan`, {
      ...planModal,
      start,
      end,
      completed,
      timezone,
    })
  );
}

async function patchPlanGoogle(planModal) {
  const start = DateTime.fromJSDate(planModal.start).toISO();
  const end = DateTime.fromJSDate(planModal.end).toISO();
  const completed = planModal.completed ? 1 : 0;
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.patch(`/plans/plan/google`, {
      ...planModal,
      start,
      end,
      completed,
      timezone,
    })
  );
}

async function deletePlan(planId) {
  return requestHandler(
    AxiosInstance.delete(`/plans/plan`, {
      data: {
        plan_id: planId,
      },
    })
  );
}

async function patchPlanStatus(planId, completed) {
  return requestHandler(
    AxiosInstance.patch(`/plans/plan/status`, {
      plan_id: planId,
      completed: completed ? 0 : 1,
    })
  );
}

async function postPlanShare(users, planId) {
  return requestHandler(
    AxiosInstance.post(`/plans/plan/share`, {
      users,
      plan_id: planId,
    })
  );
}

async function postPlanShareRespond(notificationId, accepted) {
  return requestHandler(
    AxiosInstance.post(`/plans/plan/share/respond`, {
      notification_id: notificationId,
      accepted,
    })
  );
}

async function deletePlanShare(targetId, planId) {
  return requestHandler(
    AxiosInstance.delete(`/plans/plan/share`, {
      data: { target_id: targetId, plan_id: planId },
    })
  );
}

async function getPlansPlanUsers(planId) {
  return requestHandler(
    AxiosInstance.get(`/plans/plan/users`, {
      params: { plan_id: planId },
    })
  );
}

export {
  getPlans,
  getPlansGoogle,
  patchPlan,
  patchPlanGoogle,
  deletePlan,
  patchPlanStatus,
  postPlanShare,
  postPlanShareRespond,
  deletePlanShare,
  getPlansPlanUsers,
};
 */
