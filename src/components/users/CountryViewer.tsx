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
      {flag}
      <Badge className="opacity-0 group-hover:opacity-100 transition text-sm text-gray-500 absolute top-full mt-1">
        {timezone}
      </Badge>
    </div>
  );
}
