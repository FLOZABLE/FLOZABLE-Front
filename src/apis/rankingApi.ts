import { ViewerType } from "@/types/othersTypes";
import { RankingsResponse, UserRankingsResponse } from "@/types/rankingTypes";
import AxiosInstance from "@/utils/axiosInstance";
import { getTimezone, requestHandler } from "@/utils/tools";
import { DateTime } from "luxon";

export async function getRankings(
  viewer: ViewerType,
  viewDate: Date
): Promise<RankingsResponse> {
  const date = DateTime.fromJSDate(viewDate).toISODate();
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.get("/ranking", {
      params: { viewer, date, timezone },
    })
  );
}

export async function getUserRankings(
  userId: string,
  viewer: ViewerType,
  viewDate: Date
): Promise<UserRankingsResponse> {
  const date = DateTime.fromJSDate(viewDate).toISODate();
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.get(`/ranking/${userId}`, {
      params: { viewer, date, timezone },
    })
  );
}
