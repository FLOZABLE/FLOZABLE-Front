"use client";

import AboutSection from "@/components/sections/main/AboutSection";
import FeaturesSection from "@/components/sections/main/FeaturesSection";
import ReviewSection from "@/components/sections/main/ReviewSection";
import { HeroParallax } from "@/components/ui/hero-parallax";
import {
  Bot,
  ChartNoAxesColumn,
  Hourglass,
  MessageSquare,
  Trophy,
  Users,
} from "lucide-react";
import { ReactNode } from "react";

const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "/img/demo/study.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: "/img/demo/plans.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: "/img/demo/stats.png",
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: "/img/demo/dashboard.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail: "/img/demo/leaderboard.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: "/img/demo/friends.png",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: "/img/demo/themes.png",
  },
];

interface BoxProps {
  title: string;
  description: string;
  children: ReactNode;
}

function Box({ title, description, children }: BoxProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-4">
      <div className="w-16 h-16 rounded-full bg-blue-300 flex justify-center items-center text-white text-xl">
        {children}
      </div>
      <h3 className="text-black font-semibold text-[1.1rem] mt-4 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <HeroParallax products={products} />
      <AboutSection />
      <FeaturesSection />
      <ReviewSection />
    </main>
  );
}
