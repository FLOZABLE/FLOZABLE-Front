"use client";

import { useEffect } from "react";

export default function Mobile() {
  useEffect(() => {
    const userAgent = navigator.userAgent;

    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);

    window.location.href = "flozable://open";

    // Fallback to store after 2 seconds
    setTimeout(() => {
      if (isAndroid) {
        window.location.href =
          "https://play.google.com/store/apps/details?id=com.flozable.app";
      } else if (isIOS) {
        window.location.href =
          "https://apps.apple.com/us/app/flozable/id6739476657";
      }
    }, 2000);
  }, []);
  return <div>Opening app</div>;
}
