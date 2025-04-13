import {
  ExtensionSettingsResponse,
  ExtensionUsageResponse,
} from "./../types/website";
import AxiosInstance from "@/utils/axiosInstance";
import { getTimezone, requestHandler } from "@/utils/tools";
import { DateTime } from "luxon";

async function getExtensionSettings(): Promise<ExtensionSettingsResponse> {
  return requestHandler(AxiosInstance.get(`/extension/settings`));
}

async function putExtensionSetting(url: string) {
  return requestHandler(AxiosInstance.put(`/extension/setting`, { url }));
}

type PatchExtensionSettingParams = {
  website: string;
  mode: string;
  value: string;
};
async function patchExtensionSetting({
  website,
  mode,
  value,
}: PatchExtensionSettingParams) {
  return requestHandler(
    AxiosInstance.patch(`/extension/setting`, {
      website,
      mode,
      value,
    })
  );
}

async function getExtensionUsage(
  date: Date,
  mode: string
): Promise<ExtensionUsageResponse> {
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.get(`/extension/usage`, {
      params: {
        date: DateTime.fromJSDate(date).toISODate(),
        mode,
        timezone,
      },
    })
  );
}

export {
  getExtensionUsage,
  putExtensionSetting,
  patchExtensionSetting,
  getExtensionSettings,
};
