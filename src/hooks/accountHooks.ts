import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getAccount, getAccountGoogle } from "@/apis/accountApi";
import { useCallback } from "react";
import {
  Account,
  AccountGoogleResponse,
  AccountResponse,
  GoogleAccount,
} from "@/types/account";
import { updateQueryData } from "@/utils/tools";

export function useAccount() {
  const queryClient = useQueryClient();

  // Fetch account data with useQuery
  const queryResult = useQuery({
    queryKey: ["useAccount"],
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
    queryClient.removeQueries({ queryKey: ["useAccount"] });
  }, [queryClient]);

  const updateUserInfo = useCallback(
    async (newData: Account | ((oldValue: Account) => Account)) => {
      await queryClient.setQueryData(
        ["useAccount"],
        (oldData: AccountResponse | undefined) => {
          if (!oldData) return oldData;
          return updateQueryData(oldData, newData, "userinfo");
        }
      );
    },
    [queryClient]
  );

  return {
    account,
    accountRefetch,
    accountError,
    accountIsLoading,
    clearAccountData,
    updateUserInfo,
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

  const updateGoogleInfo = useCallback(
    async (
      newData: GoogleAccount | ((oldValue: GoogleAccount) => GoogleAccount)
    ) => {
      await queryClient.setQueryData<AccountGoogleResponse>(
        ["useAccountGoogle"],
        (oldData: AccountGoogleResponse | undefined) => {
          if (!oldData) return oldData;
          return updateQueryData(oldData, newData, "google_info");
        }
      );
    },
    [queryClient]
  );

  return {
    accountGoogleData,
    accountGoogleRefetch,
    accountGoogleError,
    accountGoogleIsLoading,
    clearAccountGoogleData,
    updateGoogleInfo,
  };
}
