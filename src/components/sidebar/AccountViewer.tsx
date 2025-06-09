"use client";

import { useAccount } from "@/hooks/accountHooks";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import AvatarWrapper from "../ui/avatar";
import AccountButton from "../buttons/AccountButton";
import NotificationsButton from "../buttons/NotificationsButton";

export default function AccountViewer() {
  const { account } = useAccount();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-24"
        >
          <div className="flex items-start">
            {account?.user_id ? (
              <AvatarWrapper userId={account.user_id} name={account.name} />
            ) : (
              <div className="relative flex size-8 shrink-0 overflow-hidden rounded-full"></div>
            )}
            <div className="grid flex-1 text-left text-sm leading-tight gap-2">
              <div className="flex justify-between items-center ">
                <span className="truncate font-medium px-3">
                  {account?.name}
                </span>
                <NotificationsButton className="ml-auto" />
              </div>
              <AccountButton variant={"default"} effect={null} size={"sm"} />
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
