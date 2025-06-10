import {
  postAuthSigninSchema,
  postAuthSignupSchema,
} from "@/schemas/authSchemas";
import { ApiResponse } from "./responseTypes";
import { z } from "zod";

// POST /auth/verify
export type PostAuthVerifyResponse = ApiResponse<{
  token: string;
  user_id: string;
}>;

//forms
export type PostAuthSignupSchemaValues = z.infer<typeof postAuthSignupSchema>;
export type PostAuthSigninSchemaValues = z.infer<typeof postAuthSigninSchema>;
