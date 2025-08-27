import { getThemeAll } from "@/apis/themeApi";
import { useQuery } from "@tanstack/react-query";

export function useThemes() {
  const queryResult = useQuery({
    queryKey: [`themes`],
    queryFn: getThemeAll,
    staleTime: 1000 * 60 * 10,
    select: (response) => response?.data?.themes || [],
  });

  const { data: themesData, isLoading: themesIsLoading } = queryResult;

  return { themesData, themesIsLoading, ...queryResult };
}
