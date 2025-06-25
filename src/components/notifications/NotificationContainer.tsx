import { Notification } from "@/types/notificationTypes";

import AvatarWrapper from "../ui/avatar";

interface NotificationContainerProps {
  children?: React.ReactNode;
  notification: Notification;
  onClick?: () => void;
}

export default function NotificationContainer({
  children,
  notification,
  onClick,
}: NotificationContainerProps) {
  return (
    <div className="flex gap-2 p-2 rounded-lg" onClick={onClick}>
      {notification.sender && (
        <AvatarWrapper
          name={notification.sender?.name}
          userId={notification.sender?.user_id}
          className="cursor-pointer"
        />
      )}
      <div>
        <h2 className="text-md font-semibold">{notification.title}</h2>
        <p className="text-sm text-muted-foreground">{notification.message} </p>
        <div className="flex gap-2 mt-1">{children}</div>
      </div>
    </div>
  );
}
