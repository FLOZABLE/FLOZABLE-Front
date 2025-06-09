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
    .max(10, { message: "Group name cannot exceed 10 characters." })
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
};

export const postGroupJoinSchema = (visibility: boolean) =>
  z.object({
    group_id: groupSchemas.group_id,
    password: visibility ? z.string().optional() : groupSchemas.password,
  });
