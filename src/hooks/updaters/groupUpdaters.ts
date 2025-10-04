import { Group, GroupMember } from "@/types/groupTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { useUpdater } from "../otherHooks";

export function useGroupUpdater() {
  const queryClient = useQueryClient();

  return useCallback(
    (groupId: string, updater: (g: Group) => Group) => {
      queryClient.setQueriesData({ queryKey: ["groups"] }, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              groups: page.data.groups.map((group: Group) =>
                group.group_id === groupId ? updater(group) : group,
              ),
            },
          })),
        };
      });
    },
    [queryClient],
  );
}

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
