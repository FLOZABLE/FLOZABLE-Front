import ct from "countries-and-timezones";
import { DateTime } from "luxon";

export function getCountryCode(timezone) {
  try {
    const timeZoneData = ct.getTimezone(timezone);
    if (timeZoneData && timeZoneData.countries[0]) {
      return timeZoneData.countries[0];
    }
    return false;
  } catch (error) {
    console.error(
      `Error getting country code for timezone ${timezone}:`,
      error
    );
    return false;
  }
}

export function toTimer(sec) {
  const positiveSec = sec < 0 ? 0 : sec;

  const hrDisp = Math.floor(positiveSec / 3600)
    .toString()
    .padStart(2, "0");
  const minDisp = Math.floor((positiveSec / 60) % 60)
    .toString()
    .padStart(2, "0");
  const secDisp = Math.floor(positiveSec % 60)
    .toString()
    .padStart(2, "0");
  return `${hrDisp}:${minDisp}:${secDisp}`;
}

export function getTimezone() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timezone;
}

export async function requestHandler(request) {
  //no catching when request is get to trigger react query error
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (error.config.method === "get") {
      //throw error;
    }

    if (error.response) {
      return error.response.data;
    }
    return { success: false };
  }
}

export function updateQueryData(oldData, newData, key) {
  try {
    if (!oldData?.success) return oldData;
    if (typeof newData === "function") {
      return {
        ...oldData,
        data: { ...oldData.data, [key]: newData(oldData.data[key]) },
      };
    }
    return { ...oldData, data: { ...oldData.data, [key]: newData } };
  } catch (err) {
    return oldData;
  }
}
