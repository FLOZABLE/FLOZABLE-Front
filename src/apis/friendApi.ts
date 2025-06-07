import {
  FriendsRecommendedResponse,
  FriendsResponse,
  FriendsSearchResponse,
  FriendsStatusResponse,
  FriendsTrendResponse,
} from "@/types/friend";
import AxiosInstance from "@/utils/axiosInstance";
import { getTimezone, requestHandler } from "@/utils/tools";

export async function getFriendAll(): Promise<FriendsResponse> {
  return requestHandler(AxiosInstance.get(`/friend/all`));
}

export async function deleteFriend(friendId: string) {
  return requestHandler(
    AxiosInstance.delete(`/friend`, { data: { friend_id: friendId } })
  );
}

export async function getFriendsRecommended(): Promise<FriendsRecommendedResponse> {
  return requestHandler(AxiosInstance.get(`/friend/recommended`));
}

export async function getFriendsSearch(
  searchQuery: string
): Promise<FriendsSearchResponse> {
  return requestHandler(
    AxiosInstance.get(`/friend/search`, {
      params: {
        query: searchQuery,
      },
    })
  );
}

export async function getFriendTrends(): Promise<FriendsTrendResponse> {
  const timezone = getTimezone();
  return requestHandler(
    AxiosInstance.get(`/friend/trends`, {
      params: {
        timezone,
      },
    })
  );
}

export async function getFriendStatus(): Promise<FriendsStatusResponse> {
  const timezone = getTimezone();

  const response = await AxiosInstance.get(`/friend/status`, {
    params: { timezone },
  });
  return response.data;
}

export async function postFriendRequest(targetId: string) {
  return requestHandler(
    AxiosInstance.post(`/friend/request`, {
      target_id: targetId,
    })
  );
}

export async function postFriendRequestReply(
  notificationId: string,
  accepted: boolean
) {
  return requestHandler(
    AxiosInstance.post(`/friend/request/reply`, {
      notification_id: notificationId,
      accepted,
    })
  );
}

export async function deleteFriendRequest(notificationId: string) {
  return requestHandler(
    AxiosInstance.delete(`/friend/request`, {
      data: {
        notification_id: notificationId,
      },
    })
  );
}