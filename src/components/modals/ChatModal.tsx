"use client";

import { useAccount } from "@/hooks/accountHooks";
import {
  useChatMessages,
  useChatRoomMembers,
  useChatRooms,
} from "@/hooks/chatHooks";
import { useChatroomsUpdater } from "@/hooks/updaters/chatUpdaters";
import config from "@/lib/config";
import socket from "@/lib/sockets/socket";
import { cn } from "@/lib/utils";
import { ChatRoom, Message, UseChatMessagesParams } from "@/types/chatTypes";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Volume2, VolumeOff, X } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

import AnimatedSwitchButton from "../buttons/AnimatedSwitchButton";
import { SendButton } from "../buttons/SendButton";
import ChatRoomContainer from "../chats/ChatRoomContainer";
import { useChatModal } from "../structure/ModalProviders";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
} from "../ui/chat/chat-bubble";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import { Input } from "../ui/input";

const MotionChatBubble = motion.create(ChatBubble);

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

  const [muted, setMuted] = useState(false);

  //const messagesRef = useRef<Record<string, HTMLElement>>({});

  const messageListRef = useRef<{ scrollToBottom: () => void }>(null);

  const { ref: inViewRef, inView } = useInView();

  const [newMessage, setNewMessage] = useState("");

  const { chatMessagesData, fetchNextPage, hasNextPage, isLoading } =
    useChatMessages(messageDataOptions);
  const { chatroomMembersData } = useChatRoomMembers(chatModal.chatroom_id);

  const updateChatrooms = useChatroomsUpdater();

  const chatroomKey = useMemo(() => {
    if (!isLoading && messageDataOptions.chatroomId)
      return messageDataOptions.chatroomId;
    return null;
  }, [isLoading, chatMessagesData]);

  const [debouncedChatroomKey] = useDebounce(chatroomKey, 10);

  const chatroomName = useMemo(() => {
    const chatroom = chatrooms?.find(
      (chatroom) => chatroom.chatroom_id === chatModal.chatroom_id,
    );
    return chatroom?.name || "(Not found)";
  }, [chatrooms, chatModal.chatroom_id]);

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("fetch");
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (!chatMessagesData?.pages) return;

    const allMessages: Message[] = [];
    chatMessagesData.pages.map((page) => {
      if (!page?.data?.messages) return;

      allMessages.push(...page.data.messages);
    });
    allMessages.sort((a, b) => a.sent_at - b.sent_at);
    setMessages(allMessages);
  }, [chatMessagesData]);

  useEffect(() => {
    const messageAudio = new Audio("/audio/message.mp3");

    setMessageDataOptions((prev) => {
      const newMessageDataOptions = structuredClone(prev);
      const chatroom = chatrooms?.find(
        (chatroom) => chatroom.chatroom_id === chatModal.chatroom_id,
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

    //change unread/last read value when selected chatroom changes
    updateChatrooms((prev) => {
      const newState = [...prev];
      const chatroomIndex = newState.findIndex(
        (chatroom) => chatroom.chatroom_id === chatModal.chatroom_id,
      );

      if (chatroomIndex === -1) return prev;

      const lastRead = newState[chatroomIndex].last_read;
      //console.log("lastread", lastRead);
      /* if (lastRead) {
        setTimeout(() => {
          //console.log("trigger");
          setLastReadMessageId(lastRead);
        }, 100);
      } */

      const lastMsg = newState[chatroomIndex].last_message;

      //console.log("last", lastMsg);
      if (lastMsg) {
        newState[chatroomIndex].last_read = lastMsg.message_id;
      }

      const updatedChatroom = {
        ...newState[chatroomIndex],
        unreads: 0,
        lastRead: newState[chatroomIndex].last_message?.message_id || lastRead,
      };

      newState[chatroomIndex] = updatedChatroom;

      return newState;
    });
    socket.emit("chat:read", chatModal.chatroom_id);

    const onChatMessage = async ({
      message,
      chatroomId,
    }: {
      message: Message;
      chatroomId: string;
    }) => {
      console.log(message, chatroomId, "new message");
      const updatedChatrooms = await updateChatrooms((prev) => {
        const newChatrooms = [...prev];
        const chatroomIndex = newChatrooms.findIndex(
          (chatroom) => chatroom.chatroom_id === chatroomId,
        );

        if (chatroomIndex === -1) return [...prev];

        const updatedChatroom: ChatRoom = {
          ...newChatrooms[chatroomIndex],
          last_message: message,
          unreads:
            chatModal.chatroom_id === chatroomId
              ? 0
              : newChatrooms[chatroomIndex].unreads + 1,
          last_read:
            chatModal.chatroom_id === chatroomId
              ? message.message_id
              : newChatrooms[chatroomIndex].last_read,
        };

        const updatedChatrooms = [
          updatedChatroom,
          ...newChatrooms.slice(0, chatroomIndex),
          ...newChatrooms.slice(chatroomIndex + 1),
        ];

        return updatedChatrooms;
      });

      if (chatModal.chatroom_id === chatroomId) {
        setMessages((prev) => [...prev, message]);
        socket.emit("chat:read", chatModal.chatroom_id);
      } else {
        if (!muted) {
          messageAudio.play();
        }

        const chatroom = updatedChatrooms?.find(
          (chatroom) => chatroom.chatroom_id === chatroomId,
        );
        toast.info(
          <div>
            <p>{chatroom?.name}</p>
            <p>{message.message}</p>
          </div>,
          {
            action: {
              label: "View",
              onClick: () =>
                setChatModal((prev) => ({
                  ...prev,
                  opened: true,
                  chatroom_id: chatroomId,
                })),
            },
          },
        );
      }
    };

    socket.on("chat:message", onChatMessage);

    setTimeout(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollToBottom();
      }
    }, 50);

    return () => {
      socket.off("chat:message", onChatMessage);
    };
  }, [chatModal.chatroom_id, muted]);

  const onSubmit = useCallback(() => {
    if (!newMessage.length) return;

    socket.emit("chat:send", chatModal.chatroom_id, newMessage);
    setNewMessage("");
    messageListRef.current?.scrollToBottom();
  }, [newMessage, chatModal.chatroom_id]);

  return (
    <Card
      className={cn(
        "fixed bottom-20 h-96 w-96 z-20 transition-all duration-500 ease-in-out shadow-md pb-0 overflow-hidden gap-0",
        chatModal.opened ? "right-12" : "right-[-30rem]",
      )}>
      <CardHeader className="flex items-center gap-5">
        <CardTitle>Chats</CardTitle>
        <AnimatedSwitchButton
          onIcon={<Volume2 />}
          offIcon={<VolumeOff />}
          clicked={!muted}
          onClick={() => {
            setMuted((prev) => !prev);
          }}
        />
        <Button
          className="absolute right-3 top-3 size-8 z-10"
          variant={"ghost"}
          onClick={() => {
            setChatModal((prev) => ({
              ...prev,
              opened: false,
              chatroom_id: null,
            }));
          }}>
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
          "overflow-auto px-0 absolute left-96 top-0 bg-background h-full w-full transition-all duration-300 ease-in-out events pb-0 gap-0",
          chatModal.chatroom_id && "left-0",
        )}>
        <CardHeader className="flex overflow-hidden items-center gap-2 shrink-0">
          <Button
            className="size-8 z-10"
            variant={"ghost"}
            onClick={() => {
              setChatModal((prev) => ({ ...prev, chatroom_id: null }));
            }}>
            <ArrowLeft className="size-6" />
          </Button>
          <CardTitle className="flex gap-2 items-center overflow-hidden mr-2">
            <p className="truncate">{chatroomName}</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-hidden h-full px-0">
          <ChatMessageList
            className="overflow-auto h-full"
            ref={messageListRef}>
            <AnimatePresence key={debouncedChatroomKey}>
              {messages.map((message, index) => {
                const variant =
                  message.user_id === account?.user_id ? "sent" : "received";

                const dateTime = DateTime.fromSeconds(message.sent_at);
                const timeDisp = DateTime.now().hasSame(dateTime, "day")
                  ? dateTime.toFormat("h:mm a")
                  : dateTime.toFormat("M/d h:mm a");

                const memberData = chatroomMembersData?.find(
                  (member) => member.user_id === message.user_id,
                );

                return (
                  <MotionChatBubble
                    key={message.message_id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "max-w-[70%] relative",
                      variant === "received" && "pb-5",
                    )}
                    variant={variant}
                    ref={(el) => {
                      if (index === 5) {
                        console.log(message, "index");
                        setTimeout(() => {
                          inViewRef(el);
                        }, 100);
                      }
                    }}>
                    <ChatBubbleAvatar
                      fallback={memberData?.name || "User"}
                      src={`${config.static_server}/img/profile-images/${message.user_id}.jpeg`}
                    />
                    <ChatBubbleMessage variant={variant}>
                      {message.message}
                      <ChatBubbleTimestamp timestamp={timeDisp} />
                    </ChatBubbleMessage>
                    {variant === "received" && memberData && (
                      <Link
                        href={`/dashboard/user/${memberData?.user_id}`}
                        className="absolute left-0 bottom-0 text-xs truncate max-w-30 animated-underline">
                        {memberData.name}
                      </Link>
                    )}
                  </MotionChatBubble>
                );
              })}
            </AnimatePresence>
          </ChatMessageList>
        </CardContent>
        <CardFooter className="mb-2 px-2 shrink-0 gap-2">
          <Input
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
          />
          <SendButton onSubmit={onSubmit} />
        </CardFooter>
      </Card>
    </Card>
  );
}
