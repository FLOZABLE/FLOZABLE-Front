import {
  FriendsRecommendedResponse,
  FriendsResponse,
  FriendsSearchResponse,
  FriendsStatusResponse,
  FriendsTrendResponse,
} from "@/types/friend";
import AxiosInstance from "@/utils/axiosInstance";
import { getTimezone, requestHandler } from "@/utils/tools";

async function getFriends(): Promise<FriendsResponse> {
  return requestHandler(AxiosInstance.get(`/friends`));
}

async function deleteFriend(friendId: string) {
  return requestHandler(
    AxiosInstance.delete(`/friends/friend`, { data: { friend_id: friendId } })
  );
}

async function getFriendsRecommended(): Promise<FriendsRecommendedResponse> {
  return requestHandler(AxiosInstance.get(`/friends/recommended`));
}

async function getFriendsSearch(
  searchQuery: string
): Promise<FriendsSearchResponse> {
  return requestHandler(
    AxiosInstance.get(`/friends/search`, {
      params: {
        query: searchQuery,
      },
    })
  );
}

async function getFriendsTrends(): Promise<FriendsTrendResponse> {
  const timezone = getTimezone();
  return requestHandler(
    AxiosInstance.get(`/friends/trends`, {
      params: {
        timezone,
      },
    })
  );
}

async function getFriendsStatus(): Promise<FriendsStatusResponse> {
  const timezone = getTimezone();

  const response = await AxiosInstance.get(`/friends/status`, {
    params: { timezone },
  });
  return response.data;
}

async function postFriendsRequest(targetId: string) {
  return requestHandler(
    AxiosInstance.post(`/friends/request`, {
      target_id: targetId,
    })
  );
}

async function postFriendsRequestReply(
  notificationId: string,
  accepted: boolean
) {
  return requestHandler(
    AxiosInstance.post(`/friends/request/reply`, {
      notification_id: notificationId,
      accepted,
    })
  );
}

async function deleteFriendRequest(notificationId: string) {
  return requestHandler(
    AxiosInstance.delete(`/friends/request`, {
      data: {
        notification_id: notificationId,
      },
    })
  );
}

export {
  getFriends,
  deleteFriend,
  getFriendsRecommended,
  getFriendsSearch,
  getFriendsTrends,
  getFriendsStatus,
  postFriendsRequest,
  postFriendsRequestReply,
  deleteFriendRequest,
};
