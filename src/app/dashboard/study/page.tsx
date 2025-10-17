"use client";

import DynamicMyGroupsViewer from "@/components/dynamic/groups/DynamicMyGroupsViewer";
import StudyModal from "@/components/modals/StudyModal";
import Planstimeline from "@/components/plans/Planstimeline";
import AudioController from "@/components/study/AudioController";
import CallController from "@/components/study/CallController";
import StudyDock from "@/components/study/StudyDock";
import StudyModalContainer from "@/components/study/StudyModalContainer";
import SubjectTimer from "@/components/study/SubjectTimer";
import ThemeController from "@/components/themes/ThemeController";
import { Button } from "@/components/ui/button";
import { useTutorial } from "@/hooks/tutorialHooks";
import socket from "@/lib/sockets/socket";
import { cn } from "@/lib/utils";
import { OnMyStudying } from "@/types/socketTypes";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const YoutubePlayer = dynamic(
  () => import("@/components/youtube/YouTubePlayer"),
  { ssr: false },
);

export default function Study() {
  const [theme, setTheme] = useState({ volume: 0, id: "" });
  const [studyOptions, setStudyOptions] = useState({
    planner: true,
    timer: true,
    groups: true,
    audioController: true,
    media: true,
    zoom: false,
    timeline: true,
    themeController: false,
  });

  const [studyModal, setStudyModal] = useState(true);

  const { currentTour } = useTutorial();

  useEffect(() => {
    const savedVideoId = localStorage.getItem("themeVideoId");
    if (savedVideoId) {
      setTheme((prev) => ({ ...prev, id: savedVideoId }));
    } else {
      setTheme((prev) => ({ ...prev, id: "YQc4WT0yDH4" }));
    }

    const onMyStudyStart = ({ subject }: OnMyStudying) => {
      if (subject.subject_id === "0") return;
      setStudyModal(false);
    };
    socket.on("mystudy:start", onMyStudyStart);

    return () => {
      socket.off("mystudy:start", onMyStudyStart);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("themeVideoId", theme.id);
  }, [theme.id]);

  useEffect(() => {
    if (currentTour === "newUser") {
      setStudyModal(false);
    }
  }, [currentTour]);

  return (
    <main className="w-screen h-screen overflow-hidden">
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
        className="top-5 left-5 z-10">
        <SubjectTimer />
      </StudyModalContainer>

      <StudyModalContainer
        open={studyOptions.groups}
        onClose={() => {
          setStudyOptions((prev) => ({ ...prev, groups: false }));
        }}
        title="Groups"
        className="absolute-center bg-transparent border-0"
        cardClassName="bg-transparent border-0">
        <DynamicMyGroupsViewer
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
        className="right-5 top-5">
        <CallController />
      </StudyModalContainer>

      <StudyModalContainer
        open={studyOptions.audioController}
        onClose={() => {
          setStudyOptions((prev) => ({ ...prev, audioController: false }));
        }}
        title="Audio"
        className="right-5 bottom-20">
        <AudioController
          themeVolume={theme.volume}
          setThemeVolume={(volume) => {
            setTheme((prev) => ({ ...prev, volume }));
          }}
        />
      </StudyModalContainer>

      <StudyModalContainer
        open={studyOptions.themeController}
        onClose={() => {
          setStudyOptions((prev) => ({ ...prev, themeController: false }));
        }}
        title="Theme"
        className="right-5 bottom-20">
        <ThemeController
          setTheme={(videoId) => {
            if (typeof videoId !== "string") return;
            console.log(videoId);
            setTheme((prev) => ({ ...prev, id: videoId }));
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
            : "opacity-0 translate-y-4 pointer-events-none",
        )}
        closeButton={
          <Button
            onClick={() => {
              setStudyOptions((prev) => ({ ...prev, planner: false }));
            }}
            className="w-fit"
            variant={"ghost"}>
            <X />
          </Button>
        }
      />

      <YoutubePlayer
        className="w-screen h-screen z-[-1]"
        volume={theme.volume}
        videoId={theme.id}
      />
    </main>
  );
}
