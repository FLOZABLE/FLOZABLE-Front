import React, { useState } from "react";
import styles from "./SpotifyPlaylist.module.css";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { usePlaylistsSpotify } from "@/hooks/playlistHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";
import CircularLoading from "@/components/loadings/CircularLoading/CircularLoading";
import SpotifyAuthBtn from "@/components/buttons/SpotifyAuthBtn/SpotifyAuthBtn";
import CustomInput from "@/components/inputs/CustomInput/CustomInput";

function SpotifyPlaylist() {
  const { playlistsSpotifyData, playlistsSpotifyIsLoading } =
    usePlaylistsSpotify();

  const [playlist, setPlaylist] = useState(null);
  const [link, setLink] = useState("");

  const submitURL = () => {
    try {
      const url = new URL(link);
      if (url.hostname === "open.spotify.com") {
        const urlPaths = url.pathname.split("/");
        if (urlPaths[1] !== "embed") {
          urlPaths.unshift("embed");
          const modifiedURL = "https://open.spotify.com/" + urlPaths.join("/");
          setPlaylist(modifiedURL);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.SpotifyPlaylist}>
      <SpotifyPlayer link={playlist} />
      {playlistsSpotifyIsLoading ? (
        <CircularLoading />
      ) : !playlistsSpotifyData?.data?.playlists ? (
        <SpotifyAuthBtn />
      ) : (
        <div className={`customScroll ${styles.playlists}`}>
          {playlistsSpotifyData.data.playlists.map((playlist, i) => {
            return (
              <div
                onClick={() => {
                  const embedUrl = playlist.external_urls.spotify.replace(
                    "https://open.spotify.com",
                    "https://open.spotify.com/embed"
                  );

                  setPlaylist(embedUrl);
                }}
                className={styles.playlist}
                key={i}
                style={{
                  backgroundImage: `url(${playlist.images?.[0].url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <p className={`overflowDot ${styles.name}`}>{playlist.name}</p>
              </div>
            );
          })}
        </div>
      )}
      <CustomInput
        input={link}
        handleInput={(e) => {
          setLink(e.target.value);
        }}
        handleEnter={submitURL}
        placeHolder={"or Paste a playlist Link!"}
        type={"text"}
      >
        <FontAwesomeIcon icon={faLink} />
      </CustomInput>
    </div>
  );
}

export default SpotifyPlaylist;
