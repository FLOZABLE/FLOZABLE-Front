import { useTutorial } from "@/hooks/tutorialHooks";
import { BookOpen } from "lucide-react";

import { Button } from "../ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

export default function TutorialButton() {
  const { startNextStep } = useTutorial();

  const { setOpen } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          onClick={() => {
            setOpen(false);
            setTimeout(() => {
              startNextStep("newUser");
            }, 1000);
          }}>
          <div className="">
            <BookOpen size={15} className="m-2" />
            <Button>Start Tutorial</Button>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
