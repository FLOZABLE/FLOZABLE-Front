import { DockItem, FloatingDock } from "@/components/ui/floating-dock";
import { useTutorial } from "@/hooks/tutorialHooks";
import { cn } from "@/lib/utils";
import {
  IconHeadphones,
  IconHome,
  IconPhone,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Calendar, Hourglass, Wallpaper } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ComponentProps } from "react";

import ChatButton from "../buttons/ChatButton";
import { ThemeToggleButton } from "../buttons/ThemeToggleButton";
import ZoomButton from "../buttons/ZoomButton";

type StudyOptions = {
  planner: boolean;
  timer: boolean;
  groups: boolean;
  audioController: boolean;
  media: boolean;
  zoom: boolean;
  timeline: boolean;
  themeController: boolean;
};

export interface StudyDockProps extends ComponentProps<"div"> {
  setStudyOptions: React.Dispatch<React.SetStateAction<StudyOptions>>;
}

export default function StudyDock({
  setStudyOptions,
  className,
}: StudyDockProps) {
  const router = useRouter();

  const { currentStep, setCurrentStep } = useTutorial();

  const links: DockItem[] = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => {
        if (currentStep === 8) return;

        router.push("/dashboard");

        setCurrentStep(10, 500);
      },
      id: "tour1-step9",
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
      title: "Study Theme",
      icon: (
        <Wallpaper className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => {
        setStudyOptions((prev) => ({
          ...prev,
          themeController: !prev.themeController,
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
      icon: <ThemeToggleButton />,
    },
  ];

  return (
    <div
      className={cn("flex items-center justify-center z-20", className)}
      id="tour1-step8">
      <FloatingDock items={links} />
    </div>
  );
}
