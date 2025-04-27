import { FriendStatus } from "@/types/friend";
import { useUpdater } from "../otherHooks";

export function useFriendsStatusUpdater() {
  return useUpdater<{ friends: FriendStatus[] }, "friends">(
    ["friendsStatus"],
    "friends"
  );
}
