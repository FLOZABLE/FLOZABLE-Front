import { getGroupAll, getGroupMembers, getGroupMine } from "@/apis/groupApi";
import { useQuery } from "@tanstack/react-query";

import { useAccount } from "./accountHooks";

export function useGroups(searchQuery?: string) {
  const queryResult = useQuery({
    queryKey: [`groups`],
    queryFn: getGroupAll,
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
  });

  const {
    data: groupsData,
    isLoading: groupsIsLoading,
    refetch: groupsRefetch,
  } = queryResult;

  const groups = groupsData?.groups;

  return {
    groupsData,
    groups,
    groupsIsLoading,
    groupsRefetch,
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
