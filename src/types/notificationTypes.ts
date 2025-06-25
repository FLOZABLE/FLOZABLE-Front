import { Userinfo } from "./accountTypes";
import { ApiResponse } from "./responseTypes";

export type NotificationType =
  | "friend_request"
  | "friend_accepted"
  | "group_invite"
  | "chat_request"
  | "global";

export interface Notification {
  notification_id: string;
  type: NotificationType;
  sender_id: string | null;
  group_id: string | null;
  friend_request_id: string | null;
  sent_at: number;
  title: string;
  sender: Userinfo | null;
  is_read: boolean;
  group: { name: string; group_id: string } | null;
  message: string;
}

// get /notifications
export type NotificationsResponse = ApiResponse<{
  notifications: Notification[];
}>;
