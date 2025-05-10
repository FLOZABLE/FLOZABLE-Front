"use client";

import MyGroupsViewer from "@/components/groups/MyGroupsViewer";
import StudyModal from "@/components/modals/StudyModal";
import Planstimeline from "@/components/plans/Planstimeline";
import AudioController from "@/components/study/AudioController";
import CallController from "@/components/study/CallController";
import StudyDock from "@/components/study/StudyDock";
import StudyModalContainer from "@/components/study/StudyModalContainer";
import SubjectTimer from "@/components/study/SubjectTimer";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "@/hooks/otherHooks";
import socket from "@/utils/sockets/socket";
import { cn } from "@/utils/tools";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const YoutubePlayer = dynamic(
  () => import("@/components/youtube/YouTubePlayer"),
  { ssr: false }
);

export default function Study() {
  const [theme, setTheme] = useState({ volume: 0, id: "YQc4WT0yDH4" });

  const { width, height } = useWindowSize();

  const [studyOptions, setStudyOptions] = useState({
    planner: true,
    timer: true,
    groups: true,
    audioController: true,
    media: false,
    zoom: false,
    timeline: true,
  });

  const [studyModal, setStudyModal] = useState(true);

  useEffect(() => {
    const onMyStudyStart = () => {
      setStudyModal(false);
    };
    socket.on("mystudy:start", onMyStudyStart);

    return () => {
      socket.off("mystudy:start", onMyStudyStart);
    };
  }, []);

  return (
    <main className="w-screen h-screen">
      <StudyModal open={studyModal} setOpen={setStudyModal} />
      <StudyDock
        className="fixed right-0 bottom-0"
        setStudyOptions={setStudyOptions}
      />
      <StudyModalContainer
        open={studyOptions.timer}
        onClose={() => {
          setStudyOptions((prev) => ({ ...prev, timer: false }));
        }}
        title="Timer"
        className="top-5 left-5"
      >
        <SubjectTimer />
      </StudyModalContainer>

      <StudyModalContainer
        open={studyOptions.groups}
        onClose={() => {
          setStudyOptions((prev) => ({ ...prev, groups: false }));
        }}
        title="Groups"
        className="absolute-center bg-transparent border-0"
      >
        <MyGroupsViewer
          className="w-[70vw]"
          swiperClassName="h-[60vh] bg-transparent"
        />
      </StudyModalContainer>

      <StudyModalContainer
        open={studyOptions.media}
        onClose={() => {
          setStudyOptions((prev) => ({ ...prev, media: false }));
        }}
        title="Media"
        className="right-5 top-5"
      >
        <CallController />
      </StudyModalContainer>

      <StudyModalContainer
        open={studyOptions.audioController}
        onClose={() => {
          setStudyOptions((prev) => ({ ...prev, audioController: false }));
        }}
        title="Audio"
        className="right-5 bottom-20"
      >
        <AudioController
          themeVolume={theme.volume}
          setThemeVolume={(volume) => {
            setTheme((prev) => ({ ...prev, volume }));
          }}
        />
      </StudyModalContainer>
      <Planstimeline
        viewer={"day"}
        viewDate={new Date(new Date().setHours(0, 0, 0, 0))}
        className={cn(
          "w-[25rem] fixed left-5 bottom-5 transition-all duration-300 ease-in-out transform",
          studyOptions.planner
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
        closeButton={
          <Button
            onClick={() => {
              setStudyOptions((prev) => ({ ...prev, planner: false }));
            }}
            className="w-fit"
            variant={"ghost"}
          >
            <X />
          </Button>
        }
      />

      <YoutubePlayer
        width={width}
        height={height}
        volume={theme.volume}
        videoId={theme.id}
      />
    </main>
  );
}
