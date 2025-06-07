import { Userinfo } from "./accountTypes";
import { ApiResponse } from "./responseTypes";

export interface Message {
  message_id: string;
  message: string;
  user_id: string;
  sent_at: number;
}

export type ChatMember = Pick<Userinfo, "user_id" | "name">;

export interface ChatRoom {
  chatroom_id: string;
  type: "group" | "room";
  members: string[];
  last_message: Message | null;
  last_read: string | null;
  unreads: number;
  name: string;
}

export interface UseChatMessagesParams {
  chatroomId: string | null;
  lastMsgId: string | null;
  length: number;
}

// get /chat/rooms
export type ChatRoomsResponse = ApiResponse<{ chatrooms: ChatRoom[] }>;

// get /chat/messages
export type ChatMessagesResponse = ApiResponse<{ messages: Message[] }>;

// get /chat/members
export type ChatMembersResponse = ApiResponse<{ members: ChatMember[] }>;

// post /chat/request
export type PostChatRequestResponse = ApiResponse<{ chatroom: ChatRoom }>;
