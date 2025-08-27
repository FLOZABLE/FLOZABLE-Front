import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { useState } from "react";

import { Button, ButtonProps } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const THEMES = [""];

interface ThemeButtonProps extends ButtonProps {
  test?: string;
}

export default function ThemeButton({ className, ...props }: ThemeButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu
      open={open}
      /* modal={true} */
      onOpenChange={(open) => {
        setOpen(open);
      }}>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("aspect-square h-10 w-10 relative", className)}
          variant="outline"
          onClick={() => {
            setOpen(true);
          }}
          {...props}>
          <Download />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="end"
        className="p-0 max-h-[70vh] min-w-80">
        <DropdownMenuLabel className="sticky top-0 z-10 bg-background border-b-2 p-3">
          Notifications
        </DropdownMenuLabel>
        {THEMES?.length ? (
          THEMES.map((theme, i) => {
            return <DropdownMenuItem key={i}>{theme}</DropdownMenuItem>;
          })
        ) : (
          <DropdownMenuItem>
            <p>You got no notifications</p>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
