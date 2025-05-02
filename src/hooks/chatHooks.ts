import { getChatMembers, getChatMessages, getChatRooms } from "@/apis/chatApi";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAccount } from "./accountHooks";
import { UseChatMessagesParams } from "@/types/chat";

export function useChatRooms() {
  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: [`chatRooms`],
    queryFn: getChatRooms,
    staleTime: 1000 * 60,
    enabled: !!account,
    select: (response) => response?.data?.chatrooms || [],
  });

  const { data: chatrooms, refetch: chatroomsRefetch } = queryResult;

  return { chatrooms, chatroomsRefetch, ...queryResult };
}

export function useChatMessages({
  chatroomId,
  lastMsgId,
  length,
}: UseChatMessagesParams) {
  const queryResult = useInfiniteQuery({
    queryKey: [`chatMessages`, chatroomId, length, lastMsgId],
    //enabled already handles chatroomId's existence
    queryFn: ({ pageParam }) => getChatMessages(chatroomId!, pageParam, length),
    staleTime: 1000 * 60 * 10,
    enabled: !!chatroomId,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage?.data?.messages.length === length
          ? allPages.length * length
          : undefined;
      return nextPage;
    },
  });

  const { data: chatMessagesData, refetch: chatMessagesRefetch } = queryResult;

  return { chatMessagesData, chatMessagesRefetch, ...queryResult };
}

export function useChatRoomMembers(chatroomId: string) {
  const queryResult = useQuery({
    queryKey: [`chatRoomMembers`, chatroomId],
    queryFn: () => getChatMembers(chatroomId),
    staleTime: 1000 * 60 * 10,
    enabled: !!chatroomId,
    select: (response) => response.data?.members || [],
  });

  const { data: chatroomMembersData, refetch: chatroomMembersRefetch } =
    queryResult;

  return { chatroomMembersData, chatroomMembersRefetch, ...queryResult };
}
