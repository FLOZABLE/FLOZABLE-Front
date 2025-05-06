import React from "react";
import dynamic from "next/dynamic";
import styles from "./YouTubePlayer.module.css";

// Dynamically import ReactPlayer with SSR disabled
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type YoutubePlayerProps = {
  videoId?: string;
  volume: number;
  width: number;
  height: number;
};

export default function YoutubePlayer({
  videoId,
  volume,
  width,
  height,
}: YoutubePlayerProps) {
  return (
    <div className={styles.YoutubePlayer}>
      {videoId ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          loop
          volume={volume / 100}
          controls={false}
          playing
          config={{ youtube: { playerVars: {} } }}
          width={width}
          height={height}
        />
      ) : null}
    </div>
  );
}
