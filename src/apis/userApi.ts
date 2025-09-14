import AxiosInstance from "@/lib/axiosInstance";
import { getTimezone, requestHandler } from "@/lib/utils";
import { AccountProfileResponse } from "@/types/userTypes";

export async function getUserProfile(
  userId: string,
): Promise<AccountProfileResponse> {
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.get(`/account/${userId}/profile`, {
      params: { timezone },
    }),
  );
}
