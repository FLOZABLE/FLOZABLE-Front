import { Group, GroupMember } from "@/types/group";
import { useUpdater } from "../otherHooks";

export function useGroupsUpdater() {
  return useUpdater<{ groups: Group[]; my_groups: Group[] }, "groups">(
    ["groups"],
    "groups"
  );
}

export function useMyGroupsUpdater() {
  return useUpdater<{ groups: Group[]; my_groups: Group[] }, "my_groups">(
    ["groups"],
    "my_groups"
  );
}

export function useGroupMembersUpdater(groupId: string) {
  return useUpdater<{ members: GroupMember[] }, "members">(
    ["groupMembers", groupId],
    "members"
  );
}
