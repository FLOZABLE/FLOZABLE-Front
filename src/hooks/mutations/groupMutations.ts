import { postGroupLike } from "@/apis/groupApi";
import { Group } from "@/types/groupTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAccount } from "../accountHooks";

export function useLikeGroupMutation() {
  const queryClient = useQueryClient();
  const { account } = useAccount();

  return useMutation({
    mutationFn: ({ groupId, like }: { groupId: string; like: boolean }) =>
      postGroupLike(groupId, like),

    onMutate: async ({ groupId, like }) => {
      if (!account) return;

      await queryClient.cancelQueries({ queryKey: ["group", groupId] });

      const userId = account.user_id;
      // 2. Snapshot the previous value
      const previousGroup = queryClient.getQueryData<Group>(["group", groupId]);

      // 3. Optimistically update to the new value (IMMUTABLY)
      if (previousGroup) {
        // **CRITICAL CHANGE**: Create a new array for 'likes' and a new 'Group' object
        const newLikes = like
          ? [...previousGroup.likes, userId] // Add user_id
          : previousGroup.likes.filter((id) => id !== userId); // Filter out user_id

        const newGroup: Group = {
          ...previousGroup, // Copy all existing properties
          likes: newLikes, // Assign the new likes array
        };

        // This ensures a new object reference is passed to the cache,
        // signaling a change to all subscribers.
        queryClient.setQueryData(["group", groupId], newGroup);
      }

      // 4. Return a context object with the snapshotted value
      return { previousGroup };
    },

    // onError and onSettled remain the same and are correct.
    onError: (err, groupId, context) => {
      if (context?.previousGroup) {
        // Rollback uses the snapshotted, original object reference
        queryClient.setQueryData(["group", groupId], context.previousGroup);
      }
    },

    onSettled: (data, error, { groupId }) => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
  });
}
