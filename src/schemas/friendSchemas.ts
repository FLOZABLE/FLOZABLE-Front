import { z } from "zod";

import { accountSchemas } from "./accountSchemas";

export const getFriendSearchSchema = z.object({
  name: accountSchemas.name,
});

export type getFriendSearchSchemaValues = z.infer<typeof getFriendSearchSchema>;
