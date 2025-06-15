import {
  getAccount,
  getAccountGoogle,
  getAccountProfile,
} from "@/apis/accountApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useAccount() {
  const queryClient = useQueryClient();

  // Fetch account data with useQuery
  const queryResult = useQuery({
    queryKey: ["account"],
    queryFn: getAccount,
    staleTime: 1000 * 60 * 10, // 10 minutes
    select: (response) => response?.data?.userinfo,
  });

  const {
    data: account,
    refetch: accountRefetch,
    isLoading: accountIsLoading,
    error: accountError,
  } = queryResult;

  const clearAccountData = useCallback(() => {
    queryClient.removeQueries({ queryKey: ["account"] });
  }, [queryClient]);

  return {
    account,
    accountRefetch,
    accountError,
    accountIsLoading,
    clearAccountData,
    ...queryResult,
  };
}

export function useAccountGoogle() {
  const queryClient = useQueryClient();
  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: ["accountGoogle"],
    queryFn: getAccountGoogle,
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!account,
    select: (response) => response?.data?.google_info,
  });

  const {
    data: accountGoogleData,
    refetch: accountGoogleRefetch,
    error: accountGoogleError,
    isLoading: accountGoogleIsLoading,
  } = queryResult;

  const clearAccountGoogleData = useCallback(() => {
    queryClient.removeQueries({ queryKey: ["accountGoogle"] });
  }, [queryClient]);

  return {
    accountGoogleData,
    accountGoogleRefetch,
    accountGoogleError,
    accountGoogleIsLoading,
    clearAccountGoogleData,
  };
}

export function useAccountProfile(userId: string) {
  const queryResult = useQuery({
    queryKey: [`accountProfile`, userId],
    queryFn: () => getAccountProfile(userId),
    staleTime: 1000 * 60 * 10,
    enabled: !!userId,
    select: (response) => response?.data,
  });

  const {
    data: accountProfile,
    isLoading: accountProfileIsLoading,
    error: accountProfileError,
  } = queryResult;

  return {
    accountProfile,
    accountProfileIsLoading,
    accountProfileError,
    ...queryResult,
  };
}
