import {
  AllGroupsResponse,
  MyGroupsResponse,
  GroupMembersResponse,
} from "@/types/groupTypes";
import AxiosInstance from "@/lib/axiosInstance";
import { getTimezone, requestHandler } from "@/lib/utils";

// GET /group/all – Get all public groups
export async function getGroupAll(): Promise<AllGroupsResponse> {
  return requestHandler(AxiosInstance.get("/group/all"));
}

// GET /group/mine – Get group IDs the user is in
export async function getGroupMine(): Promise<MyGroupsResponse> {
  return requestHandler(AxiosInstance.get("/group/mine"));
}

// GET /group/members – Get members of a specific group
export async function getGroupMembers(
  groupId: string
): Promise<GroupMembersResponse> {
  return requestHandler(
    AxiosInstance.get("/group/members", {
      params: {
        group_id: groupId,
        timezone: getTimezone(),
      },
    })
  );
}

// POST /group/like – Like or unlike a group
export async function postGroupLike(groupId: string, like: boolean) {
  return requestHandler(
    AxiosInstance.post("/group/like", {
      group_id: groupId,
      like,
    })
  );
}

// POST /group/join – Join a group with optional password
export async function postGroupJoin(groupId: string, password?: string) {
  return requestHandler(
    AxiosInstance.post("/group/join", {
      group_id: groupId,
      password,
    })
  );
}

// POST /group/leave – Leave a group
export async function postGroupLeave(groupId: string) {
  return requestHandler(
    AxiosInstance.post("/group/leave", {
      group_id: groupId,
    })
  );
}
