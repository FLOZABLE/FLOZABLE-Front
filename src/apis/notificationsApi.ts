import { NotificationsResponse } from "@/types/notification";
import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

async function getNotifications(): Promise<NotificationsResponse> {
  return requestHandler(AxiosInstance.get(`/notifications`));
}

async function getVapidKeys() {
  return requestHandler(AxiosInstance.get(`/notifications/vapidkeys`));
}

async function postNotificationsSubscribe(endpoint: string, keys: string[]) {
  return requestHandler(
    AxiosInstance.get(`/notifications/subscribe`, {
      params: { endpoint, keys },
    })
  );
}

async function deleteNotification(notificationId: string) {
  return requestHandler(
    AxiosInstance.delete(`/notifications/notification`, {
      data: { notification_id: notificationId },
    })
  );
}

export {
  getNotifications,
  getVapidKeys,
  postNotificationsSubscribe,
  deleteNotification,
};
