// components/CountryViewer.tsx
import { JSX, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { getCountryCode } from "@/utils/tools";
import { Badge } from "../ui/badge";

interface CountryViewerProps {
  timezone?: string;
}

export default function CountryViewer({ timezone }: CountryViewerProps) {
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
        <FontAwesomeIcon icon={faGlobe} className="text-xl" />
      )
    );
  }, [timezone]);

  return (
    <div className="flex items-center space-x-2 group relative">
      <div className="transition-transform duration-300 group-hover:-translate-y-1">
        {flag}
      </div>
      <Badge className="pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out text-sm absolute top-full mt-1 left-1/2 -translate-x-1/2">
        {timezone}
      </Badge>
    </div>
  );
}
