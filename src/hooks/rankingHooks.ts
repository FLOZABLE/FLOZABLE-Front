import { getRankings, getUserRankings } from "@/apis/rankingApi";
import { ViewerType } from "@/types/otherTypes";
import { useQuery } from "@tanstack/react-query";

export function useRankings(viewer: ViewerType, viewDate: Date) {
  const queryResult = useQuery({
    queryKey: [`useRankings`, viewer, viewDate],
    queryFn: () => getRankings(viewer, viewDate),
    staleTime: 1000 * 60 * 5,
    enabled: !!viewer && !!viewDate,
    select: (response) => response?.data?.rankings || [],
  });

  const { data: rankingsData, isLoading: rankingsIsLoading } = queryResult;

  return { rankingsData, rankingsIsLoading, ...queryResult };
}

export function useRankingsUser(
  userId: string,
  viewer: ViewerType,
  viewDate: Date,
) {
  const queryResult = useQuery({
    queryKey: [`useRankingsUser`, userId, viewer, viewDate],
    queryFn: () => getUserRankings(userId, viewer, viewDate),
    staleTime: 1000 * 60,
    enabled: !!userId && !!viewer && !!viewDate,
    select: (response) => response?.data?.rankings || [],
  });

  const { data: rankingsUserData, isLoading: rankingsUserIsLoading } =
    queryResult;

  return { rankingsUserData, rankingsUserIsLoading, ...queryResult };
}
