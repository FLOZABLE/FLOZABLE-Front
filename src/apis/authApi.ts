import { PostAuthVerifyResponse } from "@/types/authTypes";
import { SuccessResponse } from "@/types/responseTypes";
import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

export async function getAuthLogout(): Promise<SuccessResponse> {
  return requestHandler(AxiosInstance.get(`/auth/logout`));
}

export async function postAuthVerify(): Promise<PostAuthVerifyResponse> {
  return requestHandler(AxiosInstance.post(`/auth/verify`));
}

type PostAuthSigninParams = {
  email: string;
  password: string;
};
export async function postAuthSignin({
  email,
  password,
}: PostAuthSigninParams): Promise<SuccessResponse> {
  return requestHandler(
    AxiosInstance.post(`/auth/login`, {
      email,
      password,
    })
  );
}

type PostAuthSignupParams = {
  name: string;
  email: string;
  password: string;
  timezone: string;
};
export async function postAuthSignup({
  name,
  email,
  password,
  timezone,
}: PostAuthSignupParams): Promise<SuccessResponse> {
  return requestHandler(
    AxiosInstance.post(`/auth/signup`, {
      name,
      email,
      password,
      timezone,
    })
  );
}
