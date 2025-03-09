import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

async function getAuthLogout() {
  return requestHandler(AxiosInstance.get(`/auth/logout`));
}

async function postAuthVerify() {
  return requestHandler(AxiosInstance.post(`/auth/verify`));
}

async function postAuthSignin({ email, password }) {
  return requestHandler(
    AxiosInstance.post(`/auth/signin`, {
      email,
      password,
    })
  );
}

async function postAuthSignup({ name, email, password, timezone }) {
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
