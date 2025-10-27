import { Group, GroupMember } from "@/types/groupTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { useUpdater } from "../otherHooks";


//deprecated
/* export function useGroupUpdater() {
  const queryClient = useQueryClient();

  return useCallback(
    (groupId: string, updater: (g: Group) => Group) => {
      let updatedGroup: Group | undefined;
      queryClient.setQueriesData({ queryKey: ["groups"] }, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              groups: page.data.groups.map((group: Group) => {
                if (group.group_id === groupId) {
                  const newGroup = updater(group);
                  updatedGroup = newGroup;
                  return newGroup;
                }
                return group;
              }),
            },
          })),
        };
      });
      return updatedGroup;
    },
    [queryClient],
  );
} */

export function useGroupsCacheRemover() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["groups"],
      exact: false,
    });
  }, []);
}

export function useMyGroupsUpdater() {
  return useUpdater<{ groups: Group[] }, "groups">(["myGroups"], "groups");
}

export function useGroupMembersUpdater(groupId: string) {
  return useUpdater<{ members: GroupMember[] }, "members">(
    ["groupMembers", groupId],
    "members",
  );
}
