import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/apis/notificationsApi";
import { useAccount } from "./accountHooks";

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

  return {
    notifications,
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
