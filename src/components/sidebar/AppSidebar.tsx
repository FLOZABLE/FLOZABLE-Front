"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTutorial } from "@/hooks/tutorialHooks";
import {
  Calendar,
  ChartBar,
  CircleUserRound,
  GraduationCap,
  House,
  Trophy,
  UsersRound,
  Wallpaper,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import ChatButton from "../buttons/ChatButton";
import { ThemeToggleButton } from "../buttons/ThemeToggleButton";
import TutorialButton from "../buttons/TutorialButton";
import AccountViewer from "./AccountViewer";

interface Item extends React.ComponentProps<"li"> {
  title: string;
  url: string;
  icon: React.ReactNode;
}

export default function AppSidebar() {
  const chatButtonRef = useRef<HTMLButtonElement>(null);

  const { currentTour, setCurrentStep } = useTutorial();

  const items: Item[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <House />,
    },
    {
      title: "Stats",
      url: "/dashboard/stats",
      icon: <ChartBar />,
      id: "tour1-step10",
      onClick: () => {
        setCurrentStep(11, 500);
      },
    },
    {
      title: "Groups",
      url: "/dashboard/groups",
      icon: <UsersRound />,
      id: "tour1-step18",
      onClick: () => {
        setCurrentStep(19, 500);
      },
    },
    {
      title: "Planner",
      url: "/dashboard/planner",
      icon: <Calendar />,
    },
    {
      title: "Leaderboard",
      url: "/dashboard/leaderboard",
      icon: <Trophy />,
      id: "tour1-step15",
      onClick: () => {
        setCurrentStep(16, 500);
      },
    },
    {
      title: "Study",
      url: "/dashboard/study",
      icon: <GraduationCap />,
    },
    {
      title: "Account",
      url: "/dashboard/account",
      icon: <CircleUserRound />,
    },
    {
      title: "Themes",
      url: "/dashboard/themes",
      icon: <Wallpaper />,
    },
  ];

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      defaultMouseEvent={currentTour !== "newUser"}>
      <SidebarHeader>
        {/* <SidebarButton className="absolute right-[-2rem]" /> */}
        <AccountViewer />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ title, url, icon, ...props }) => (
                <SidebarMenuItem key={title} {...props}>
                  <SidebarMenuButton asChild>
                    <Link href={url}>
                      {icon}
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem
                key={"Chats"}
                onClick={() => {
                  chatButtonRef.current?.click();
                }}
                className="cursor-pointer">
                <SidebarMenuButton asChild>
                  <div>
                    <ChatButton
                      variant={"ghost"}
                      size={"icon"}
                      className="h-5 w-5"
                      buttonRef={chatButtonRef}
                    />
                    <span>Chats</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="!bg-transparent justify-center">
              <div>
                <ThemeToggleButton
                  size={"icon"}
                  variant={"ghost"}
                  className="mr-auto"
                  contentProps={{ side: "left" }}
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <TutorialButton />
      </SidebarFooter>
    </Sidebar>
  );
}
