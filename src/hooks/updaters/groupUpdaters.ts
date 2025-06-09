import { Group, GroupMember } from "@/types/groupTypes";
import { useUpdater } from "../otherHooks";

export function useGroupsUpdater() {
  return useUpdater<{ groups: Group[] }, "groups">(["groups"], "groups");
}

export function useMyGroupsUpdater() {
  return useUpdater<{ groups: string[] }, "groups">(["myGroups"], "groups");
}

export function useGroupMembersUpdater(groupId: string) {
  return useUpdater<{ members: GroupMember[] }, "members">(
    ["groupMembers", groupId],
    "members"
  );
}
