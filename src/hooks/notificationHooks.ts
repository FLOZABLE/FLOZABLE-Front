import { getNotifications } from "@/apis/notificationApi";
import { useQuery } from "@tanstack/react-query";

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
