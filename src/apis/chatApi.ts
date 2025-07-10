import AxiosInstance from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/utils";
import {
  ChatMembersResponse,
  ChatMessagesResponse,
  ChatRoomsResponse,
  PostChatRequestResponse,
} from "@/types/chatTypes";

export async function getChatRooms(): Promise<ChatRoomsResponse> {
  return requestHandler(AxiosInstance.get(`/chat/room/all`));
}

export async function getChatMessages(
  chatroomId: string,
  pageParam: number,
  length: number,
): Promise<ChatMessagesResponse> {
  return requestHandler(
    AxiosInstance.get(`/chat/room/${chatroomId}/messages`, {
      params: {
        offset: pageParam,
        length,
      },
    }),
  );
}

export async function getChatMembers(
  chatroomId: string,
): Promise<ChatMembersResponse> {
  return requestHandler(AxiosInstance.get(`/chat/room/${chatroomId}/members`));
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
  userId: string | undefined,
  accepted: boolean,
) {
  return requestHandler(
    AxiosInstance.post(`/chat/request/reply`, {
      target_id: userId,
      accepted,
    }),
  );
}
