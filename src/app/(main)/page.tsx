import AboutSection from "@/components/sections/main/AboutSection";
import FeaturesSection from "@/components/sections/main/FeaturesSection";
import ReviewsSection from "@/components/sections/main/ReviewsSection";
import { HeroParallax } from "@/components/ui/hero-parallax";

const products = [
  {
    title: "Dashboard",
    link: "/dashboard",
    thumbnail: "/img/demo/dashboard.png",
  },
  {
    title: "Groups",
    link: "/dashboard/groups",
    thumbnail: "/img/demo/groups1.png",
  },
  {
    title: "Groups 2",
    link: "/dashboard/groups",
    thumbnail: "/img/demo/groups2.png",
  },
  {
    title: "Leaderboard",
    link: "/dashboard/leaderboard",
    thumbnail: "/img/demo/leaderboard.png",
  },
  {
    title: "Planner",
    link: "/dashboard/Planner",
    thumbnail: "/img/demo/planner.png",
  },
  {
    title: "Stats",
    link: "/dashboard/stats",
    thumbnail: "/img/demo/stats.png",
  },
  {
    title: "Study",
    link: "/dashboard/study",
    thumbnail: "/img/demo/study.png",
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
