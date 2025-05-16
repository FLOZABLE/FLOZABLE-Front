import axios, {
  AxiosInstance as AxiosInstanceType,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import config from "./config"; // Assuming config.ts exports an object with a 'server' string property
import axiosRetry from "axios-retry";
import { toast } from "sonner"; // Assuming 'sonner' library has TypeScript types
import { ApiResponse } from "@/types/response";

// Define the type for the Axios Instance
const AxiosInstance: AxiosInstanceType = axios.create({
  baseURL: config.server, // Assuming config.server is a string
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Add index signature if headers can have arbitrary string keys
    // [key: string]: string;
  } as AxiosRequestConfig["headers"], // Cast to ensure correct header type structure
});

// Define the retry configuration with types
const retryConfig = {
  retries: 2,
  retryCondition: (error: AxiosError): boolean => {
    /* console.log(
      "Retry condition triggered. Error code:",
      error.code,
      "Message:",
      error.message
    ); */
    // Retry for network errors and specific HTTP status codes
    if (error.code === "ECONNABORTED" || error.message === "Network Error") {
      return true;
    }

    const retryableStatusCodes = [500, 502, 503, 504, 408];
    // Use optional chaining when accessing error.response and status
    return (
      error.response?.status !== undefined &&
      retryableStatusCodes.includes(error.response.status)
    );
  },
  retryDelay: (retryCount: number): number => {
    // Optional delay between retries (e.g., exponential backoff)
    return Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s, etc.
  },
};

axiosRetry(AxiosInstance, retryConfig);

// Add Response Interceptor
AxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Use optional chaining for safe access
    const message = response?.data?.message;
    const type = response?.data?.status === 200 ? "success" : "error";

    // Check if both message and a valid type exist before toasting
    if (message && (type === "success" || type === "error")) {
      toast[type](message);
    }
    return response;
  },
  (err: AxiosError<ApiResponse>) => {
    // TypeScript now knows err.response?.data might have a message
    if (err?.response?.data?.message) {
      // Accessing err.response.data.message is now type-safe
      toast.error(String(err.response.data.message)); // Still good practice to cast to String
    } else {
      console.error("Axios Interceptor Error:", err);
      // toast.error(err.message || 'An unexpected error occurred.'); // Handle other error cases
    }

    return Promise.reject(err);
  }
);

export default AxiosInstance;
