import { MessageCircle } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { Userinfo } from "@/types/accountTypes";
import { useChatModal } from "../structure/ModalProviders";
import { useCallback, useMemo } from "react";
import { postChatRequest } from "@/apis/chatApi";
import { useChatRooms } from "@/hooks/chatHooks";
import { useAccount } from "@/hooks/accountHooks";
import { Badge } from "../ui/badge";
import { cn } from "@/utils/tools";

interface ChatButtonProps extends ButtonProps {
  userInfo?: Userinfo;
  groupId?: string;
  buttonRef?: React.Ref<HTMLButtonElement>;
}

export default function ChatButton({
  userInfo,
  groupId,
  className,
  buttonRef,
  ...props
}: ChatButtonProps) {
  const { setChatModal } = useChatModal();

  const { account } = useAccount();
  const { chatrooms } = useChatRooms();

  const chatRequest = useCallback(async () => {
    if (!userInfo) return;

    const response = await postChatRequest(userInfo.user_id);

    const chatroomId = response.data?.chatroom.chatroom_id;
    if (!chatroomId) return;

    setChatModal((prev) => ({
      ...prev,
      chatroom_id: chatroomId,
      opened: true,
    }));
  }, [userInfo]);

  const count = useMemo(() => {
    if (!chatrooms) return 0;

    if (userInfo) {
      const chatroom = chatrooms?.find(
        (chatroom) =>
          chatroom.members.sort().join() ===
          [account?.user_id, userInfo?.user_id].sort().join()
      );
      if (chatroom) {
        return chatroom?.unreads || 0;
      }
    } else if (!groupId) {
      const count = chatrooms.reduce(
        (acc, chatroom) => acc + chatroom.unreads || 0,
        0
      );
      return count;
    }

    const chatroom = chatrooms.find(
      (chatroom) => chatroom.chatroom_id === groupId
    );
    return chatroom?.unreads || 0;
  }, [chatrooms, groupId, userInfo]);

  return (
    <Button
      ref={buttonRef}
      className={cn("relative", className)}
      onClick={() => {
        if (groupId) {
          setChatModal((prev) => ({
            ...prev,
            chatroom_id: groupId,
            opened: true,
          }));
        } else if (!userInfo) {
          return setChatModal((prev) => ({
            ...prev,
            opened: true,
            chatroom_id: null,
          }));
        }

        const chatroom = chatrooms?.find(
          (chatroom) =>
            chatroom.members.sort().join() ===
            [account?.user_id, userInfo?.user_id].sort().join()
        );

        if (chatroom) {
          setChatModal((prev) => ({
            ...prev,
            chatroom_id: chatroom.chatroom_id,
            opened: true,
          }));
          return;
        }
        chatRequest();
      }}
      {...props}
    >
      <MessageCircle />
      {!!count && (
        <Badge
          variant={"secondary"}
          className="absolute right-[-7] bottom-[-7] py-0"
        >
          {count}
        </Badge>
      )}
    </Button>
  );
}
