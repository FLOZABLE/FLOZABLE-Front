"use client";

import { cn } from "@/utils/tools";
import { useChatModal } from "../structure/ModalProviders";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useChatMessages, useChatRooms } from "@/hooks/chatHooks";
import ChatRoomContainer from "../chats/ChatRoomContainer";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Message, UseChatMessagesParams } from "@/types/chat";

export default function ChatModal() {
  const { chatModal, setChatModal } = useChatModal();

  const { chatrooms } = useChatRooms();

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageDataOptions, setMessageDataOptions] =
    useState<UseChatMessagesParams>({
      chatroomId: null,
      lastMsgId: null,
      length: 30,
    });

  const { chatMessagesData } = useChatMessages(messageDataOptions);

  useEffect(() => {
    if (!chatMessagesData?.pages) return;

    console.log(chatMessagesData);
    const allMessages: Message[] = [];
    chatMessagesData.pages.map((page) => {
      if (!page?.data?.messages) return;

      allMessages.push(...page.data.messages);
    });
    allMessages.sort((a, b) => a.sent_at - b.sent_at);
    setMessages(allMessages);
  }, [chatMessagesData]);

  useEffect(() => {
    if (!chatModal.chatroom_id) return;

    setMessageDataOptions((prev) => {
      const newMessageDataOptions = structuredClone(prev);
      const chatroom = chatrooms?.find(
        (chatroom) => chatroom.chatroom_id === chatModal.chatroom_id
      );
      if (chatroom?.last_message) {
        newMessageDataOptions.lastMsgId = chatroom.last_message.message_id;
      }
      if (newMessageDataOptions.chatroomId === chatModal.chatroom_id) {
        return newMessageDataOptions;
      }
      newMessageDataOptions.chatroomId = chatModal.chatroom_id;
      return newMessageDataOptions;
    });
  }, [chatModal.chatroom_id]);

  return (
    <Card
      className={cn(
        "fixed bottom-12 h-96 w-96 z-20 transition-all duration-500 ease-in-out shadow-md pb-0 overflow-hidden",
        chatModal.opened ? "right-12" : "right-[-30rem]"
      )}
    >
      <CardHeader>
        <CardTitle>Chats</CardTitle>
        <Button
          className="absolute right-3 top-3 size-8 z-10"
          variant={"ghost"}
          onClick={() => {
            setChatModal((prev) => ({ ...prev, opened: false }));
          }}
        >
          <X className="size-6" />
        </Button>
      </CardHeader>
      <CardContent className={"overflow-auto px-0"}>
        {chatrooms?.map((charoom, i) => {
          return <ChatRoomContainer key={i} chatroom={charoom} />;
        })}
      </CardContent>
      <Card
        className={cn(
          "overflow-auto px-0 absolute left-96 top-0 bg-white h-full w-full transition-all duration-500 ease-in-out events",
          chatModal.chatroom_id && "left-0"
        )}
      >
        <CardHeader>
          <CardTitle>{}</CardTitle>
        </CardHeader>
        <CardContent>{messages.map((message) => message.message)}</CardContent>
      </Card>
    </Card>
  );
}
