import { getUserProfile } from "@/apis/userApi";
import { useQuery } from "@tanstack/react-query";

export function useUserProfile(userId: string) {
  const queryResult = useQuery({
    queryKey: [`userProfile`, userId],
    queryFn: () => getUserProfile(userId),
    staleTime: 1000 * 60 * 10,
    enabled: !!userId,
    select: (response) => response?.data,
  });

  const {
    data: userProfile,
    isLoading: userProfileIsLoading,
    error: userProfileError,
  } = queryResult;

  return {
    userProfile,
    userProfileIsLoading,
    userProfileError,
    ...queryResult,
  };
}
