"use client";

import StudyDock from "@/components/study/StudyDock";
import StudyModalContainer from "@/components/study/StudyModalContainer";
import SubjectTimer from "@/components/study/SubjectTimer";
import YoutubePlayer from "@/components/youtube/YouTubePlayer/YouTubePlayer";
import { useWindowSize } from "@/hooks/otherHooks";
import { useState } from "react";

export default function Study() {
  const { width, height } = useWindowSize();

  const [theme, setTheme] = useState({ volume: 0, id: "YQc4WT0yDH4" });

  return (
    <main className="w-screen h-screen">
      <StudyDock className="fixed right-0 bottom-0" />
      <StudyModalContainer open={true} onClose={() => {}}>
        <SubjectTimer />
      </StudyModalContainer>
      {/* <YoutubePlayer
        width={width}
        height={height}
        volume={theme.volume}
        videoId={theme.id}
      /> */}
    </main>
  );
}
