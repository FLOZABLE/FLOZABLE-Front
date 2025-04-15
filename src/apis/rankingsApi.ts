import { ViewerType } from "@/types/others";
import { RankingsResponse, RankingsUserResponse } from "@/types/ranking";
import AxiosInstance from "@/utils/axiosInstance";
import { getTimezone, requestHandler } from "@/utils/tools";
import { DateTime } from "luxon";

async function getRankings(
  viewer: ViewerType,
  viewDate: Date
): Promise<RankingsResponse> {
  const date = DateTime.fromJSDate(viewDate).toISODate();
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.get(`/rankings`, {
      params: { viewer, date, timezone },
    })
  );
}

async function getRankingsUser(
  userId: string,
  viewer: ViewerType,
  viewDate: Date
): Promise<RankingsUserResponse> {
  const date = DateTime.fromJSDate(viewDate).toISODate();
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.get(`/rankings/user`, {
      params: {
        viewer,
        date,
        timezone,
        user_id: userId,
      },
    })
  );
}

async function getRankingsFriends(viewer: ViewerType) {
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.get(`/rankings/friends`, {
      params: {
        viewer,
        timezone,
      },
    })
  );
}

export { getRankings, getRankingsUser, getRankingsFriends };
