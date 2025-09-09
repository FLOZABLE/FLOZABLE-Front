import { z } from "zod";

export const subjectSchema = {
  subject_id: z
    .string()
    .length(10, { message: "Subject id must be exactly 10 characters." })
    .refine((val) => val.trim() !== "", {
      message: "Subject id cannot be empty.",
    }),

  name: z
    .string()
    .min(2, { message: "Subject name must be at least 2 characters long." })
    .max(20, { message: "Subject name cannot exceed 20 characters." })
    .refine((val) => val.trim() !== "", {
      message: "Subject name cannot be empty.",
    }),

  color: z
    .string()
    .min(3, { message: "Subject color must be at least 3 characters long." })
    .max(20, { message: "Subject color cannot exceed 20 characters." })
    .refine((val) => val.trim() !== "", {
      message: "Subject color cannot be empty.",
    }),
};

export const putSubjectSchema = z.object({
  name: subjectSchema.name,
  color: subjectSchema.color,
});

export type PutSubjectSchemaValues = z.infer<typeof putSubjectSchema>;
