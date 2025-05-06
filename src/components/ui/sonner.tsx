"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";
import {
  Info,
  Loader2,
  CircleCheck,
  TriangleAlert,
  CircleAlert,
} from "lucide-react"; // Import your desired icons

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheck className="fill-green-500 text-white" />,
        error: <CircleAlert className="fill-red-500 text-white" />,
        warning: <TriangleAlert className="fill-yellow-500 text-white" />,
        info: <Info className="fill-blue-500 text-white" />,
        loading: <Loader2 className="animate-spin text-gray-500" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
