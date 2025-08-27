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
};
