import { getGroupMembers, getGroups } from "@/apis/groupsApi";
import { useQuery } from "@tanstack/react-query";

export function useGroups() {
  const queryResult = useQuery({
    queryKey: [`groups`],
    queryFn: getGroups,
    staleTime: 1000 * 60 * 5,
    select: (response) => ({
      groups: response.data?.groups ?? [],
      my_groups: response.data?.my_groups ?? [],
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
  const myGroups = groupsData?.my_groups;

  return {
    groupsData,
    groups,
    myGroups,
    groupsIsLoading,
    groupsRefetch,
    ...queryResult,
  };
}

export function useGroupMembers(groupId: string, isActive: boolean) {
  const queryResult = useQuery({
    queryKey: [`groupMembers`, groupId],
    queryFn: () => getGroupMembers(groupId),
    staleTime: 1000 * 10 * 60,
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
