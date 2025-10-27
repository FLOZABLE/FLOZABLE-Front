import AxiosInstance from "@/lib/axiosInstance";
import { getTimezone, requestHandler } from "@/lib/utils";
import { UserProfileResponse } from "@/types/userTypes";

export async function getUserProfile(
  userId: string,
): Promise<UserProfileResponse> {
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.get(`/user/${userId}/profile`, {
      params: { timezone },
    }),
  );
}
