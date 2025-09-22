import { z } from "zod";

import { otherSchemas } from "./otherSchemas";

export const extensionSettingFormSchema = z.object({
  url: otherSchemas.url,
});

export type ExtensionSettingFormType = z.infer<
  typeof extensionSettingFormSchema
>;
