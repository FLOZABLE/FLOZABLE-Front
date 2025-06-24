import { Userinfo } from "./accountTypes";
import { ApiResponse } from "./responseTypes";

export type NotificationType =
  | "friend_request"
  | "friend_request_sent"
  | "friend_request_accepted"
  | "chat_request";

export interface Notification {
  notification_id: string;
  type: NotificationType;
  from_user_id: string;
  sent_at: string;
  sender: Userinfo;
  title: string;
  contents: string;
  cover_image?: string;
}

// get /notifications
export type NotificationsResponse = ApiResponse<{
  notifications: Notification[];
}>;
