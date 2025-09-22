import { ApiResponse } from "./responseTypes";

export type WebsiteSettingMode =
  | "block"
  | "study_block"
  | "timer"
  | "study_timer";

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

// GET /extension/settings
export type ExtensionSettingsResponse = ApiResponse<{
  settings: WebsiteSetting[];
}>;

// GET /extension/usage
export type ExtensionUsageResponse = ApiResponse<{
  usage: WebsiteUsage[];
}>;

// PUT /extension/setting
export type PutExtensionSettingResponse = ApiResponse<{
  setting: WebsiteSetting;
}>;

// PATCH /extension/setting
export type PatchExtensionSettingResponse = ApiResponse<{
  setting: WebsiteSetting;
}>;

// PATCH /extension/setting
/* export type PatchExtensionSettingResponse = ApiResponse<{
  usage: WebsiteUsage[];
}>;
 */
