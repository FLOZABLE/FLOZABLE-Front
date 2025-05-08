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

export default function StudyDock({ className }: ComponentProps<"div">) {
  const router = useRouter();

  const links: DockItem[] = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => {
        console.log("test");
        router.push("/dashboard");
      },
    },

    {
      title: "Timer",
      icon: (
        <Hourglass className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      title: "Planner",
      icon: (
        <Calendar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      title: "Groups",
      icon: (
        <IconUsersGroup className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },

    {
      title: "Media",
      icon: (
        <IconPhone className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
    },
    {
      title: "Audio",
      icon: (
        <IconHeadphones className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
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
