"use client";

import AboutSection from "@/components/sections/main/AboutSection";
import FeaturesSection from "@/components/sections/main/FeaturesSection";
import ReviewsSection from "@/components/sections/main/ReviewsSection";
import { HeroParallax } from "@/components/ui/hero-parallax";

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

export default function Home() {
  return (
    <main>
      <HeroParallax products={products} />
      <AboutSection />
      <FeaturesSection />
      <ReviewsSection />
    </main>
  );
}
