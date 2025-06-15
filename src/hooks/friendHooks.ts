import { getFriends, getFriendStatus, getFriendTrends } from "@/apis/friendApi";
import { useQuery } from "@tanstack/react-query";

import { useAccount } from "./accountHooks";

export function useFriends() {
  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: [`friends`],
    queryFn: getFriends,
    staleTime: 1000 * 10,
    enabled: !!account,
    select: (response) => response?.data?.friends ?? [],
  });

  const { data: friendsData } = queryResult;

  return { friendsData, ...queryResult };
}

export function useFriendsTrends() {
  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: [`friendsTrends`],
    queryFn: () => getFriendTrends(),
    staleTime: 1000 * 60,
    enabled: !!account,
    select: (response) => response?.data?.trends || [],
  });

  const {
    data: friendsTrendData,
    isLoading: friendsTrendsIsLoading,
    refetch: friendsTrendRefetch,
    error: friendsTrendError,
  } = queryResult;

  return {
    ...queryResult,
    friendsTrendData,
    friendsTrendsIsLoading,
    friendsTrendError,
    friendsTrendRefetch,
  };
}

export function useFriendsStatus() {
  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: [`friendsStatus`],
    queryFn: getFriendStatus,
    staleTime: 60 * 30 * 1000,
    enabled: !!account,
    select: (response) => response?.data?.friends ?? [],
  });

  const {
    data: friendsStatus,
    isLoading: friendsStatusIsLoading,
    error: friendsStatusError,
    refetch: friendsStatusRefetch,
  } = queryResult;

  return {
    ...queryResult,
    friendsStatus,
    friendsStatusError: account ? friendsStatusError : true,
    friendsStatusIsLoading,
    friendsStatusRefetch,
  };
}
