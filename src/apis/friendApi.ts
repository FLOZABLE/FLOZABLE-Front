import {
  FriendSearchResponse,
  FriendsResponse,
  FriendsStatusResponse,
  FriendsTrendsResponse,
  RecommendedFriendsResponse,
} from "@/types/friendTypes";
import AxiosInstance from "@/lib/axiosInstance";
import { getTimezone, requestHandler } from "@/lib/utils";

// Get all friends
export async function getFriends(): Promise<FriendsResponse> {
  return requestHandler(AxiosInstance.get("/friend/all"));
}

// Delete a friend
export async function deleteFriend(friendId: string) {
  return requestHandler(
    AxiosInstance.delete("/friend", {
      data: { friend_id: friendId },
    })
  );
}

// Get recommended friends
export async function getRecommendedFriends(): Promise<RecommendedFriendsResponse> {
  return requestHandler(AxiosInstance.get("/friend/recommended"));
}

// Search friends by query
export async function searchFriends(
  query: string
): Promise<FriendSearchResponse> {
  return requestHandler(
    AxiosInstance.get("/friend/search", {
      params: { query },
    })
  );
}

// Get friend trends with timezone
export async function getFriendTrends(): Promise<FriendsTrendsResponse> {
  return requestHandler(
    AxiosInstance.get("/friend/trends", {
      params: { timezone: getTimezone() },
    })
  );
}

// Get friend status with timezone
export async function getFriendStatus(): Promise<FriendsStatusResponse> {
  return requestHandler(
    AxiosInstance.get("/friend/status", {
      params: { timezone: getTimezone() },
    })
  );
}

export async function sendFriendRequest(targetId: string) {
  return requestHandler(
    AxiosInstance.post("/friend/request", {
      target_id: targetId,
    })
  );
}

// Reply to friend request
export async function replyToFriendRequest(
  notificationId: string,
  accepted: boolean
) {
  return requestHandler(
    AxiosInstance.post("/friend/request/reply", {
      notification_id: notificationId,
      accepted,
    })
  );
}

// Cancel friend request
export async function cancelFriendRequest(notificationId: string) {
  return requestHandler(
    AxiosInstance.delete("/friend/request", {
      data: { notification_id: notificationId },
    })
  );
}
