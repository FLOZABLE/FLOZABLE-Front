"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          /* "--rt-color-success": "red",
          "--success-bg": "#fff",
          "--success-border": "pink",
          "--success-text": "blue", */
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
