import { Userinfo } from "./accountTypes";
import { ApiResponse } from "./responseTypes";

export interface Ranking
  extends Pick<Userinfo, "user_id" | "name" | "timezone" | "created_at"> {
  ranking: number;
  study_time: number;
  date: string;
}

export interface RankingUser {
  ranking: number;
  date: string;
}

// get /rankings
export type RankingsResponse = ApiResponse<{ rankings: Ranking[] }>;

// get /rankings/user
export type RankingsUserResponse = ApiResponse<{ rankings: RankingUser[] }>;
