import { ApiResponse } from "./responseTypes";

export interface Theme {
  theme_id: string;
  theme_likes: string[];
  name: string;
  description: string;
  video_id: string;
  tags: string[];
}

// GET /theme/all
export type GetThemeAllResponse = ApiResponse<{
  themes: Theme[];
}>;
