import React from "react";
import dynamic from "next/dynamic";

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
    <div style={{ width, height }}>
      {videoId ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          loop
          volume={volume / 100}
          controls={false}
          playing
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                disablekb: 1,
                iv_load_policy: 3,
              },
            },
          }}
          width="100%"
          height="100%"
          style={{ pointerEvents: "none" }}
        />
      ) : null}
    </div>
  );
}
