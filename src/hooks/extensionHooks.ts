import { getExtensionSettings, getExtensionUsage } from "@/apis/extensionApi";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "./accountHooks";

function useExtensionSettings() {
  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: [`extensionSettings`],
    queryFn: getExtensionSettings,
    staleTime: 1000 * 60,
    enabled: !!account,
    select: (response) => response?.data?.settings,
  });

  const { data: extensionSettings, isLoading: extensionSettingsIsLoading } =
    queryResult;

  return {
    extensionSettings,
    extensionSettingsIsLoading,
    ...queryResult,
  };
}

function useExtensionUsage(date: Date, mode: string) {
  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: [`extensionUsage`, date, mode],
    queryFn: () => getExtensionUsage(date, mode),
    staleTime: 1000 * 5,
    enabled: !!account,
    refetchOnWindowFocus: true,
    select: (response) => response?.data?.usage,
  });

  const { data: extensionUsage, isLoading: extensionUsageIsLoading } =
    queryResult;

  return { extensionUsage, extensionUsageIsLoading, ...queryResult };
}

export { useExtensionSettings, useExtensionUsage };
