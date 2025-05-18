"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarItem, SidebarLink } from "../ui/sidebar";
import {
  Calendar,
  ChartBar,
  CircleUserRound,
  GraduationCap,
  House,
  LogIn,
  LogOut,
  Trophy,
  UsersRound,
} from "lucide-react";
import { getAuthLogout } from "@/apis/authApi";
import { ThemeToggleBtn } from "../buttons/ThemeToggleBtn";
import { useAccount } from "@/hooks/accountHooks";
import { useAccountModal } from "./ModalProviders";
import ChatButton from "../buttons/ChatButton";
import NotificationsButton from "../buttons/NotificationsButton";

export default function SidebarWrapper() {
  const { account, clearAccountData } = useAccount();
  const { setAccountModal } = useAccountModal();

  const chatButtonRef = useRef<HTMLButtonElement>(null);
  const notificationsButtonRef = useRef<HTMLButtonElement>(null);

  const items = [
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
      label: "Groups",
      href: "/dashboard/groups",
      icon: (
        <UsersRound className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
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
      label: "Leaderboard",
      href: "/dashboard/leaderboard",
      icon: (
        <Trophy className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Study",
      href: "/dashboard/study",
      icon: (
        <GraduationCap className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Account",
      href: "/dashboard/account",
      icon: (
        <CircleUserRound className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: account ? "Logout" : "Sign in",
      href: null,
      icon: account ? (
        <LogOut className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ) : (
        <LogIn className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: async () => {
        if (account) {
          const response = await getAuthLogout();
          if (response.success) {
            clearAccountData();
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        } else {
          setAccountModal((prev) => ({
            ...prev,
            isSignIn: true,
            opened: true,
          }));
        }
      },
    },
    {
      label: "Chats",
      href: null,
      icon: (
        <ChatButton
          variant={"ghost"}
          className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200"
          buttonRef={chatButtonRef}
        />
      ),
      onClick: () => {
        console.log(notificationsButtonRef.current);
        chatButtonRef.current?.click();
      },
    },
    {
      label: "Notifications",
      href: null,
      icon: (
        <NotificationsButton
          className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200"
          variant={"ghost"}
          buttonRef={notificationsButtonRef}
        />
      ),
      onClick: () => {
        console.log(notificationsButtonRef.current);
        notificationsButtonRef.current?.click();
      },
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 relative">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            {items.map((item, idx) => {
              if (item.href) {
                return <SidebarLink key={idx} {...item} />;
              } else {
                return <SidebarItem key={idx} {...item} />;
              }
            })}
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
