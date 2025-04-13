import { ApiResponse } from "./response";

export interface WebsiteSetting {
  website: string;
  block: boolean;
  study_block: boolean;
  timer: boolean;
  study_timer: boolean;
}

export interface WebsiteUsage {
  website: string;
  visits: number;
  duration: number;
}

// get /extension/settings
export type ExtensionSettingsResponse = ApiResponse<{
  settings: WebsiteSetting[];
}>;

// GET /extension/usage
export type ExtensionUsageResponse = ApiResponse<{
  usage: WebsiteUsage[];
}>;
