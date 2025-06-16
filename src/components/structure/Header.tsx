"use client";

import { useAccount } from "@/hooks/accountHooks";
import { useExtensionSettings } from "@/hooks/extensionHooks";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ChatButton from "../buttons/ChatButton";
import NotificationsButton from "../buttons/NotificationsButton";
import { ThemeToggleButton } from "../buttons/ThemeToggleButton";
import AvatarWrapper from "../ui/avatar";
import { Button } from "../ui/button";

export default function Header() {
  const router = useRouter();

  const { account } = useAccount();

  const { extensionSettings, extensionSettingsIsLoading } =
    useExtensionSettings();

  return (
    <header className="backdrop-blur-sm sticky top-0 left-0 w-full h-12 px-10 flex flex-row justify-between items-center z-20">
      <div className="flex gap-3 items-center"></div>
      <div className="flex gap-3 items-center">
        {!extensionSettings?.length && !extensionSettingsIsLoading && (
          <Button
            effect={"expandIcon"}
            icon={ArrowRightIcon}
            iconPlacement="right"
            onClick={() => {
              router.push("/dashboard/account?website=youtube.com");
              window.open(
                "https://chromewebstore.google.com/detail/flozable-tab-monitor/cmbdaanokelibhphiidlikongdoandlj",
                "_blank",
              );
              setTimeout(() => {
                toast.info(
                  "Manage the websites you want to block or track usage from this page!",
                );
              }, 500);
            }}>
            Try our Chrome extension to block distractions!
          </Button>
        )}
        <ChatButton variant={"outline"} className="aspect-square w-10 h-10" />
        <NotificationsButton />
        <ThemeToggleButton />
        <AvatarWrapper
          name={account?.name || ""}
          userId={account?.user_id}
          onClick={() => {
            router.push("/dashboard/account");
          }}
        />
      </div>
    </header>
  );
}
