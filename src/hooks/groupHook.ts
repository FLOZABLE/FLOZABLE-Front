import {
  getGroup,
  getGroupMembers,
  getGroupMine,
  getGroups,
} from "@/apis/groupApi";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { useAccount } from "./accountHooks";

const groupsLength = 30;

export function useGroups(searchQuery: string) {
  const queryResult = useInfiniteQuery({
    queryKey: [`groups`, searchQuery],
    queryFn: ({ pageParam }) => getGroups(searchQuery, pageParam),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.data?.groups.length === groupsLength
          ? allPages.length * groupsLength
          : undefined;
      return nextPage;
    },
  });

  const {
    data: groupsData,
    isLoading: groupsIsLoading,
    refetch: groupsRefetch,
  } = queryResult;

  return {
    groupsData,
    groupsIsLoading,
    groupsRefetch,
    ...queryResult,
  };
}

export function useGroup(groupId: string | undefined | null) {
  const queryResult = useQuery({
    queryKey: [`group`, groupId],
    queryFn: () => getGroup(groupId!),
    staleTime: 1000 * 60 * 5,
    select: (response) => response.data?.group,
    enabled: !!groupId,
  });

  const {
    data: groupData,
    isLoading: groupIsLoading,
    refetch: groupRefetch,
  } = queryResult;

  return {
    groupData,
    groupIsLoading,
    groupRefetch,
    ...queryResult,
  };
}

export function useMyGroups() {
  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: [`myGroups`],
    queryFn: getGroupMine,
    staleTime: 1000 * 60 * 5,
    select: (response) => ({
      groups: response.data?.groups ?? [],
    }),
    placeholderData: () => ({
      data: {
        groups: [],
        my_groups: [],
      },
      status: 200,
      success: true,
    }),
    enabled: !!account?.user_id,
  });

  const {
    data: myGroupsData,
    isLoading: myGroupsIsLoading,
    refetch: myGroupsRefetch,
  } = queryResult;

  const myGroups = myGroupsData?.groups;

  return {
    myGroups,
    myGroupsData,
    myGroupsIsLoading,
    myGroupsRefetch,
    ...queryResult,
  };
}

export function useGroupMembers(groupId: string, isActive: boolean) {
  const queryResult = useQuery({
    queryKey: [`groupMembers`, groupId],
    queryFn: () => getGroupMembers(groupId),
    staleTime: 1000 * 10,
    enabled: !!groupId && !!isActive,
    select: (response) => response?.data?.members ?? [],
    placeholderData: () => ({
      data: {
        members: [],
      },
      status: 200,
      success: true,
    }),
  });

  const { data: groupMembersData, isLoading: groupMembersIsLoading } =
    queryResult;

  return {
    groupMembersData,
    groupMembersIsLoading,
    ...queryResult,
  };
}
