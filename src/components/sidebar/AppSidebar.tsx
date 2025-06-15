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
import {
  Calendar,
  ChartBar,
  CircleUserRound,
  GraduationCap,
  House,
  Trophy,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import ChatButton from "../buttons/ChatButton";
import TutorialButton from "../buttons/TutorialButton";
import AccountViewer from "./AccountViewer";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <House />,
  },
  {
    title: "Stats",
    url: "/dashboard/stats",
    icon: <ChartBar />,
  },
  {
    title: "Groups",
    url: "/dashboard/groups",
    icon: <UsersRound />,
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
];

export default function AppSidebar() {
  const chatButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        {/* <SidebarButton className="absolute right-[-2rem]" /> */}
        <AccountViewer />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
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
        <TutorialButton />
      </SidebarFooter>
    </Sidebar>
  );
}
