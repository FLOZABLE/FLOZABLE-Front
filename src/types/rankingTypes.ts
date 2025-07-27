import { Userinfo } from "./accountTypes";
import { ApiResponse } from "./responseTypes";

// Ranking for a user on a specific day
export interface Ranking
  extends Pick<Userinfo, "user_id" | "name" | "timezone" | "created_at"> {
  rank: number;
  study_time: number;
  date: string;
}

// Historical ranking summary for a single user
export interface UserRanking {
  ranking: number;
  date: string;
}

// GET /ranking
export type RankingsResponse = ApiResponse<{ rankings: Ranking[] }>;

// GET /ranking/:user_id
export type UserRankingsResponse = ApiResponse<{ rankings: UserRanking[] }>;
