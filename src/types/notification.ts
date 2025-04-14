import { Userinfo } from "./account";
import { ApiResponse } from "./response";

export interface NotificationExtraInfo {
  title?: string;
  description?: string;
}

export type NotificationType =
  | "friend_request"
  | "friend_request_sent"
  | "friend_request_accepted"
  | "subject_share"
  | "plan_share"
  | "plan_shared"
  | "chat_request";

export interface Notification {
  notification_id: string;
  type: NotificationType;
  from_user_id: string;
  sent_at: string;
  extra_info?: NotificationExtraInfo | null;
  userinfo: Userinfo;
  title: string;
  contents: string;
  cover_image?: string;
}

// get /notifications
export type NotificationsResponse = ApiResponse<{
  notifications: Notification[];
}>;
