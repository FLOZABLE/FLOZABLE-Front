import { getGroupMembers, getGroups } from "@/apis/groupsApi";
import { useQuery } from "@tanstack/react-query";
import { useUpdater } from "./otherHooks";
import { Group, GroupMember } from "@/types/group";

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

  const updateGroupsData = useUpdater<
    { groups: Group[]; my_groups: Group[] },
    "groups"
  >(["groups"], "groups");

  return {
    groupsData,
    groups,
    myGroups,
    groupsIsLoading,
    groupsRefetch,
    updateGroupsData,
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

  const updateGroupMembers = useUpdater<{ members: GroupMember[] }, "members">(
    ["groupMembers", groupId],
    "members"
  );

  return {
    groupMembersData,
    groupMembersIsLoading,
    updateGroupMembers,
    ...queryResult,
  };
}
