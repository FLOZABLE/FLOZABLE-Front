import { z } from "zod";

import { otherSchemas } from "./otherSchemas";

export const themeSchemas = {
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(10, { message: "Name cannot exceed 10 characters." })
    .refine((val) => val.trim() !== "", {
      message: "Name cannot be empty.",
    }),

  description: z
    .string()
    .max(1000, { message: "Description cannot exceed 1000 characters." })
    .refine((val) => val.trim() !== "", {
      message: "Description cannot be empty.",
    }),

  tags: z
    .array(z.string().min(1).max(50))
    .max(50, { message: "You can specify up to 50 tags." }),
};

export const putThemeSchema = z.object({
  name: themeSchemas.name,
  description: themeSchemas.description,
  tags: themeSchemas.tags,
  youtube_video_id: otherSchemas.youtube_video_id,
});

export type putThemeSchemaSchemaValues = z.infer<typeof putThemeSchema>;
