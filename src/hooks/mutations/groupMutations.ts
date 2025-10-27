import {
  postGroupJoin,
  postGroupLeave,
  postGroupLike,
  putGroup,
} from "@/apis/groupApi";
import { PutGroupSchemaValues } from "@/schemas/groupSchemas";
import { Group, GroupResponse } from "@/types/groupTypes";
import { ApiResponse } from "@/types/responseTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAccount } from "../accountHooks";
import { useChatRooms } from "../chatHooks";
import {
  useGroupsCacheRemover,
  useMyGroupsUpdater,
} from "../updaters/groupUpdaters";

export function useLikeGroupMutation() {
  const queryClient = useQueryClient();
  const { account } = useAccount();

  return useMutation({
    mutationFn: ({ groupId, like }: { groupId: string; like: boolean }) =>
      postGroupLike(groupId, like),

    onMutate: async ({ groupId, like }) => {
      if (!account) return;

      //await queryClient.cancelQueries({ queryKey: ["group", groupId] });

      const userId = account.user_id;
      const prevResponse = queryClient.getQueryData<
        ApiResponse<{ group: Group }>
      >(["group", groupId]);

      if (!prevResponse?.data?.group) return prevResponse;

      if (like) {
        prevResponse.data.group.likes.push(userId);
      } else {
        prevResponse.data.group.likes = prevResponse.data.group.likes.filter(
          (id) => id !== userId,
        );
      }

      queryClient.setQueryData(["group", groupId], prevResponse);

      return prevResponse;
    },
  });
}

export function useJoinGroupMutation() {
  const queryClient = useQueryClient();
  const updateMyGroups = useMyGroupsUpdater();
  const { chatroomsRefetch } = useChatRooms();

  return useMutation({
    mutationFn: ({
      groupId,
      password,
    }: {
      groupId: string;
      password: string | undefined;
    }) => postGroupJoin(groupId, password),

    onSuccess: (response, variables) => {
      const updatedGroup = response?.data?.group;
      const groupId = variables.groupId;

      if (updatedGroup) {
        queryClient.setQueryData(["group", groupId], response);

        updateMyGroups((prev) => {
          const newGroups = [...prev, updatedGroup];
          return newGroups;
        });
        chatroomsRefetch();
      }
    },
  });
}

export function useLeaveGroupMutation() {
  const queryClient = useQueryClient();
  const { account } = useAccount();

  const updateMyGroups = useMyGroupsUpdater();

  return useMutation({
    mutationFn: ({ groupId }: { groupId: string }) => postGroupLeave(groupId),

    onSuccess: (response, variables) => {
      const groupId = variables.groupId;

      queryClient.setQueryData(["group", groupId], (prev: GroupResponse) => {
        if (!prev?.success || !prev.data?.group) return prev;
        prev.data.group.members = prev.data.group.members.filter(
          (id) => id !== account?.user_id,
        );
        return prev;
      });

      updateMyGroups((prev) => {
        const newGroups = prev.filter((group) => group.group_id !== groupId);
        return newGroups;
      });
    },
  });
}

export function useCreateGroupMutation() {
  const queryClient = useQueryClient();

  const updateMyGroups = useMyGroupsUpdater();
  const groupsCacheRemover = useGroupsCacheRemover();

  return useMutation({
    mutationFn: (group: PutGroupSchemaValues) => putGroup(group),

    onSuccess: (response) => {
      const newGroup = response?.data?.group;

      if (!newGroup) return;

      queryClient.setQueryData(["group", newGroup.group_id], response);

      updateMyGroups((prev) => {
        const newGroups = [...prev, newGroup];
        return newGroups;
      });

      localStorage.setItem("swiperGroupId", newGroup.group_id);

      groupsCacheRemover();
    },
  });
}
