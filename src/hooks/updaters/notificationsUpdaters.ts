import { Notification } from "@/types/notification";
import { useUpdater } from "../otherHooks";

export function useNotificationsUpdater() {
  return useUpdater<{ notifications: Notification[] }, "notifications">(
    ["notifications"],
    "notifications"
  );
}
