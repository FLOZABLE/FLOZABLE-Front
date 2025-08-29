import AxiosInstance from "@/lib/axiosInstance";
import { getTimezone, requestHandler } from "@/lib/utils";
import { PutGroupSchemaValues } from "@/schemas/groupSchemas";
import {
  AllGroupsResponse,
  GroupMembersResponse,
  MyGroupsResponse,
  PostGroupJoin,
  PutGroupResponse,
} from "@/types/groupTypes";

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
  groupId: string,
): Promise<GroupMembersResponse> {
  return requestHandler(
    AxiosInstance.get(`/group/${groupId}/members`, {
      params: {
        timezone: getTimezone(),
      },
    }),
  );
}

// POST /group/like – Like or unlike a group
export async function postGroupLike(groupId: string, like: boolean) {
  return requestHandler(
    AxiosInstance.post(`/group/${groupId}/like`, {
      like,
    }),
  );
}

// POST /group/join – Join a group with optional password
export async function postGroupJoin(
  groupId: string,
  password?: string,
): Promise<PostGroupJoin> {
  return requestHandler(
    AxiosInstance.post(`/group/${groupId}/join`, {
      password,
      timezone: getTimezone(),
    }),
  );
}

// POST /group/leave – Leave a group
export async function postGroupLeave(groupId: string) {
  return requestHandler(AxiosInstance.post(`/group/${groupId}/leave`));
}

// PUT /group – Create a group
export async function putGroup(
  newGroup: PutGroupSchemaValues,
): Promise<PutGroupResponse> {
  return requestHandler(AxiosInstance.put("/group", newGroup));
}
