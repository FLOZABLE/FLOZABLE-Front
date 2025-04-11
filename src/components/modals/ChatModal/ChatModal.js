"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ChatModal.module.css";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DateTime } from "luxon";
import {
  useChatMessages,
  useChatRoomMembers,
  useChatRooms,
} from "@/hooks/chatHooks";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";
import { useAccount } from "@/hooks/accountHooks";
import { ChatModalContext } from "@/components/structure/ModalProviders";
import socket from "@/utils/sockets/socket";
import ChatContainer from "@/components/chats/ChatContainer/ChatContainer";
import SendBtn from "@/components/buttons/SendBtn/SendBtn";
import ChatRoom from "@/components/chats/ChatRoom/ChatRoom";
import MyChatContainer from "@/components/chats/MyChatContainer/MyChatContainer";

function ChatModal({}) {
  const { account } = useAccount();
  const { chatModal, setChatModal } = useContext(ChatModalContext);

  const [messages, setMessages] = useState([]);
  const [messageDataOptions, setMessageDataOptions] = useState({
    chatroomId: null,
    length: 30,
    lastMsgId: null,
  });
  const [chatroomName, setChatroomName] = useState("");

  const [lastReadMessageId, setLastReadMessageId] = useState(null);
  const [members, setMembers] = useState([]);
  const [msgInput, setMsgInput] = useState("");
  const moveRef = useRef(null);
  const chatsContainerRef = useRef(null);
  //const messageRefs = useRef({});
  const lastReadMessageRef = useRef(null);
  //const debouncedScrollBottom = useDebounce(scrollBottom, 300);

  const { chatrooms, updateChatrooms } = useChatRooms();
  const { chatroomMembersData } = useChatRoomMembers(chatModal.chatroom_id);
  const { chatMessagesData, fetchNextPage, hasNextPage } =
    useChatMessages(messageDataOptions);

  const { ref: inViewRef, inView } = useInView();

  const scrollToBottom = useCallback((behavior = "instant") => {
    setTimeout(() => {
      console.log("scroll bottom");
      if (chatsContainerRef.current) {
        chatsContainerRef.current.scrollTo({
          top: chatsContainerRef.current.scrollHeight,
          behavior,
        });
      }
    }, 50);
  }, []);

  const onSubmit = useCallback(() => {
    socket.emit("chat:send", chatModal.chatroom_id, msgInput);
    setMsgInput("");
    scrollToBottom("smooth");
  }, [msgInput, chatModal.chatroom_id]);

  useEffect(() => {
    if (!chatModal.chatroom_id) return;

    const chatroom = chatrooms.find(
      (chatroom) => chatroom.chatroom_id === chatModal.chatroom_id
    );
    if (!chatroom) return;

    setChatroomName(chatroom.name);
  }, [chatrooms, chatModal.chatroom_id]);

  useEffect(() => {
    if (!chatroomMembersData?.success) return;

    setMembers(chatroomMembersData.data.members);
  }, [chatroomMembersData]);

  useEffect(() => {
    //console.log(inView, "gd", hasNextPage);
    if (inView && hasNextPage) {
      console.log("fetch");
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (!chatMessagesData?.pages) return;

    console.log(chatMessagesData);
    const allMessages = [];
    chatMessagesData.pages.map((page) => {
      if (!page?.data?.messages) return;

      allMessages.push(...page.data.messages);
    });
    allMessages.sort((a, b) => a.sent_at - b.sent_at);

    const container = chatsContainerRef.current;
    const previousScrollHeight = container?.scrollHeight;
    const previousScrollTop = container?.scrollTop;

    setMessages(allMessages);
    if (chatsContainerRef.current) {
      setTimeout(() => {
        const newScrollHeight = container.scrollHeight;
        const heightDifference = newScrollHeight - previousScrollHeight;
        container.scrollTop = previousScrollTop + heightDifference;
      }, 0);
    }
  }, [chatMessagesData]);

  useEffect(() => {
    scrollToBottom();
    if (chatModal.chatroom_id) {
      setMessageDataOptions((prev) => {
        const newMessageDataOptions = structuredClone(prev);
        const chatroom = chatrooms.find(
          (chatroom) => chatroom.chatroom_id === chatModal.chatroom_id
        );
        if (chatroom?.lastMsg) {
          newMessageDataOptions.lastMsgId = chatroom.lastMsg.message_id;
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
          (chatroom) => chatroom.chatroom_id === chatModal.chatroom_id
        );

        if (chatroomIndex === -1) return prev;

        const lastRead = newState[chatroomIndex].lastRead;
        //console.log("lastread", lastRead);
        if (lastRead) {
          setTimeout(() => {
            //console.log("trigger");
            setLastReadMessageId(lastRead);
          }, 100);
        }

        const lastMsg = newState[chatroomIndex].lastMsg;

        //console.log("last", lastMsg);
        if (lastMsg) {
          newState[chatroomIndex].lastRead = lastMsg.message_id;
        }

        const updatedChatroom = {
          ...newState[chatroomIndex],
          unreads: 0,
          lastRead: newState[chatroomIndex].lastMsg?.message_id || lastRead,
        };

        newState[chatroomIndex] = updatedChatroom;

        return newState;
      });
      socket.emit("chat:read", chatModal.chatroom_id);
    }

    const messageAudio = new Audio("/audio/message.mp3");

    const onChatMessage = ({ message }) => {
      console.log(message);
      scrollToBottom("smooth");

      if (message.user_id !== account?.user_id) {
        messageAudio.play();
      }

      updateChatrooms((prev) => {
        const newChatrooms = [...prev];
        const chatroomIndex = newChatrooms.findIndex(
          (chatroom) => chatroom.chatroom_id === message.chatroom_id
        );

        if (chatroomIndex === -1) return [...prev]; // Ensure new reference

        // Create a new object instead of mutating
        const updatedChatroom = {
          ...newChatrooms[chatroomIndex],
          lastMsg: message,
          unreads:
            chatModal.chatroom_id === message.chatroom_id
              ? 0
              : newChatrooms[chatroomIndex].unreads + 1,
          lastRead:
            chatModal.chatroom_id === message.chatroom_id
              ? message.message_id
              : newChatrooms[chatroomIndex].lastRead,
        };

        const updatedChatrooms = [
          updatedChatroom,
          ...newChatrooms.slice(0, chatroomIndex),
          ...newChatrooms.slice(chatroomIndex + 1),
        ];

        if (chatModal.chatroom_id === message.chatroom_id) {
          setMessages((prev) => [...prev, message]);
          socket.emit("chat:read", chatModal.chatroom_id);
          setLastReadMessageId(message.message_id);
        } else {
          toast.info(
            <div>
              {updatedChatroom.name}
              <br />
              &quot;{message.message}&quot;
            </div>
          );
        }

        return updatedChatrooms; // Ensure new reference
      });
    };

    socket.on("chat:message", onChatMessage);

    return () => {
      socket.off("chat:message", onChatMessage);
    };
  }, [chatModal.chatroom_id, account]);

  useEffect(() => {
    if (!lastReadMessageId) return;
    console.log("scrollintoview");
    setTimeout(() => {
      lastReadMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start", // Scroll to the bottom of the last read message
      });
    }, 50);
  }, [lastReadMessageId]);

  useEffect(() => {
    const onNewChatroom = ({ chatroom }) => {
      if (!chatroom) return;

      updateChatrooms((prev) => {
        const newChatrooms = [...prev];
        const prevIndex = newChatrooms.findIndex(
          (prevChatroom) => prevChatroom.chatroom_id === chatroom.chatroom_id
        );
        console.log("new chatroom", prevIndex);

        //not found, then add it
        if (prevIndex === -1) {
          return [chatroom, ...prev];
        }

        newChatrooms[prevIndex] = { ...newChatrooms[prevIndex], ...chatroom };
        return newChatrooms;
      });
    };

    socket.on("new-chatroom", onNewChatroom);

    return () => {
      socket.off("new-chatroom", onNewChatroom);
    };
  }, [chatrooms]);

  return (
    <div
      className={`${styles.ChatModal} ${chatModal.opened ? styles.open : ""}`}
      ref={moveRef}
    >
      <div className={styles.header}>
        <i
          onClick={() => {
            setChatModal((prev) => ({ ...prev, opened: true }));
          }}
        >
          {/* <BackArrow /> */}
        </i>
        <p>Messages</p>
        <i
          onClick={() => {
            setChatModal((prev) => ({ ...prev, opened: false }));
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </i>
      </div>
      <ul className={`${styles.chatroomsContainer} customScroll`}>
        {chatrooms.length ? (
          chatrooms.map((chatroom, i) => {
            return <ChatRoom key={i} chatroom={chatroom} />;
          })
        ) : (
          <div className={styles.noChatrooms}>No chatrooms!</div>
        )}
      </ul>
      <div
        className={`${styles.chatScreen} ${
          chatModal.chatroom_id ? styles.open : ""
        }`}
      >
        <div className={styles.header}>
          <i
            onClick={() => {
              setChatModal((prev) => ({ ...prev, chatroom_id: null }));
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </i>
          <p className={`overflowDot ${styles.name}`}>{chatroomName}</p>
          <i
            onClick={() => {
              setChatModal((prev) => ({ ...prev, opened: false }));
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </i>
        </div>
        <ul
          className={`${styles.chatsContainer} customScroll`}
          ref={chatsContainerRef}
        >
          {messages.map((msg, index) => {
            const { user_id, message, sent_at, message_id } = msg;

            const dateTime = DateTime.fromSeconds(sent_at);
            let timeDisp;

            if (DateTime.now().hasSame(dateTime, "day")) {
              timeDisp = dateTime.toFormat("h:mm a");
            } else {
              timeDisp = dateTime.toFormat("M/d h:mm a");
            }

            const isLastRead =
              lastReadMessageId &&
              messages[index - 1]?.message_id === lastReadMessageId;

            if (user_id === account.user_id) {
              return (
                <div
                  ref={(el) => {
                    if (isLastRead) {
                      lastReadMessageRef.current = el;
                    }
                    if (index === 5) {
                      setTimeout(() => {
                        inViewRef(el);
                      }, 100);
                    }
                  }}
                  key={message_id}
                  className={styles.chatWrapper}
                >
                  <MyChatContainer time={timeDisp} message={message} />
                </div>
              );
            } else {
              const user = members.find((member) => {
                return member.user_id === user_id;
              });
              return (
                <div
                  ref={(el) => {
                    if (isLastRead) {
                      lastReadMessageRef.current = el;
                    }
                    if (index === 5) {
                      setTimeout(() => {
                        inViewRef(el);
                      }, 100);
                    }
                  }}
                  key={message_id}
                  className={styles.chatWrapper}
                >
                  {isLastRead ? (
                    <div className={styles.lastRead}>
                      <p>New</p>
                      <div className={styles.line}></div>
                    </div>
                  ) : null}
                  <ChatContainer
                    userInfo={user}
                    time={timeDisp}
                    message={message}
                  />
                </div>
              );
            }
          })}
        </ul>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={msgInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
            onChange={(e) => setMsgInput(e.target.value)}
          />
          <SendBtn onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}

export default ChatModal;
