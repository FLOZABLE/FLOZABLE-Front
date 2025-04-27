import { GroupMembersResponse, GroupsResponse } from "@/types/group";
import AxiosInstance from "@/utils/axiosInstance";
import { getTimezone, requestHandler } from "@/utils/tools";

export async function getGroups(): Promise<GroupsResponse> {
  return requestHandler(AxiosInstance.get(`/groups`));
}

export async function getGroupMembers(
  groupId: string
): Promise<GroupMembersResponse> {
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.get(`/groups/group/members`, {
      params: {
        group_id: groupId,
        timezone,
      },
    })
  );
}

export async function postGroupLike(groupId: string, like: boolean) {
  return requestHandler(
    AxiosInstance.post(`/groups/group/like`, {
      group_id: groupId,
      like,
    })
  );
}

export async function postGroupJoin(
  groupId: string,
  password: string | undefined
) {
  return requestHandler(
    AxiosInstance.post(`/groups/group/join`, {
      group_id: groupId,
      password,
    })
  );
}
/* 
async function getGroupMembers(groupId) {
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.get(`/groups/group/members`, {
      params: {
        group_id: groupId,
        timezone,
      },
    })
  );
}

async function putGroup(newGroup) {
  return requestHandler(AxiosInstance.put(`/groups/group`, newGroup));
}

async function patchGroup(newGroup) {
  return requestHandler(AxiosInstance.patch(`/groups/group`, newGroup));
}

async function deleteGroup(groupId) {
  return requestHandler(
    AxiosInstance.delete(`/groups/group`, {
      data: { group_id: groupId },
    })
  );
}

async function postGroupJoin(groupId, password) {
  return requestHandler(
    AxiosInstance.post(`/groups/group/join`, {
      group_id: groupId,
      password,
    })
  );
}

async function postGroupLeave(groupId) {
  return requestHandler(
    AxiosInstance.post(`/groups/group/leave`, {
      group_id: groupId,
    })
  );
}

async function postGroupLike({ groupId, like }) {
  return requestHandler(
    AxiosInstance.post(`/groups/group/like`, {
      group_id: groupId,
      like,
    })
  );
}

export {
  getGroups,
  getGroupMembers,
  putGroup,
  patchGroup,
  deleteGroup,
  postGroupJoin,
  postGroupLeave,
  postGroupLike,
};
 */
