import AxiosInstance from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/utils";
import { NotificationsResponse } from "@/types/notificationTypes";

async function getNotifications(): Promise<NotificationsResponse> {
  return requestHandler(AxiosInstance.get(`/notification/all`));
}

async function postNotificationsSubscribe(endpoint: string, keys: string[]) {
  return requestHandler(
    AxiosInstance.get(`/notifications/subscribe`, {
      params: { endpoint, keys },
    }),
  );
}

async function deleteNotification(notificationId: string) {
  return requestHandler(
    AxiosInstance.delete(`/notifications/notification`, {
      data: { notification_id: notificationId },
    }),
  );
}

export { getNotifications, postNotificationsSubscribe, deleteNotification };
