import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

async function getPlaylistsSpotify() {
  return requestHandler(AxiosInstance.get(`/playlists/spotify`));
}

async function getSpotifyInfo() {
  return requestHandler(AxiosInstance.get(`/playlists/spotify/info`));
}

async function getPlaylistsYoutube() {
  return requestHandler(AxiosInstance.get(`/playlists/youtube`));
}

async function getPlaylistsYoutubeItems(playlistId) {
  return requestHandler(
    AxiosInstance.get(`/playlists/youtube/items`, {
      params: { playlist_id: playlistId },
    })
  );
}

export {
  getSpotifyInfo,
  getPlaylistsSpotify,
  getPlaylistsYoutube,
  getPlaylistsYoutubeItems,
};
