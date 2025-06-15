import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React, { ComponentProps } from "react";

// Dynamically import ReactPlayer with SSR disabled
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface YoutubePlayerProps extends ComponentProps<"div"> {
  videoId?: string;
  volume: number;
}

export default function YoutubePlayer({
  videoId,
  volume,
  className,
  ...props
}: YoutubePlayerProps) {
  return (
    <div className={cn("relative", className)} {...props}>
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
          height="calc(100% + 19rem)"
          style={{
            pointerEvents: "none",
            position: "absolute",
            transform: "translateY(-50%)",
            top: "50%",
          }}
        />
      ) : null}
    </div>
  );
}
