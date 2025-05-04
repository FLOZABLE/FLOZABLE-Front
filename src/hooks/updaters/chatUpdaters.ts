import { ChatRoom } from "@/types/chat";
import { useUpdater } from "../otherHooks";

export function useChatroomsUpdater() {
  return useUpdater<{ chatrooms: ChatRoom[] }, "chatrooms">(
    ["chatRooms"],
    "chatrooms"
  );
}
