import { Userinfo } from "./account";
import { ActiveGroup } from "./group";
import { ApiResponse } from "./response";
import { ActiveSubject } from "./subject";

export interface Friend
  extends Pick<Userinfo, "user_id" | "name" | "timezone"> {
  friend_id: string;
  friendship_id: string;
  date: number;
}

export interface FriendStatus
  extends Pick<Userinfo, "user_id" | "name" | "timezone" | "created_at"> {
  study_time: number;
  active_subject?: ActiveSubject;
  active_group?: ActiveGroup;
}

export interface FriendTrend {
  date: number;
  friends: Omit<FriendStatus, "active_subject">[];
}

export type SearchedUser = Pick<Userinfo, "user_id" | "name" | "timezone">;

export type RecommendedUsers = Pick<Userinfo, "user_id" | "name" | "timezone">;

// get /friends
export type FriendsResponse = ApiResponse<{ friends: Friend[] }>;

// get /friends/search
export type FriendsSearchResponse = ApiResponse<{ users: SearchedUser[] }>;

// get /friends/recommended
export type FriendsRecommendedResponse = ApiResponse<{
  users: RecommendedUsers[];
}>;

// get /friends/status
export type FriendsStatusResponse = ApiResponse<{
  friends: FriendStatus[];
}>;

// get /friends/trends
export type FriendsTrendResponse = ApiResponse<{
  trends: FriendTrend[];
}>;
