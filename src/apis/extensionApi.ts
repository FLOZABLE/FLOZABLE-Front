import AxiosInstance from "@/lib/axiosInstance";
import { getTimezone, requestHandler } from "@/lib/utils";
import { DateTime } from "luxon";

import {
  ExtensionSettingsResponse,
  ExtensionUsageResponse,
  PatchExtensionSettingResponse,
  PutExtensionSettingResponse,
  WebsiteSetting,
} from "../types/websiteTypes";

async function getExtensionSettings(): Promise<ExtensionSettingsResponse> {
  return requestHandler(AxiosInstance.get(`/extension/setting/all`));
}

async function putExtensionSetting(
  website: string,
): Promise<PutExtensionSettingResponse> {
  return requestHandler(AxiosInstance.put(`/extension/setting`, { website }));
}

async function patchExtensionSetting({
  website,
  block,
  study_block,
  timer,
  study_timer,
}: WebsiteSetting): Promise<PatchExtensionSettingResponse> {
  return requestHandler(
    AxiosInstance.patch(`/extension/setting`, {
      website,
      block,
      study_block,
      timer,
      study_timer,
    }),
  );
}

async function deleteExtensionSetting(website: string) {
  return requestHandler(
    AxiosInstance.delete(`/extension/setting`, { data: { website } }),
  );
}

async function getExtensionUsage(
  date: Date,
  mode: string,
): Promise<ExtensionUsageResponse> {
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.get(`/extension/usage`, {
      params: {
        date: DateTime.fromJSDate(date).toISODate(),
        mode,
        timezone,
      },
    }),
  );
}

export {
  getExtensionUsage,
  putExtensionSetting,
  patchExtensionSetting,
  deleteExtensionSetting,
  getExtensionSettings,
};
