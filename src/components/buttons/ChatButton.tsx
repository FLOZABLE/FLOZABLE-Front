import { MessageCircle } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { Userinfo } from "@/types/account";
import { useChatModal } from "../structure/ModalProviders";
import { useCallback } from "react";
import { postChatRequest } from "@/apis/chatApi";
import { useChatRooms } from "@/hooks/chatHooks";
import { useAccount } from "@/hooks/accountHooks";

interface ChatButtonProps extends ButtonProps {
  userInfo?: Userinfo;
  groupId?: string;
}

export default function ChatButton({
  userInfo,
  groupId,
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

  return (
    <Button
      effect={"shineHover"}
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
    </Button>
  );
}
