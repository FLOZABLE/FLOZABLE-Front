"use client";
import React, { useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { Calendar, ChartBar, House, Trophy, UserRound } from "lucide-react";
import { getAuthLogout } from "@/apis/authApi";
import { ThemeToggleBtn } from "../buttons/ThemeToggleBtn";
import { useAccount } from "@/hooks/accountHooks";

export default function SidebarWrapper() {
  const { clearAccountData } = useAccount();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <House className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Stats",
      href: "/dashboard/stats",
      icon: (
        <ChartBar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Leaderboard",
      href: "/dashboard/leaderboard",
      icon: (
        <Trophy className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Planner",
      href: "/dashboard/planner",
      icon: (
        <Calendar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Groups",
      href: "/dashboard/groups",
      icon: (
        <UserRound className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "/",
      icon: (
        <IconArrowLeft
          onClick={async () => {
            const response = await getAuthLogout();
            if (response.success) {
              clearAccountData();
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }
          }}
          className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200"
        />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 relative">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 left-2">
          <ThemeToggleBtn />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src="/logo.png"
        className="h-7 w-7 shrink-0 rounded-full"
        width={50}
        height={50}
        alt="Avatar"
      />
    </Link>
  );
};
