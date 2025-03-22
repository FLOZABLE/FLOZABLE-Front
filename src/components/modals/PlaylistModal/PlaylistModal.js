import React, { useState } from "react";
import styles from "./PlaylistModal.module.css";
import DropDownButton from "@/components/buttons/DropDownButton/DropDownButton";
import SpotifyPlaylist from "@/components/spotify/SpotifyPlaylist/SpotifyPlaylist";
import YouTubePlaylist from "@/components/youtube/YouTubePlaylist/YouTubePlaylist";

function PlaylistModal() {
  const [playlistType, setPlaylistType] = useState("spotify");

  return (
    <div className={styles.PlaylistModal}>
      <div className={styles.DropDownButton}>
        <DropDownButton
          options={[
            {
              value: "spotify",
              name: "Spotify",
            },
            {
              value: "youtube",
              name: "Youtube",
            },
          ]}
          value={playlistType}
          setValue={setPlaylistType}
        />
      </div>
      {playlistType === "spotify" ? <SpotifyPlaylist /> : <YouTubePlaylist />}
    </div>
  );
}

export default PlaylistModal;
