import { z } from "zod";

export const groupSchemas = {
  group_id: z
    .string()
    .length(10, { message: "Group id must be exactly 10 characters." })
    .refine((val) => val.trim() !== "", {
      message: "Group id cannot be empty.",
    }),

  name: z
    .string()
    .min(2, { message: "Group name must be at least 2 characters long." })
    .max(20, { message: "Group name cannot exceed 20 characters." })
    .refine((val) => val.trim() !== "", {
      message: "Group name cannot be empty.",
    }),

  password: z
    .string()
    .min(5, { message: "Password is too short (5 characters minimum)." })
    .max(20, { message: "Password is too long (20 characters maximum)." })
    .refine((val) => val !== "", {
      message: "Please provide a password.",
    }),

  description: z
    .string()
    .max(1000, { message: "Description cannot exceed 1000 characters." })
    .refine((val) => val.trim() !== "", {
      message: "Description cannot be empty.",
    }),

  max_members: z.coerce
    .number()
    .int()
    .min(1, { message: "Max members must be at least 1." })
    .max(50, { message: "Max members cannot exceed 50." }),

  tags: z
    .array(z.string().min(1).max(50))
    .max(50, { message: "You can specify up to 50 tags." }),

  color: z
    .string()
    .max(20, { message: "Color cannot exceed 20 characters." })
    .refine((val) => val.trim() !== "", {
      message: "Color cannot be empty.",
    }),

  goal_hr: z.coerce
    .number()
    .int()
    .min(1, { message: "Goal hour must be at least 1." })
    .max(12, { message: "Goal hour cannot exceed 12." }),

  visibility: z.boolean({
    required_error: "Visibility must be true or false.",
  }),
};

export const postGroupJoinSchema = (visibility: boolean) =>
  z.object({
    password: visibility ? z.string().optional() : groupSchemas.password,
  });

export type PostGroupJoinSchemaValues = z.infer<
  ReturnType<typeof postGroupJoinSchema>
>;

export const putGroupSchema = z
  .object({
    name: groupSchemas.name,
    password: z.string().optional(),
    description: groupSchemas.description,
    max_members: groupSchemas.max_members,
    tags: groupSchemas.tags,
    color: groupSchemas.color,
    goal_hr: groupSchemas.goal_hr,
    visibility: groupSchemas.visibility,
  })
  .superRefine((data, ctx) => {
    if (!data.visibility) {
      const result = groupSchemas.password.safeParse(data.password);
      if (!result.success) {
        for (const issue of result.error.issues) {
          ctx.addIssue({
            ...issue,
            path: ["password"],
          });
        }
      }
    }
  });

export type PutGroupSchemaValues = z.infer<typeof putGroupSchema>;
