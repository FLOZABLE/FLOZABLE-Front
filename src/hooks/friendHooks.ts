import {
  getFriends,
  getFriendStatus,
  getFriendTrends,
  searchFriends,
} from "@/apis/friendApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useFriendSearch(query: string) {
  const queryResult = useQuery({
    queryKey: [`friendSearch`, query],
    queryFn: () => searchFriends(query),
    select: (response) => response?.data?.users ?? [],
    enabled: query.length >= 2,
    staleTime: 1000 * 10,
  });

  const { data: friendsData } = queryResult;

  return { friendsSearchData: friendsData, ...queryResult };
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
  const queryClient = useQueryClient();

  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: [`friendsStatus`],
    queryFn: async () => {
      const response = await getFriendStatus();

      response?.data?.friends.forEach((friend) => {
        if (friend.active_group) {
          queryClient.setQueryData(["group", friend.active_group.group_id], {
            success: true,
            data: { group: friend.active_group },
          });
        }
      });

      return response;
    },
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
