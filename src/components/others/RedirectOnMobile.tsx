"use client";

import { isMobile } from "react-device-detect";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectOnMobile() {
  const router = useRouter();
  useEffect(() => {
    if (isMobile) {
      router.push("/dashboard/mobile");
    }
  }, []);
  
  return null;
}
