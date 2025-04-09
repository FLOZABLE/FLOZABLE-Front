import { ApiResponse } from "./response";

// post /auth/verify
export type PostAuthVerifyResponse = ApiResponse<{
  token: string;
  user_id: string;
}>;
