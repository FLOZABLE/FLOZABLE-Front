import { validateURL } from "@/lib/validate";
import { z } from "zod";

export const otherSchemas = {
  youtube_video_id: z
    .string()
    .url()
    .refine(
      (val: string) => {
        // Regex to match various YouTube URL formats and capture the video ID.
        const regex =
          /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/))([\w-]{11})/;
        return regex.test(val);
      },
      {
        message:
          "Invalid YouTube URL: must be from youtube.com and contain a ?video_id= parameter",
      },
    ),

  url: z
    .string()
    .min(1, "Please provide URL")
    .refine((value) => ({
      message: validateURL(value).reason || "Invalid URL",
    })),

  date: z.iso.datetime({ offset: true }) /* .messages({
    "any.required": "Date is required.",
    "string.empty": "Date cannot be empty.",
    "string.isoDate": "Date must be a valid ISO 8601 string.",
  }), */,
};
