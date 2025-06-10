import { ApiResponse } from "./responseTypes";

// POST /auth/verify
export type PostAuthVerifyResponse = ApiResponse<{
  token: string;
  user_id: string;
}>;
