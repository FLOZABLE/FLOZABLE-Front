import AxiosInstance from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/utils";
import { GetThemeAllResponse, GetThemeMineResponse } from "@/types/themeTypes";

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

export async function getThemeMine(): Promise<GetThemeMineResponse> {
  return requestHandler(AxiosInstance.get(`/theme/mine`));
}

export async function postThemeSave(themeId: string) {
  return requestHandler(
    AxiosInstance.post(`/theme/save`, { theme_id: themeId }),
  );
}

export async function postThemeUnsave(themeId: string) {
  return requestHandler(
    AxiosInstance.post(`/theme/unsave`, { theme_id: themeId }),
  );
}
