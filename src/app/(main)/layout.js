"use client";

import { MainHeader } from "@/components/structure/MainHeader";
import MainFooter from "@/components/structure/MainFooter";

export default function MainLayout({ children }) {
  return (
    <div>
      <MainHeader />
      {children}
      <MainFooter />
    </div>
  );
}
