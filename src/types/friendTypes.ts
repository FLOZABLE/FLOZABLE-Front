import { Userinfo, UserStatus } from "./accountTypes";
import { ActiveGroup } from "./groupTypes";
import { ApiResponse } from "./responseTypes";

// Minimal friend object (for friend list)
export interface Friend
  extends Pick<Userinfo, "user_id" | "name" | "timezone"> {
  friend_id: string;
  friendship_id: string;
  date: number;
}

// Friend with detailed status
export interface FriendStatus
  extends Pick<Userinfo, "user_id" | "name" | "timezone" | "created_at"> {
  study_time: number;
  status?: UserStatus;
  active_group?: ActiveGroup;
}

// Friend trend entry per date
export interface FriendTrend {
  date: number;
  friends: Omit<FriendStatus, "active_group">[]; // removed incorrect "active_subject"
}

// --- API Response Types ---

// GET /friend/all
export type FriendsResponse = ApiResponse<{ friends: Friend[] }>;

// GET /friend/search
export type FriendSearchResponse = ApiResponse<{ users: Userinfo[] }>;

// GET /friend/recommended
export type RecommendedFriendsResponse = ApiResponse<{ users: Userinfo[] }>;

// GET /friend/status
export type FriendsStatusResponse = ApiResponse<{ friends: FriendStatus[] }>;

// GET /friend/trends
export type FriendsTrendsResponse = ApiResponse<{ trends: FriendTrend[] }>;
