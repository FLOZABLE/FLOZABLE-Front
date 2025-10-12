import AxiosInstance from "@/lib/axiosInstance";
import { getTimezone, requestHandler } from "@/lib/utils";
import { PutGroupSchemaValues } from "@/schemas/groupSchemas";
import {
  AllGroupsResponse,
  GroupLeaderboardResponse,
  GroupMembersResponse,
  GroupResponse,
  GroupsResponse,
  MyGroupsResponse,
  PostGroupJoin,
  PutGroupResponse,
} from "@/types/groupTypes";
import { DateTime } from "luxon";

// GET /group/:group_id– Get group
export async function getGroup(groupId: string): Promise<GroupResponse> {
  return requestHandler(AxiosInstance.get(`/group/${groupId}`));
}

// GET /group/all – Get all public groups using search - depcrecated
export async function getGroupAll(): Promise<AllGroupsResponse> {
  return requestHandler(AxiosInstance.get("/group/all"));
}

// GET /group/search
export async function getGroups(
  query: string,
  offset: number,
): Promise<GroupsResponse> {
  return requestHandler(
    AxiosInstance.get("/group/search", {
      params: {
        query,
        offset,
      },
    }),
  );
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

// GET /group/members – Get members of a specific group
export async function getGroupLeaderboard(
  groupId: string,
  viewDate: Date,
): Promise<GroupLeaderboardResponse> {
  const date = DateTime.fromJSDate(viewDate).toISODate();
  return requestHandler(
    AxiosInstance.get(`/group/${groupId}/leaderboard`, {
      params: {
        timezone: getTimezone(),
        date,
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
