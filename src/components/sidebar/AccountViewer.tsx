"use client";

import { useAccount } from "@/hooks/accountHooks";
import Image from "next/image";

import AccountButton from "../buttons/AccountButton";
import NotificationsButton from "../buttons/NotificationsButton";
import AvatarWrapper from "../ui/avatar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export default function AccountViewer() {
  const { account } = useAccount();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-24">
          <div className="flex items-start">
            {account?.user_id ? (
              <AvatarWrapper userId={account.user_id} name={account.name} />
            ) : (
              <Image
                src={"/logo.png"}
                width={40}
                height={40}
                alt="logo"
                className=""></Image>
            )}
            <div className="grid flex-1 text-left text-sm leading-tight gap-2">
              <div className="flex justify-between items-center ">
                <span className="truncate font-medium px-3">
                  {account ? account.name : "FLOZABLE"}
                </span>
                <NotificationsButton className="ml-auto" />
              </div>
              <AccountButton
                variant={"default"}
                effect={null}
                isSignupButton={false}
                size={"sm"}
                className="flex-1/2"
              />
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
