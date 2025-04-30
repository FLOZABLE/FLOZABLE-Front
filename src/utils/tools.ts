import { DateTime, DateTimeUnit } from "luxon";
//import { postNotificationsSubscribe } from "@/Api/notificationsApi";
import * as ct from "countries-and-timezones";
import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse } from "@/types/response";
import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import { GroupedSubjects } from "@/types/subject";
import { ViewerType } from "@/types/others";

function getCountryCode(timezone: string): string | false {
  try {
    const timeZoneData = ct.getTimezone(timezone);
    // tim
    if (timeZoneData && timeZoneData.countries[0]) {
      return timeZoneData.countries[0];
    }
    return false;
  } catch (error: unknown) {
    console.error(
      `Error getting country code for timezone ${timezone}:`,
      error
    );
    return false;
  }
}

function toTimer(sec: number): string {
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

function getTimezone(): string {
  const timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timezone;
}

const secondConverter = ({
  sec,
  options = ["s", "m", "h"],
  precise = false,
}: {
  sec: number;
  options?: string[];
  precise?: boolean;
}): string => {
  const value: number = sec ? sec : 0;
  const hour = Math.floor(value / (60 * 60));
  const minute = Math.floor((value / 60) % 60);
  const second = value % 60;

  let formattedValue = "";

  if (hour) {
    formattedValue += `${hour} ${options[2]} `;
  }

  if (minute || (!hour && !second)) {
    formattedValue += `${minute} ${options[1]} `;
  }

  if (second && (precise || (!hour && !minute))) {
    formattedValue += `${second} ${options[0]} `;
  }
  return formattedValue;
};

const durationFormatter = (sec: number): string => {
  let res = "";
  let hours = 0;
  if (sec >= 3600) {
    hours = Math.floor(sec / 3600);
    sec = sec % 3600;
  }
  let mins = 0;
  if (sec >= 60) {
    mins = Math.floor((sec / 60) % 60);
    sec = sec % 60;
  }

  if (hours > 0) {
    res = hours + "hr " + mins.toString().padStart(2, "0") + "m";
  } else if (mins > 0) {
    res = mins + "m " + sec.toString().padStart(2, "0") + "s";
  } else {
    res = sec + " seconds";
  }

  return res;
};

function randomIntInRange(min: number, max: number): number {
  const randomVal: number = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomVal;
}

const focusCalculator = (grouped: Array<[number, number]>): number => {
  if (!grouped) return 0;
  let focus = 0;
  grouped.map(([start, stop]) => {
    const duration = stop - start;
    if (duration > focus) {
      focus = duration;
    }
    return null;
  });
  return focus;
};

function streakCalculator(groupedSubjects: GroupedSubjects | null) {
  if (!groupedSubjects?.day?.total) return 0;
  
  const reversedDaily = groupedSubjects.day.total.toReversed();

  let streak = 0;
  reversedDaily.find((day) => {
    if (day.data) {
      streak += 1;
      return false;
    } else {
      return true;
    }
  });

  return streak;
}

function todayTotalCalculator(groupedSubjects: {
  day?: { total?: Array<{ data?: number }> };
}): number {
  if (!groupedSubjects || !groupedSubjects?.day?.total?.length) return 0;
  const totalSeconds =
    groupedSubjects.day.total[groupedSubjects.day.total.length - 1].data;
  return totalSeconds ? totalSeconds : 0;
}

function todayFocusCalculator(groupedSubjects: {
  day?: { focus?: Array<{ data?: number }> };
}): number {
  if (!groupedSubjects || !groupedSubjects?.day?.focus?.length) return 0;
  const totalSeconds =
    groupedSubjects.day.focus[groupedSubjects.day.focus.length - 1].data;
  return totalSeconds ? totalSeconds : 0;
}

async function requestNotification(applicationServerKey: string): Promise<any> {
  // Helper function to check if service workers and push are supported
  function isSupported(): boolean {
    return "serviceWorker" in navigator && "PushManager" in window;
  }

  // Check if service workers and push notifications are supported
  if (!isSupported()) {
    console.log("Service Worker or Push API not supported");
    return { success: false, reason: "Browser unsupported" };
  }

  // Check if notification permission is already granted
  if (Notification.permission === "granted") {
    console.log("Notification permission already granted");
    return { success: true };
  }

  try {
    // Wait for the service worker to be ready
    const registration = await navigator.serviceWorker.ready;
    console.log("Service worker ready");

    // Request notification permission from the user
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      // Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });
      console.log("Push subscription:", subscription);
      const p256dh = btoa(
        String.fromCharCode(
          ...new Uint8Array(subscription.getKey("p256dh") as ArrayBuffer)
        )
      );
      const auth = btoa(
        String.fromCharCode(
          ...new Uint8Array(subscription.getKey("auth") as ArrayBuffer)
        )
      );
      const subscriptionObject = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh,
          auth,
        },
      };

      console.log(subscriptionObject);

      // Handle the subscription (e.g., send it to your server)
      /* const response = await postNotificationsSubscribe(subscriptionObject);
      return response; */
    } else {
      console.log("Push permission denied");
      return { success: false, reason: "Permission denied" };
    }
  } catch (error: any) {
    console.error("Error during push subscription:", error);
    return { success: false, reason: error.message || "Unknown error" };
  }
}

function unsubscribeFromPush(): void {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker is not supported");
    return;
  }

  navigator.serviceWorker.ready
    .then((registration) => {
      return registration.pushManager.getSubscription();
    })
    .then((subscription) => {
      if (subscription) {
        return subscription.unsubscribe();
      } else {
        console.log("No subscription found");
        return false;
      }
    })
    .then(() => {
      console.log("Successfully unsubscribed from push notifications");
    })
    .catch((error) => {
      console.error("Error unsubscribing from push notifications:", error);
    });
}

function getDates(date: Date, mode: DateTimeUnit, length: number): DateTime[] {
  const dates: DateTime[] = [];
  let dateTime = DateTime.fromJSDate(date).startOf(mode).startOf("day");
  const now = DateTime.now().startOf(mode).startOf("day");

  for (let i = 0; i < length; i++) {
    if (dateTime.plus({ [mode]: i }) <= now) {
      dates.push(dateTime.plus({ [mode]: i }));
    }
  }
  while (dates.length < length) {
    dateTime = dateTime.minus({ [mode]: 1 });
    dates.unshift(dateTime);
  }

  return dates;
}

function getDatesDisplay({
  date,
  viewer,
  formats = { day: "LLLL d", week: "LLL d", month: "kkkk LLLL" },
}: {
  date: Date;
  viewer: ViewerType;
  formats?: { day: string; week: string; month: string };
}): string {
  const dateTime = DateTime.fromJSDate(date);
  if (viewer !== "week") {
    //show single dates
    return dateTime.toFormat(formats[viewer]);
  }

  const from = dateTime.startOf(viewer).toFormat(formats[viewer]);
  const end = dateTime.endOf(viewer).toFormat(formats[viewer]);

  return `${from} - ${end}`;
}

function exitFullscreen(): void {
  try {
    if (document.fullscreenElement === null) return;

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen(); // Firefox
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen(); // Chrome, Safari, and Opera
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen(); // IE/Edge
    }
  } catch (err) {
    console.log(err);
  }
}

/* async function requestHandler<T extends { success: boolean }>(
  request: Promise<AxiosResponse<T>>
): Promise<T> {
  try {
    const response = await request;
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return { success: false, ...error.response.data } as T; // Ensuring structure
    }
    return { success: false } as T; // Ensuring `success` is always present
  }
} */

/**
 * Handles an asynchronous request and returns the response data or an error response.
 * @param request - A promise resolving to an AxiosResponse containing an ApiResponse<T>
 * @returns A promise resolving to ApiResponse<T>
 */
async function requestHandler<T>(
  request: Promise<AxiosResponse<ApiResponse<T>>>
): Promise<ApiResponse<T>> {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<T>>;
    if (axiosError.config?.method === "get") {
      // Optionally, throw the error for "get" methods to trigger React Query error handling
      // throw axiosError;
    }
    if (axiosError.response) {
      // Return the error response data if available
      return axiosError.response.data;
    }
    // Return a default error response conforming to ApiResponseBase
    return { success: false, status: 0, message: "Network Error" };
  }
}

/* function updateQueryData<T extends Record<string, any>, K extends keyof T>(
  oldData: ApiResponse<T> | undefined,
  newData: ((prev: T[K] | undefined) => T[K]) | T[K],
  key: K
): ApiResponse<T> | undefined {
  try {
    if (!oldData?.success) return oldData;

    const currentData = oldData.data;

    if (typeof newData === "function") {
      const prevValue = currentData?.[key];
      const updater = newData as (prev: T[K] | undefined) => T[K];
      const newValue = updater(prevValue);

      return {
        ...oldData,
        data: {
          ...currentData,
          [key]: newValue,
        } as T,
      };
    }

    return {
      ...oldData,
      data: {
        ...currentData,
        [key]: newData,
      } as T,
    };
  } catch (err) {
    console.log(err);
    return oldData;
  }
} */

/**
 * Updates a specific key in oldData.data with newData, which can be a value or a function.
 * @param oldData - The existing ApiResponse object to update
 * @param newData - The new value or a function to compute the new value
 * @param key - The key in oldData.data to update
 * @returns The updated ApiResponse object or the original if an error occurs
 */
function updateQueryData<
  T = { [key: string]: any },
  K extends keyof T = keyof T
>(
  oldData: ApiResponse<T> | any,
  newData: T[K] | ((oldValue: T[K]) => T[K]),
  key: K
): ApiResponse<T> {
  try {
    // Return unchanged if success is false or data is undefined
    if (!oldData?.success || !oldData.data) return oldData;

    const updatedData =
      typeof newData === "function"
        ? {
            ...oldData.data,
            [key]: (newData as (oldValue: T[K]) => T[K])(oldData.data[key]),
          }
        : { ...oldData.data, [key]: newData };

    return { ...oldData, data: updatedData };
  } catch (err) {
    console.log(err);
    // Return the original data if an error occurs
    return oldData;
  }
}

const calculateTimeToMidnight = (): number => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0); // Sets to next midnight (12 AM)
  return midnight.getTime() - now.getTime(); // Time in milliseconds until midnight
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export const formatPlanDateRange = (
  startISO: string | undefined,
  endISO: string | undefined
): string => {
  if (!startISO || !endISO) return "";

  const start = DateTime.fromISO(startISO);
  const end = DateTime.fromISO(endISO);

  const sameDay = start.hasSame(end, "day");

  if (!sameDay) {
    // Optional: handle multi-day events if needed
    return `${start.toFormat("EEE, MMM d h:mm a")} - ${end.toFormat(
      "EEE, MMM d h:mm a"
    )}`;
  }

  const weekdayDate = start.toFormat("EEEE, MMMM d");
  const startTime = start.toFormat("h:mm");
  const endTime = end.toFormat("h:mm a");

  return `${weekdayDate} ${startTime} - ${endTime}`;
};

export {
  getCountryCode,
  toTimer,
  getTimezone,
  secondConverter,
  randomIntInRange,
  durationFormatter,
  focusCalculator,
  todayTotalCalculator,
  todayFocusCalculator,
  streakCalculator,
  requestNotification,
  unsubscribeFromPush,
  getDates,
  getDatesDisplay,
  exitFullscreen,
  requestHandler,
  updateQueryData,
  calculateTimeToMidnight,
};
