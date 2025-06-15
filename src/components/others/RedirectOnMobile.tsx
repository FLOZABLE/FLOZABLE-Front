"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";

export default function RedirectOnMobile() {
  const router = useRouter();
  useEffect(() => {
    if (isMobile) {
      router.push("/dashboard/mobile");
    }
  }, []);

  return null;
}
