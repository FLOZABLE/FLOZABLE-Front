import { getChatMembers, getChatMessages, getChatRooms } from "@/apis/chatApi";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "./accountHooks";

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

/* function useChatMessages({ chatroomId, length, lastMsgId }: {}) {
  const queryResult = useInfiniteQuery({
    queryKey: [`useChatMessages`, chatroomId, length, lastMsgId],
    queryFn: ({ pageParam }) =>
      getChatMessages({ chatroomId, pageParam, length }),
    staleTime: 1000 * 60 * 10,
    enabled: !!chatroomId,
    initialPageParam: 0,
    //select: (response) => response?.data?.messages || [],
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

function useChatRoomMembers(chatroomId) {
  const queryResult = useQuery({
    queryKey: [`useChatRoomMembers`, chatroomId],
    queryFn: () => getChatMembers(chatroomId),
    staleTime: 1000 * 60 * 10,
    enabled: !!chatroomId,
  });

  const { data: chatroomMembersData, refetch: chatroomMembersRefetch } =
    queryResult;

  return { chatroomMembersData, chatroomMembersRefetch, ...queryResult };
}
 */
