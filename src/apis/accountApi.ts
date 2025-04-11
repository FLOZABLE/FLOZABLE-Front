import {
  AccountGoogleResponse,
  AccountPatchResponse,
  AccountProfileResponse,
  AccountProfileStatusResponse,
  AccountResponse,
} from "@/types/account";
import { SuccessResponse } from "@/types/response";
import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

async function getAccount(): Promise<AccountResponse> {
  return requestHandler(AxiosInstance.get(`/account`));
}

async function getAccountProfile(
  userId: string
): Promise<AccountProfileResponse> {
  return requestHandler(
    AxiosInstance.get(`/account/profile`, {
      params: { user_id: userId },
    })
  );
}
async function getAccountProfileStatus(
  userId: string
): Promise<AccountProfileStatusResponse> {
  return requestHandler(
    AxiosInstance.get(`/account/profile/status`, {
      params: { user_id: userId },
    })
  );
}

async function getAccountGoogle(): Promise<AccountGoogleResponse> {
  return requestHandler(AxiosInstance.get(`/account/google`));
}

type PatchAccountInfoParams = {
  name: string;
  email: string;
};
async function patchAccountInfo({
  name,
  email,
}: PatchAccountInfoParams): Promise<AccountPatchResponse> {
  return requestHandler(
    AxiosInstance.patch(`/account`, {
      name,
      email,
    })
  );
}

async function patchAccountImage(formData: FormData): Promise<SuccessResponse> {
  return requestHandler(
    AxiosInstance.patch(`/account/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
}

type PatchAccountPasswordParams = {
  password: string;
};
async function patchAccountPassword({
  password,
}: PatchAccountPasswordParams): Promise<SuccessResponse> {
  return requestHandler(
    AxiosInstance.patch(`/account/password`, {
      password,
    })
  );
}

export {
  getAccount,
  getAccountProfile,
  getAccountProfileStatus,
  getAccountGoogle,
  patchAccountInfo,
  patchAccountImage,
  patchAccountPassword,
};
