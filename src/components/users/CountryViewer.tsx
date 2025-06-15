// components/CountryViewer.tsx
import { cn, getCountryCode } from "@/lib/utils";
import { Globe } from "lucide-react";
import { ComponentProps, JSX, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

import { Badge } from "../ui/badge";

interface CountryViewerProps extends ComponentProps<"div"> {
  timezone?: string;
}

export default function CountryViewer({
  timezone,
  className,
  ...props
}: CountryViewerProps) {
  const [flag, setFlag] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (!timezone) return;

    const countryCode = getCountryCode(timezone);
    setFlag(
      countryCode ? (
        <ReactCountryFlag
          countryCode={countryCode}
          svg
          alt={timezone}
          className="text-xl"
        />
      ) : (
        <Globe className="text-lg" />
      ),
    );
  }, [timezone]);

  return (
    <div
      className={cn("flex items-center space-x-2 group relative", className)}
      {...props}>
      <div className="transition-transform duration-300 group-hover:-translate-y-1">
        {flag}
      </div>
      <Badge className="pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out text-xs absolute top-full mt-1 left-1/2 -translate-x-1/2">
        {timezone}
      </Badge>
    </div>
  );
}
