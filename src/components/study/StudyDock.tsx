import React, { ComponentProps } from "react";
import { DockItem, FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHeadphones,
  IconHome,
  IconPhone,
  IconUsersGroup,
} from "@tabler/icons-react";
import { cn } from "@/utils/tools";
import { useRouter } from "next/navigation";
import { Calendar, Hourglass } from "lucide-react";
import { ThemeToggleBtn } from "../buttons/ThemeToggleBtn";
import ChatButton from "../buttons/ChatButton";
import ZoomButton from "../buttons/ZoomButton";
import { useSubjects } from "@/hooks/subjectsHooks";

type StudyOptions = {
  planner: boolean;
  timer: boolean;
  groups: boolean;
  audioController: boolean;
  media: boolean;
  zoom: boolean;
  timeline: boolean;
};

export interface StudyDockProps extends ComponentProps<"div"> {
  setStudyOptions: React.Dispatch<React.SetStateAction<StudyOptions>>;
}

export default function StudyDock({
  setStudyOptions,
  className,
}: StudyDockProps) {
  const router = useRouter();

  const { subjectsRefetch } = useSubjects();

  const links: DockItem[] = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => {
        router.push("/dashboard");
        subjectsRefetch();
      },
    },

    {
      title: "Timer",
      icon: (
        <Hourglass className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => {
        setStudyOptions((prev) => ({ ...prev, timer: !prev.timer }));
      },
    },
    {
      title: "Planner",
      icon: (
        <Calendar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => {
        setStudyOptions((prev) => ({ ...prev, planner: !prev.planner }));
      },
    },
    {
      title: "Groups",
      icon: (
        <IconUsersGroup className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => {
        setStudyOptions((prev) => ({ ...prev, groups: !prev.groups }));
      },
    },

    {
      title: "Media",
      icon: (
        <IconPhone className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => {
        setStudyOptions((prev) => ({ ...prev, media: !prev.media }));
      },
    },
    {
      title: "Audio",
      icon: (
        <IconHeadphones className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => {
        setStudyOptions((prev) => ({
          ...prev,
          audioController: !prev.audioController,
        }));
      },
    },
    {
      title: "Zoom",
      icon: <ZoomButton />,
    },
    {
      title: "Chat",
      icon: <ChatButton variant={"ghost"} effect={null} />,
    },
    {
      title: "Theme",
      icon: <ThemeToggleBtn />,
    },
  ];
  return (
    <div className={cn("flex items-center justify-center z-10", className)}>
      <FloatingDock items={links} />
    </div>
  );
}
