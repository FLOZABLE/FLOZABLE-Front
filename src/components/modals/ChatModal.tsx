"use client";

import { cn } from "@/utils/tools";
import { useChatModal } from "../structure/ModalProviders";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useChatMessages, useChatRooms } from "@/hooks/chatHooks";
import ChatRoomContainer from "../chats/ChatRoomContainer";
import { Button } from "../ui/button";
import { ArrowLeft, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Message, UseChatMessagesParams } from "@/types/chat";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
} from "../ui/chat/chat-bubble";
import { useAccount } from "@/hooks/accountHooks";
import config from "@/utils/config";
import { DateTime } from "luxon";
import { ChatInput } from "../ui/chat/chat-input";
import { SendButton } from "../buttons/SendButton";
import socket from "@/utils/sockets/socket";

export default function ChatModal() {
  const { account } = useAccount();

  const { chatModal, setChatModal } = useChatModal();

  const { chatrooms } = useChatRooms();

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageDataOptions, setMessageDataOptions] =
    useState<UseChatMessagesParams>({
      chatroomId: null,
      lastMsgId: null,
      length: 30,
    });
  const [newMessage, setNewMessage] = useState("");

  const { chatMessagesData } = useChatMessages(messageDataOptions);

  const chatroomName = useMemo(() => {
    const chatroom = chatrooms?.find(
      (chatroom) => chatroom.chatroom_id === chatModal.chatroom_id
    );
    return chatroom?.name || "(Not found)";
  }, [chatrooms, chatModal.chatroom_id]);

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

  const onSubmit = useCallback(() => {
    socket.emit("chat:send", chatModal.chatroom_id, newMessage);
    setNewMessage("");
  }, [newMessage, chatModal.chatroom_id]);

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
          "overflow-auto px-0 absolute left-96 top-0 bg-white h-full w-full transition-all duration-300 ease-in-out events pb-0 gap-0",
          chatModal.chatroom_id && "left-0"
        )}
      >
        <CardHeader className="flex overflow-hidden items-center gap-2 shrink-0">
          <Button
            className="size-8 z-10"
            variant={"ghost"}
            onClick={() => {
              setChatModal((prev) => ({ ...prev, chatroom_id: null }));
            }}
          >
            <ArrowLeft className="size-6" />
          </Button>
          <CardTitle className="flex gap-2 items-center overflow-hidden mr-2">
            <p className="truncate">{chatroomName}</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-hidden h-full px-0">
          <ChatMessageList className="overflow-auto h-full">
            {messages.map((message) => {
              const variant =
                message.user_id === account?.user_id ? "sent" : "received";

              const dateTime = DateTime.fromSeconds(message.sent_at);
              let timeDisp;

              if (DateTime.now().hasSame(dateTime, "day")) {
                timeDisp = dateTime.toFormat("h:mm a");
              } else {
                timeDisp = dateTime.toFormat("M/d h:mm a");
              }

              return (
                <ChatBubble
                  key={message.message_id}
                  variant={variant}
                  className="max-w-[70%]"
                >
                  <ChatBubbleAvatar
                    fallback={account?.name}
                    src={`${config.static_server}/img/profile-images/${message.user_id}.jpeg`}
                  />
                  <ChatBubbleMessage variant={variant}>
                    {message.message}
                    <ChatBubbleTimestamp timestamp={timeDisp} />
                  </ChatBubbleMessage>
                </ChatBubble>
              );
            })}
          </ChatMessageList>
        </CardContent>
        <CardFooter className="mb-2 px-2 shrink-0 gap-2">
          <ChatInput
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
          <SendButton onSubmit={onSubmit} />
        </CardFooter>
      </Card>
    </Card>
  );
}
