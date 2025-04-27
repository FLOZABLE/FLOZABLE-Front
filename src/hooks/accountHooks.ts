import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccount, getAccountGoogle } from "@/apis/accountApi";
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
  };
}

export function useAccountGoogle() {
  const queryClient = useQueryClient();
  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: ["useAccountGoogle"],
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
    queryClient.removeQueries({ queryKey: ["useAccountGoogle"] });
  }, [queryClient]);

  return {
    accountGoogleData,
    accountGoogleRefetch,
    accountGoogleError,
    accountGoogleIsLoading,
    clearAccountGoogleData,
  };
}
