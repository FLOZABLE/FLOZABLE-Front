import { z } from "zod";

import { accountSchemas } from "./accountSchemas";

export const postAuthSignupSchema = z.object({
  email: accountSchemas.email,
  name: accountSchemas.name,
  password: accountSchemas.password,
  timezone: accountSchemas.timezone,
});
export type PostAuthSignupSchemaValues = z.infer<typeof postAuthSignupSchema>;

export const postAuthSigninSchema = z.object({
  email: accountSchemas.email,
  password: accountSchemas.password,
});

export type PostAuthSigninSchemaValues = z.infer<typeof postAuthSigninSchema>;
