import AxiosInstance from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/utils";
import {
  AccountGoogleResponse,
  AccountPatchResponse,
  AccountResponse,
} from "@/types/accountTypes";
import { SuccessResponse } from "@/types/responseTypes";

export async function getAccount(): Promise<AccountResponse> {
  return requestHandler(AxiosInstance.get(`/account`));
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

type PutAccountProfileImage = {
  formData: FormData;
};
export async function putAccountProfileImage({
  formData,
}: PutAccountProfileImage): Promise<SuccessResponse> {
  return requestHandler(
    AxiosInstance.put(`/account/profile/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );
}
