import { BookOpen } from "lucide-react";
import { Button } from "../ui/button";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { useNextStep } from "nextstepjs";

export default function TutorialButton() {
  const { startNextStep } = useNextStep();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          onClick={() => {
            startNextStep("newUser");
            console.log("start tutorial")
          }}
        >
          <div className="">
            <BookOpen size={15} className="m-2" />
            <Button>Start Tutorial</Button>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
