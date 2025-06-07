import { ChatRoom } from "@/types/chatTypes";
import ChatRoomCoverImage from "./ChatRoomCoverImage";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { Badge } from "../ui/badge";
import { useChatModal } from "../structure/ModalProviders";

type ChatRoomContainerProps = {
  chatroom: ChatRoom;
};

export default function ChatRoomContainer({
  chatroom,
}: ChatRoomContainerProps) {
  const { setChatModal } = useChatModal();

  const timeDisp = useMemo(() => {
    if (!chatroom.last_message?.sent_at) return;

    const dateTime = DateTime.fromSeconds(chatroom.last_message.sent_at);
    if (DateTime.now().hasSame(dateTime, "day")) {
      const timeDisp = dateTime.toLocaleString(DateTime.TIME_SIMPLE);
      return timeDisp;
    } else {
      const timeDisp = dateTime.toFormat("M/d");
      return timeDisp;
    }
  }, [chatroom.last_message?.sent_at]);

  return (
    <div
      className="border-b-2 flex p-5"
      onClick={() => {
        setChatModal((prev) => ({
          ...prev,
          chatroom_id: chatroom.chatroom_id,
        }));
      }}
    >
      <ChatRoomCoverImage memberIds={chatroom.members} />
      <div className="ml-3 overflow-hidden w-full">
        <div className="flex content-center">
          <p className="truncate text-lg mr-3">{chatroom.name}</p>
          <p className="ml-auto whitespace-nowrap">{timeDisp}</p>
        </div>
        <div className="flex">
          <p className="truncate mr-3">{chatroom.last_message?.message}</p>
          {!!chatroom.unreads && (
            <Badge className="ml-auto">{chatroom.unreads}</Badge>
          )}
        </div>
      </div>
    </div>
  );
}
