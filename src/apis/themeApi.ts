import AxiosInstance from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/utils";
import { GetThemeAllResponse } from "@/types/themeTypes";

interface PutThemeParams {
  name: string;
  tags: string[];
  description: string;
  video_id: string;
}

export async function putTheme({
  name,
  tags,
  description,
  video_id,
}: PutThemeParams) {
  return requestHandler(
    AxiosInstance.put(`/theme`, {
      name,
      tags,
      description,
      video_id,
    }),
  );
}

export async function getThemeAll(): Promise<GetThemeAllResponse> {
  return requestHandler(AxiosInstance.get(`/theme/all`));
}
