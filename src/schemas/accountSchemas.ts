import { z } from "zod";

export const accountSchemas = {
  user_id: z
    .string()
    .length(10, { message: "User id must be exactly 10 characters." })
    .refine((val) => val.trim() !== "", {
      message: "User id cannot be empty.",
    }),

  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(10, { message: "Name cannot exceed 10 characters." })
    .refine((val) => val.trim() !== "", {
      message: "Name cannot be empty.",
    }),

  timezone: z.string().refine((val) => val.trim() !== "", {
    message: "Timezone cannot be empty.",
  }),

  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid email address." })
    .refine((val) => val.trim() !== "", {
      message: "Email cannot be empty.",
    }),

  password: z
    .string()
    .min(8, { message: "Password is too short (8 characters minimum)." })
    .max(20, { message: "Password is too long (20 characters maximum)." })
    .refine((val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val), {
      message: "You need special characters.",
    })
    .refine((val) => val.trim() !== "", {
      message: "Please provide a password.",
    }),
};
