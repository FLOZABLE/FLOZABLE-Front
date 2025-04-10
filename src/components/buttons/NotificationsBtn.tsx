import { Bell, Dot } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNotifications } from "@/hooks/notificationsHooks";
import NotificationContainer from "../notifications/NotificationContainer";
import { useFriendsStatus, useFriendsTrends } from "@/hooks/friendsHooks";
import React, { useCallback } from "react";
import { postFriendsRequestReply } from "@/apis/friendsApi";
import { deleteNotification } from "@/apis/notificationsApi";
import { postChatRequestReply } from "@/apis/chatApi";
import { useRouter } from "next/navigation";

export default function NotificationsBtn() {
  const router = useRouter();

  const { notifications, filterNotification } = useNotifications();
  const { friendsStatusRefetch } = useFriendsStatus();
  const { friendsTrendRefetch } = useFriendsTrends();

  const friendRequestReply = useCallback(async (notificationId, accepted) => {
    const response = await postFriendsRequestReply({
      notificationId,
      accepted,
    });

    filterNotification(notificationId);

    if (!response.success) return;

    friendsStatusRefetch();
    friendsTrendRefetch();
  }, []);

  const onDeleteNotification = useCallback((notificationId) => {
    filterNotification(notificationId);

    deleteNotification(notificationId);
  }, []);

  const chatRequestReply = useCallback(async (notificationId, accepted) => {
    filterNotification(notificationId);

    postChatRequestReply({
      accepted,
      notificationId,
    });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="aspect-square h-10 w-10 relative" variant="outline">
          <Bell />
          {notifications.length ? (
            <Dot
              color="var(--color-destructive)"
              strokeWidth={14}
              className="absolute right-[-7] top-[-7] fill-"
            />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="p-0">
        <DropdownMenuLabel className="sticky top-0 z-10 bg-background border-b-2 p-3">
          Notifications
        </DropdownMenuLabel>
        {notifications.map((notification, i) => {
          const { userinfo, notification_id, type, message } = notification;

          const getNotificationProps = () => {
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
                    router.push(`/dashboard/user/${userinfo.user_id}`),
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
                    router.push(`/dashboard/user/${userinfo.user_id}`),
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
          };

          const { buttons, onClick } = getNotificationProps();

          return (
            <DropdownMenuItem key={i}>
              <NotificationContainer
                userInfo={userinfo}
                title={message.title}
                contents={message.contents}
                coverImg={message.cover_image}
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
