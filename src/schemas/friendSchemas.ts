import { z } from "zod";

import { accountSchemas } from "./accountSchemas";

export const getFriendSearchSchema = z.object({
  name: accountSchemas.name,
});

export type getFriendSearchSchemaSchemaValues = z.infer<typeof getFriendSearchSchema>;
