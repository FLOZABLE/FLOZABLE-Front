import React from "react";
import styles from "./SpotifyAuthBtn.module.css";
import { useSpotifyInfo } from "@/hooks/playlistHooks";
import config from "@/lib/config";
import CircularLoading from "@/components/loadings/CircularLoading/CircularLoading";
import { IconSpotify } from "@/components/others/Svgs";

function SpotifyAuthBtn() {
  const { spotifyInfoIsLoading, spotifyInfo } = useSpotifyInfo();

  return (
    <a
      className={styles.SpotifyAuthBtn}
      href={`${config.server}/auth/signin/spotify`}
    >
      {spotifyInfoIsLoading ? (
        <CircularLoading />
      ) : spotifyInfo ? (
        <p>Logged in as {spotifyInfo.display_name}</p>
      ) : (
        <p>Login with Spotify</p>
      )}
      <i>
        <IconSpotify />
      </i>
    </a>
  );
}

export default SpotifyAuthBtn;
