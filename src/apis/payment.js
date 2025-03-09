import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

async function postSubscriptionInitialize(priceId) {
  return requestHandler(
    AxiosInstance.post(`/payment/subscription/initialize`, { priceId })
  );
}

async function getProduct(priceId) {
  return requestHandler(
    AxiosInstance.get(`/payment/product`, {
      params: { priceId },
    })
  );
}

export { postSubscriptionInitialize, getProduct };
