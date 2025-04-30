import {
  getRankings,
  getRankingsFriends,
  getRankingsUser,
} from "@/apis/rankingsApi";
import { ViewerType } from "@/types/others";
import { useQuery } from "@tanstack/react-query";

function useRankings(viewer: ViewerType, viewDate: Date) {
  const queryResult = useQuery({
    queryKey: [`getRankings`, viewer, viewDate],
    queryFn: () => getRankings(viewer, viewDate),
    staleTime: 1000 * 60 * 5,
    enabled: !!viewer && !!viewDate,
    select: (response) => response?.data?.rankings || [],
  });

  const { data: rankingsData, isLoading: rankingsIsLoading } = queryResult;

  return { rankingsData, rankingsIsLoading, ...queryResult };
}

function useRankingsUser(userId: string, viewer: ViewerType, viewDate: Date) {
  const queryResult = useQuery({
    queryKey: [`getRankingsUser`, userId, viewer, viewDate],
    queryFn: () => getRankingsUser(userId, viewer, viewDate),
    staleTime: 1000 * 60,
    enabled: !!userId && !!viewer && !!viewDate,
    select: (response) => response?.data?.rankings || [],
  });

  const { data: rankingsUserData, isLoading: rankingsUserIsLoading } =
    queryResult;

  return { rankingsUserData, rankingsUserIsLoading, ...queryResult };
}

function useRankingsFriends(viewer: ViewerType) {
  return useQuery({
    queryKey: [`getRankingsFriends`, viewer],
    queryFn: () => getRankingsFriends(viewer),
    staleTime: 1000 * 60,
    enabled: !!viewer,
  });
}

export { useRankings, useRankingsUser, useRankingsFriends };
