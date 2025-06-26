import AxiosInstance from "@/lib/axiosInstance";
import { getTimezone, requestHandler } from "@/lib/utils";
import {
  FriendSearchResponse,
  FriendsResponse,
  FriendsStatusResponse,
  FriendsTrendsResponse,
  RecommendedFriendsResponse,
} from "@/types/friendTypes";

// Get all friends
export async function getFriends(): Promise<FriendsResponse> {
  return requestHandler(AxiosInstance.get("/friend/all"));
}

// Delete a friend
export async function deleteFriend(friendId: string) {
  return requestHandler(AxiosInstance.delete(`/friend/${friendId}`));
}

// Get recommended friends
export async function getRecommendedFriends(): Promise<RecommendedFriendsResponse> {
  return requestHandler(AxiosInstance.get("/friend/recommended"));
}

// Search friends by query
export async function searchFriends(
  query: string,
): Promise<FriendSearchResponse> {
  return requestHandler(
    AxiosInstance.get("/friend/search", {
      params: { query },
    }),
  );
}

// Get friend trends with timezone
export async function getFriendTrends(): Promise<FriendsTrendsResponse> {
  return requestHandler(
    AxiosInstance.get("/friend/trends", {
      params: { timezone: getTimezone() },
    }),
  );
}

// Get friend status with timezone
export async function getFriendStatus(): Promise<FriendsStatusResponse> {
  return requestHandler(
    AxiosInstance.get("/friend/all/status", {
      params: { timezone: getTimezone() },
    }),
  );
}

export async function sendFriendRequest(targetId: string) {
  return requestHandler(AxiosInstance.post(`/friend/${targetId}/request`));
}

// Reply to friend request
export async function replyToFriendRequest(
  friendshipId: string,
  accepted: boolean,
) {
  return requestHandler(
    AxiosInstance.post(`/friend/request/${friendshipId}/reply`, {
      accepted,
    }),
  );
}

// Cancel friend request
export async function cancelFriendRequest(notificationId: string) {
  return requestHandler(
    AxiosInstance.delete("/friend/request", {
      data: { notification_id: notificationId },
    }),
  );
}
