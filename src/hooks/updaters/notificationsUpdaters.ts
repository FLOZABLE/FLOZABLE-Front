import { Notification } from "@/types/notificationTypes";
import { useUpdater } from "../otherHooks";

export function useNotificationsUpdater() {
  return useUpdater<{ notifications: Notification[] }, "notifications">(
    ["notifications"],
    "notifications"
  );
}
