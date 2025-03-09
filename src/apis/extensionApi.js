import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";
import { DateTime } from "luxon";

async function getExtensionSettings() {
  return requestHandler(AxiosInstance.get(`/extension/settings`));
}

async function putExtensionSetting(url) {
  return requestHandler(AxiosInstance.put(`/extension/setting`, { url }));
}

async function patchExtensionSetting({ website, mode, value }) {
  return requestHandler(
    AxiosInstance.patch(`/extension/setting`, {
      website,
      mode,
      value,
    })
  );
}

async function getExtensionUsage(date, mode) {
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
