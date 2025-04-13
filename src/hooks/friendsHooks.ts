import {
  getFriends,
  getFriendsRecommended,
  getFriendsSearch,
  getFriendsStatus,
  getFriendsTrends,
} from "@/apis/friendsApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "./accountHooks";
import { useCallback } from "react";
import { updateQueryData } from "@/utils/tools";
import {
  Friend,
  FriendsResponse,
  FriendsStatusResponse,
  FriendStatus,
} from "@/types/friend";

function useFriends() {
  const queryClient = useQueryClient();

  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: [`friends`],
    queryFn: getFriends,
    staleTime: 1000 * 10,
    enabled: !!account,
    select: (response) => response?.data?.friends || [],
  });

  const { data: friendsData } = queryResult;

  const updateFriendsData = useCallback(
    async (newData: Friend[] | ((oldValue: Friend[]) => Friend[])) => {
      await queryClient.setQueryData(
        ["friends"],
        (oldData: FriendsResponse | undefined) => {
          if (!oldData) return oldData;
          return updateQueryData(oldData, newData, "friends");
        }
      );
    },
    [queryClient]
  );

  return { friendsData, updateFriendsData, ...queryResult };
}

function useFriendsSearch(searchQuery: string) {
  const queryResult = useQuery({
    queryKey: [`getFriendsSearch`, searchQuery],
    queryFn: () => getFriendsSearch(searchQuery),
    staleTime: 1000 * 10,
    retryDelay: 1000 * 3,
    enabled: searchQuery?.length >= 2,
    select: (response) => response?.data?.users || [],
  });

  const {
    data: friendsSearchData,
    isLoading: friendsSearchIsLoading,
    error: friendsSearchError,
  } = queryResult;

  return {
    friendsSearchData,
    friendsSearchIsLoading,
    friendsSearchError,
    ...queryResult,
  };
}

function useFriendsTrends() {
  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: [`getFriendsTrends`],
    queryFn: () => getFriendsTrends(),
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

function useFriendsRecommended() {
  const queryResult = useQuery({
    queryKey: [`friendsRecommended`],
    queryFn: getFriendsRecommended,
    select: (response) => response?.data?.users,
  });

  const {
    data: friendsRecommendedData,
    isLoading: friendsRecommendedIsLoading,
    refetch: friendsRecommendedRefetch,
  } = queryResult;

  return {
    friendsRecommendedData,
    friendsRecommendedIsLoading,
    friendsRecommendedRefetch,
    ...queryResult,
  };
}

function useFriendsStatus() {
  const queryClient = useQueryClient();
  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: [`friendsStatus`],
    queryFn: getFriendsStatus,
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

  const updateFriendsStatus = useCallback(
    async (
      newData: FriendStatus[] | ((oldValue: FriendStatus[]) => FriendStatus[])
    ) => {
      await queryClient.setQueryData(
        ["friendsStatus"],
        (oldData: FriendsStatusResponse | undefined) => {
          if (!oldData) return oldData;
          return updateQueryData(oldData, newData, "friends");
        }
      );
    },
    [queryClient]
  );

  return {
    ...queryResult,
    friendsStatus,
    friendsStatusError: account ? friendsStatusError : true,
    friendsStatusIsLoading,
    updateFriendsStatus,
    friendsStatusRefetch,
  };
}

export {
  useFriends,
  useFriendsSearch,
  useFriendsTrends,
  useFriendsRecommended,
  useFriendsStatus,
};
