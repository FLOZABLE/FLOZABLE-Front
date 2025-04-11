import { PostAuthVerifyResponse } from "@/types/auth";
import { SuccessResponse } from "@/types/response";
import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

async function getAuthLogout(): Promise<SuccessResponse> {
  return requestHandler(AxiosInstance.get(`/auth/logout`));
}

async function postAuthVerify(): Promise<PostAuthVerifyResponse> {
  return requestHandler(AxiosInstance.post(`/auth/verify`));
}

type PostAuthSigninParams = {
  email: string;
  password: string;
};
async function postAuthSignin({
  email,
  password,
}: PostAuthSigninParams): Promise<SuccessResponse> {
  return requestHandler(
    AxiosInstance.post(`/auth/signin`, {
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
async function postAuthSignup({
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

export { getAuthLogout, postAuthVerify, postAuthSignin, postAuthSignup };
