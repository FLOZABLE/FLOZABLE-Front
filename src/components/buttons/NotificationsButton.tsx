import { Bell, Dot } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNotifications } from "@/hooks/notificationsHooks";
import NotificationContainer from "../notifications/NotificationContainer";
import { useFriendsStatus, useFriendsTrends } from "@/hooks/friendHooks";
import React, { useCallback, useState } from "react";
import { deleteNotification } from "@/apis/notificationsApi";
import { postChatRequestReply } from "@/apis/chatApi";
import { useRouter } from "next/navigation";
import { Notification } from "@/types/notificationTypes";
import { useNotificationsUpdater } from "@/hooks/updaters/notificationsUpdaters";
import { cn } from "@/lib/utils";
import { replyToFriendRequest } from "@/apis/friendApi";

interface NotificationsButton extends ButtonProps {
  buttonRef?: React.Ref<HTMLButtonElement>;
}

export default function NotificationsButton({
  className,
  buttonRef,
  ...props
}: NotificationsButton) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { notifications } = useNotifications();
  const { friendsStatusRefetch } = useFriendsStatus();
  const { friendsTrendRefetch } = useFriendsTrends();

  const updateNotifications = useNotificationsUpdater();

  const filterNotification = useCallback((notificationId: string) => {
    updateNotifications((prev) => {
      return prev.filter(
        (notification) => notification.notification_id !== notificationId
      );
    });
  }, []);

  const friendRequestReply = useCallback(
    async (notificationId: string, accepted: boolean) => {
      const response = await replyToFriendRequest(notificationId, accepted);

      filterNotification(notificationId);

      if (!response.success) return;

      friendsStatusRefetch();
      friendsTrendRefetch();
    },
    []
  );

  const onDeleteNotification = useCallback((notificationId: string) => {
    filterNotification(notificationId);

    deleteNotification(notificationId);
  }, []);

  const chatRequestReply = useCallback(
    async (notificationId: string, accepted: boolean) => {
      filterNotification(notificationId);

      postChatRequestReply(notificationId, accepted);
    },
    []
  );

  const getNotificationProps = useCallback((notification: Notification) => {
    const { type, notification_id } = notification;

    switch (type) {
      case "friend_request":
        return {
          buttons: [
            <Button
              key="accept"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                friendRequestReply(notification_id, true);
              }}
            >
              Accept
            </Button>,
            <Button
              key="decline"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                friendRequestReply(notification_id, false);
              }}
            >
              Decline
            </Button>,
          ],
          onClick: () =>
            router.push(`/dashboard/user/${notification.userinfo.user_id}`),
        };
      case "friend_request_accepted":
        return {
          buttons: [
            <Button
              key="got-it"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNotification(notification.notification_id);
              }}
            >
              Got it
            </Button>,
          ],
          onClick: () =>
            router.push(`/dashboard/user/${notification.userinfo.user_id}`),
        };
      case "chat_request":
        return {
          buttons: [
            <Button
              key="accept"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                chatRequestReply(notification_id, true);
              }}
            >
              Accept
            </Button>,
            <Button
              key="decline"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                chatRequestReply(notification_id, false);
              }}
            >
              Decline
            </Button>,
          ],
        };
      default:
        return { buttons: [] };
    }
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("aspect-square h-10 w-10 relative", className)}
          variant="outline"
          ref={buttonRef}
          onClick={() => {
            setOpen(true);
          }}
          {...props}
        >
          <Bell />
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
        side="left"
        align="start"
        className="p-0 max-h-[70vh]"
      >
        <DropdownMenuLabel className="sticky top-0 z-10 bg-background border-b-2 p-3">
          Notifications
        </DropdownMenuLabel>
        {notifications?.map((notification, i) => {
          const { buttons, onClick } = getNotificationProps(notification);

          return (
            <DropdownMenuItem key={i}>
              <NotificationContainer
                notification={notification}
                onClick={onClick}
              >
                {buttons}
              </NotificationContainer>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
