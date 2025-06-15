import { Notification } from "@/types/notificationTypes";
import Image from "next/image";

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
    <div
      className="flex gap-2 cursor-pointer hover:bg-accent p-2 rounded-lg transition"
      onClick={onClick}>
      {!notification.cover_image ? null : notification.cover_image ===
        "profile" ? (
        <AvatarWrapper
          name={notification.userinfo.name}
          userId={notification.userinfo.user_id}
        />
      ) : (
        <Image
          src={notification.cover_image}
          alt="cover image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-md object-cover"
        />
      )}
      <div>
        <h2 className="text-md font-semibold">{notification.title}</h2>
        <p className="text-sm text-muted-foreground">{notification.contents}</p>
        <div className="flex gap-2 mt-1">{children}</div>
      </div>
    </div>
  );
}
