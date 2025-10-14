"use client";

import { postChatRequest } from "@/apis/chatApi";
import { useAccount } from "@/hooks/accountHooks";
import { useChatRooms } from "@/hooks/chatHooks";
import { cn } from "@/lib/utils";
import { Userinfo } from "@/types/accountTypes";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useCallback, useMemo } from "react";

import { useChatModal } from "../structure/ModalProviders";
import { Badge } from "../ui/badge";
import { Button, ButtonProps } from "../ui/button";

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
          [account?.user_id, userInfo?.user_id].sort().join(),
      );
      if (chatroom) {
        return chatroom?.unreads || 0;
      }
    } else if (!groupId) {
      const count = chatrooms.reduce(
        (acc, chatroom) => acc + chatroom.unreads || 0,
        0,
      );
      return count;
    }

    const chatroom = chatrooms.find(
      (chatroom) => chatroom.group_id === groupId,
    );
    return chatroom?.unreads || 0;
  }, [chatrooms, groupId, userInfo]);

  return (
    <Button
      ref={buttonRef}
      className={cn("relative", className)}
      onClick={() => {
        if (groupId) {
          const chatroom = chatrooms?.find(
            (chatroom) => chatroom.group_id === groupId,
          );

          if (chatroom) {
            setChatModal((prev) => ({
              ...prev,
              chatroom_id: chatroom.chatroom_id,
              opened: true,
            }));
            return;
          }
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
            [account?.user_id, userInfo?.user_id].sort().join(),
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
      {...props}>
      <motion.div
        animate={{
          scale: !!count ? [1, 1.1, 0.9, 1.05, 1] : 1,
          rotate: !!count ? [0, -5, 5, -5, 0] : 0,
          y: !!count ? [0, -5, 0, -2, 0] : 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
        }}>
        <MessageCircle />
      </motion.div>
      {!!count && (
        <Badge
          variant={"secondary"}
          className="absolute right-[-7] bottom-[-7] py-0">
          {count}
        </Badge>
      )}
    </Button>
  );
}
