import React from "react";
import dynamic from "next/dynamic";
import styles from "./YouTubePlayer.module.css";

// Dynamically import ReactPlayer with SSR disabled
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

function YouTubePlayer({ height, width, videoId, volume }) {
  return (
    <div className={styles.YouTubePlayer} style={{ height, width }}>
      {videoId ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          loop
          className={styles.video}
          volume={volume / 100}
          controls={false}
          playing
          config={{ youtube: { playerVars: {} } }}
        />
      ) : null}
    </div>
  );
}

export default YouTubePlayer;
