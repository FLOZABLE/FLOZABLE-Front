"use client";

import MyGroupsViewer from "@/components/groups/MyGroupsViewer";
import AudioController from "@/components/study/AudioController";
import CallController from "@/components/study/CallController";
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
      <StudyModalContainer open={true} onClose={() => {}} title="Timer">
        <SubjectTimer />
      </StudyModalContainer>

      <StudyModalContainer
        open={true}
        onClose={() => {}}
        title="Groups"
        className="absolute-center bg-transparent border-0"
      >
        <MyGroupsViewer
          className="w-[70vw]"
          swiperClassName="h-[60vh] bg-transparent"
        />
      </StudyModalContainer>

      <StudyModalContainer
        open={true}
        onClose={() => {}}
        title="Media"
        className="right-0 top-0"
      >
        <CallController />
      </StudyModalContainer>

      <StudyModalContainer
        open={true}
        onClose={() => {}}
        title="Media"
        className="right-5 bottom-20"
      >
        <AudioController
          themeVolume={theme.volume}
          setThemeVolume={(volume) => {
            setTheme((prev) => ({ ...prev, volume }));
          }}
        />
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
