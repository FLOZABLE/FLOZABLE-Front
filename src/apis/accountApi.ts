import AxiosInstance from "@/lib/axiosInstance";
import { getTimezone, requestHandler } from "@/lib/utils";
import {
  AccountGoogleResponse,
  AccountPatchResponse,
  AccountProfileResponse,
  AccountProfileStatusResponse,
  AccountResponse,
} from "@/types/accountTypes";
import { SuccessResponse } from "@/types/responseTypes";

export async function getAccount(): Promise<AccountResponse> {
  return requestHandler(AxiosInstance.get(`/account`));
}

export async function getAccountProfile(
  userId: string,
): Promise<AccountProfileResponse> {
  const timezone = getTimezone();

  return requestHandler(
    AxiosInstance.get(`/account/${userId}/profile`, {
      params: { timezone },
    }),
  );
}
export async function getAccountProfileStatus(
  userId: string,
): Promise<AccountProfileStatusResponse> {
  return requestHandler(
    AxiosInstance.get(`/account/profile/status`, {
      params: { user_id: userId },
    }),
  );
}

export async function getAccountGoogle(): Promise<AccountGoogleResponse> {
  return requestHandler(AxiosInstance.get(`/account/google`));
}

type PatchAccountInfoParams = {
  name: string;
  email: string;
};
export async function patchAccountInfo({
  name,
  email,
}: PatchAccountInfoParams): Promise<AccountPatchResponse> {
  return requestHandler(
    AxiosInstance.patch(`/account/info`, {
      name,
      email,
    }),
  );
}

export async function patchAccountImage(
  formData: FormData,
): Promise<SuccessResponse> {
  return requestHandler(
    AxiosInstance.patch(`/account/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );
}

type PatchAccountPasswordParams = {
  password: string;
};
export async function patchAccountPassword({
  password,
}: PatchAccountPasswordParams): Promise<SuccessResponse> {
  return requestHandler(
    AxiosInstance.patch(`/account/password`, {
      password,
    }),
  );
}
