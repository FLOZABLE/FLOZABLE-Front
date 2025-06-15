import AxiosInstance from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/utils";
import {
  ChatMembersResponse,
  ChatMessagesResponse,
  ChatRoomsResponse,
  PostChatRequestResponse,
} from "@/types/chatTypes";

export async function getChatRooms(): Promise<ChatRoomsResponse> {
  return requestHandler(AxiosInstance.get(`/chat/rooms`));
}

export async function getChatMessages(
  chatroomId: string,
  pageParam: number,
  length: number,
): Promise<ChatMessagesResponse> {
  return requestHandler(
    AxiosInstance.get(`/chat/messages`, {
      params: {
        chatroom_id: chatroomId,
        offset: pageParam,
        length,
      },
    }),
  );
}

export async function getChatMembers(
  chatroomId: string,
): Promise<ChatMembersResponse> {
  return requestHandler(
    AxiosInstance.get(`/chat/members`, {
      params: {
        chatroom_id: chatroomId,
      },
    }),
  );
}

export async function postChatRequest(
  targetId: string,
): Promise<PostChatRequestResponse> {
  return requestHandler(
    AxiosInstance.post(`/chat/request`, {
      target_id: targetId,
    }),
  );
}

export async function postChatRequestReply(
  notificationId: string,
  accepted: boolean,
) {
  return requestHandler(
    AxiosInstance.post(`/chat/request/reply`, {
      notification_id: notificationId,
      accepted,
    }),
  );
}
