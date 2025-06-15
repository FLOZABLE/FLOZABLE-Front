import { ChatRoom } from "@/types/chatTypes";

import { useUpdater } from "../otherHooks";

export function useChatroomsUpdater() {
  return useUpdater<{ chatrooms: ChatRoom[] }, "chatrooms">(
    ["chatRooms"],
    "chatrooms",
  );
}
