"use client";

import { PanelLeft, PanelLeftClose } from "lucide-react";
import React from "react";

import AnimatedSwitchButton from "./AnimatedSwitchButton";
import { useSidebar } from "../ui/sidebar";
import { ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

export default function SidebarButton({ className, ...props }: ButtonProps) {
  const { open, setOpen } = useSidebar();

  return (
    <AnimatedSwitchButton
      onIcon={<PanelLeftClose />}
      offIcon={<PanelLeft />}
      clicked={open}
      onClick={() => {
        setOpen(!open);
      }}
      variant={"ghost"}
      className={cn("bg-accent", className)}
      size={"icon"}
      {...props}
    />
  );
}
