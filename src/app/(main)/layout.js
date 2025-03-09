"use client";

import MainFooter from "@/components/structure/MainFooter/MainFooter";
import MainHeader from "@/components/structure/MainHeader/MainHeader";
import { useEffect } from "react";

export default function MainLayout({ children }) {
  useEffect(() => {
    // Set font size for the Onboarding page
    document.documentElement.style.fontSize = "15px";

    // Cleanup: Reset font size when leaving the page
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, []);

  return (
    <div>
      <MainHeader />
      {children}
      <MainFooter />
    </div>
  );
}
