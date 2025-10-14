import { postChatRequestReply } from "@/apis/chatApi";
import { replyToFriendRequest } from "@/apis/friendApi";
import { deleteNotification } from "@/apis/notificationApi";
import { useFriendsStatus, useFriendsTrends } from "@/hooks/friendHooks";
import { useNotifications } from "@/hooks/notificationHooks";
import { useNotificationsUpdater } from "@/hooks/updaters/notificationUpdaters";
import { cn } from "@/lib/utils";
import { Notification } from "@/types/notificationTypes";
import { motion } from "framer-motion";
import { Bell, Dot } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

import NotificationContainer from "../notifications/NotificationContainer";
import { Button, ButtonProps } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSidebar } from "../ui/sidebar";

interface NotificationsButton extends ButtonProps {
  buttonRef?: React.Ref<HTMLButtonElement>;
}

export default function NotificationsButton({
  className,
  buttonRef,
  ...props
}: NotificationsButton) {
  const { setOpen: setSidebarOpen, setIsMouseEvent } = useSidebar();

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { notifications } = useNotifications();
  const { friendsStatusRefetch } = useFriendsStatus();
  const { friendsTrendRefetch } = useFriendsTrends();

  const updateNotifications = useNotificationsUpdater();

  const filterNotification = useCallback((notificationId: string) => {
    updateNotifications((prev) => {
      return prev.filter(
        (notification) => notification.notification_id !== notificationId,
      );
    });
  }, []);

  const friendRequestReply = useCallback(
    async (notificationId: string, friendshipId: string, accepted: boolean) => {
      const response = await replyToFriendRequest(friendshipId, accepted);

      filterNotification(notificationId);

      if (!response.success) return;

      friendsStatusRefetch();
      friendsTrendRefetch();
    },
    [],
  );

  const onDeleteNotification = useCallback((notificationId: string) => {
    filterNotification(notificationId);

    deleteNotification(notificationId);
  }, []);

  const chatRequestReply = useCallback(
    async (
      notificationId: string,
      userId: string | undefined,
      accepted: boolean,
    ) => {
      filterNotification(notificationId);

      postChatRequestReply(userId, accepted);
    },
    [],
  );

  const getNotificationProps = useCallback((notification: Notification) => {
    const { type, notification_id } = notification;

    const senderId = notification.sender?.user_id;

    switch (type) {
      case "friend_request":
        return {
          buttons: [
            <Button
              key="accept"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                friendRequestReply(
                  notification_id,
                  notification.friend_request_id!,
                  true,
                );
              }}>
              Accept
            </Button>,
            <Button
              key="decline"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                friendRequestReply(
                  notification_id,
                  notification.friend_request_id!,
                  false,
                );
              }}>
              Decline
            </Button>,
          ],
          onClick: () => router.push(`/dashboard/user/${senderId}`),
        };
      case "friend_accepted":
        return {
          buttons: [
            <Button
              key="got-it"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNotification(notification.notification_id);
              }}>
              Got it
            </Button>,
          ],
          onClick: () => router.push(`/dashboard/user/${senderId}`),
        };
      case "chat_request":
        return {
          buttons: [
            <Button
              key="accept"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                chatRequestReply(notification_id, senderId, true);
              }}>
              Accept
            </Button>,
            <Button
              key="decline"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                chatRequestReply(notification_id, senderId, false);
              }}>
              Decline
            </Button>,
          ],
        };
      default:
        return { buttons: [] };
    }
  }, []);

  return (
    <DropdownMenu
      open={open}
      /* modal={true} */
      onOpenChange={(open) => {
        setSidebarOpen(open);
        setIsMouseEvent(!open);
        setOpen(open);
      }}>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("aspect-square h-10 w-10 relative", className)}
          variant="outline"
          ref={buttonRef}
          onClick={() => {
            setOpen(true);
          }}
          {...props}>
          <motion.div
            animate={{
              rotate: !!notifications?.length
                ? [0, -15, 15, -15, 15, -10, 10, -5, 5, 0]
                : 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1,
            }}>
            <Bell />
          </motion.div>
          {!!notifications?.length && (
            <Dot
              color="var(--color-destructive)"
              strokeWidth={14}
              className="absolute right-[-7] top-[-7] fill-"
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="end"
        className="p-0 max-h-[70vh] min-w-80">
        <DropdownMenuLabel className="sticky top-0 z-10 bg-background border-b-2 p-3">
          Notifications
        </DropdownMenuLabel>
        {notifications?.length ? (
          notifications.map((notification, i) => {
            const { buttons, onClick } = getNotificationProps(notification);

            return (
              <DropdownMenuItem key={i}>
                <NotificationContainer
                  notification={notification}
                  onClick={onClick}>
                  {buttons}
                </NotificationContainer>
              </DropdownMenuItem>
            );
          })
        ) : (
          <DropdownMenuItem>
            <p>You got no notifications</p>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
