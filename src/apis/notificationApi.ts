import AxiosInstance from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/utils";
import { NotificationsResponse } from "@/types/notificationTypes";

export async function getNotifications(): Promise<NotificationsResponse> {
  return requestHandler(AxiosInstance.get(`/notification/all`));
}
export async function deleteNotification(notificationId: string) {
  return requestHandler(
    AxiosInstance.delete(`/notification/${notificationId}`),
  );
}
