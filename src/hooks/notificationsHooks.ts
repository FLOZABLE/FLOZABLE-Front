import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/apis/notificationsApi";
import { useCallback } from "react";
import { useAccount } from "./accountHooks";
import { useUpdater } from "./otherHooks";
import { Notification } from "@/types/notification";

export function useNotifications() {
  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    staleTime: 1000 * 60 * 60,
    select: (response) => response?.data?.notifications,
    enabled: !!account,
  });

  const { data: notifications } = queryResult;

  const updateNotifications = useUpdater<
    { notifications: Notification[] },
    "notifications"
  >(["notifications"], "notifications");

  const filterNotification = useCallback((notificationId: string) => {
    updateNotifications((prev) => {
      return prev.filter(
        (notification) => notification.notification_id !== notificationId
      );
    });
  }, []);

  return {
    notifications,
    updateNotifications,
    filterNotification,
    ...queryResult,
  };
}

/* function useVapidKeys() {
  const queryResult = useQuery({
    queryKey: [`vapidKeys`],
    queryFn: getVapidKeys,
    staleTime: 1000 * 60 * 60,
  });

  const { data: vapidKeysData } = queryResult;

  return {
    vapidKeysData,
    ...queryResult,
  };
} */
