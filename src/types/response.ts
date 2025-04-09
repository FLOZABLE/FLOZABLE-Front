export interface ApiResponseBase {
  success: boolean;
  status: number;
  message?: string;
  data?: unknown;
  error?: { reason: string; code?: number };
  action?: string;
}

export interface ApiResponse<T = unknown> extends ApiResponseBase {
  data?: T;
}

export type SuccessResponse = ApiResponse<void>;
