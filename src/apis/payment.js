import AxiosInstance from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/utils";

async function postSubscriptionInitialize(priceId) {
  return requestHandler(
    AxiosInstance.post(`/payment/subscription/initialize`, { priceId }),
  );
}

async function getProduct(priceId) {
  return requestHandler(
    AxiosInstance.get(`/payment/product`, {
      params: { priceId },
    }),
  );
}

export { postSubscriptionInitialize, getProduct };
