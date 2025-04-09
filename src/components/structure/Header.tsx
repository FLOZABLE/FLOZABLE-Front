"use client";

import { BookOpen } from "lucide-react";
import NotificationsBtn from "../buttons/NotificationsBtn";

export default function Header() {
  return (
    <header className="backdrop-blur-sm absolute top-0 left-0 w-full h-12 px-10 flex flex-row justify-between items-center">
      <div>
        <BookOpen />
      </div>
      <div>
        <NotificationsBtn />
      </div>
    </header>
  );
}
