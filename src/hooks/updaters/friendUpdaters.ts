import { Friend, FriendStatus } from "@/types/friendTypes";

import { useUpdater } from "../otherHooks";

export function useFriendsUpdater() {
  return useUpdater<{ friends: Friend[] }, "friends">(["friends"], "friends");
}

export function useFriendsStatusUpdater() {
  return useUpdater<{ friends: FriendStatus[] }, "friends">(
    ["friendsStatus"],
    "friends",
  );
}
