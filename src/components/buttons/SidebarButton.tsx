"use client";

import { cn } from "@/lib/utils";
import { PanelLeft, PanelLeftClose } from "lucide-react";
import React from "react";

import { ButtonProps } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import AnimatedSwitchButton from "./AnimatedSwitchButton";

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
