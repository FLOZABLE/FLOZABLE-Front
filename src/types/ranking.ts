import { Userinfo } from "./account";
import { ApiResponse } from "./response";

export interface Ranking
  extends Pick<Userinfo, "user_id" | "name" | "timezone" | "created_at"> {
  rank: number;
  study_time: number;
}

// get /rankings
export type RankingsResponse = ApiResponse<{ rankings: Ranking[] }>;

// get /rankings/user
export type RankingsUserResponse = ApiResponse<{ rankings: Ranking[] }>;
