"use client";

import AboutSection from "@/components/sections/main/AboutSection";
import FeaturesSection from "@/components/sections/main/FeaturesSection";
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

const reviews = [
  {
    name: "Jason Lee",
    description: "Future Zuck",
    review: `
      "FLOZABLE is a total game-changer for studying! I can finally
      connect with my friends and study together, even when we're not
      in the same place. It's like having a virtual study group that
      actually keeps me focused and motivated."
    `,
    imageSrc: "/img/main/testimonial-1.jpg",
  },
  {
    name: "Cameron Jiang",
    description: "Stanford Student",
    review: `
      "OMG, FLOZABLE is my new study BFF! The AI study suggestions are
      surprisingly helpful, and the timer keeps me on track without
      feeling too strict. Plus, the study icon is super cute and makes
      studying feel a little less boring."
    `,
    imageSrc: "/img/main/testimonial-2.jpg",
  },
  {
    name: "Kunlin Zheng",
    description: "TFT Player",
    review: `
      "FLOZABLE is a lifesaver during exams! The study planner helps
      me stay organized and on top of my assignments, while the chat
      feature lets me get quick answers to my questions. It's like
      having a study support group right in my pocket!"
    `,
    imageSrc: "/img/main/testimonial-3.jpg",
  },
  {
    name: "Jinting Jing",
    description: "Chinese",
    review: `
      "I can't get enough of FLOZABLE's YouTube background feature! I
      love setting up my study sessions with my favorite study
      playlists in the background. It's such a vibe and helps me stay
      in the zone."
    `,
    imageSrc: "/img/main/testimonial-4.jpg",
  },
  {
    name: "Zihang Yu",
    description: "Academic Weapon",
    review: `
      "FLOZABLE's YouTube background feature is a game-changer! I can
      play my go-to focus playlists while working, and it keeps me
      productive and in the flow."
    `,
    imageSrc: "/img/main/testimonial-5.jpg",
  },
  {
    name: "Changhoe Choe",
    description: "BLM activist",
    review: `
      "This app makes George Floyd breathe."
    `,
    imageSrc: "/img/main/testimonial-6.jpg",
  },
  {
    name: "Xinzhou Song",
    description: "MIT Quantum Researcher",
    review: `
      "I would marry FLOZABLE if I could! 😉 I can now lock in and feel rewarded for my weeklong research sessions!"
    `,
    imageSrc: "/img/main/testimonial-7.jpg",
  },
];
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
      {/* <div className="relative py-16 px-10 md:px-20 lg:px-32" id="features">
        <div className="absolute -top-20" id="feature" />
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold">App Features</h2>
          <p className="text-blue-600 mt-1 text-lg font-medium">
            Awesome Features
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          <Box
            title="Timer and Study Tracker"
            description="Efficiently manage your time and track your study progress with our intuitive timer and study tracker features."
          >
            <Hourglass />
          </Box>

          <Box
            title="Collaborative Study Groups"
            description="Connect with like-minded individuals, form study groups, and share ideas to enhance your learning experience."
          >
            <Users />
          </Box>

          <Box
            title="AI-Based Study Suggestions"
            description="Receive personalized study suggestions tailored to your interests and goals, powered by our advanced AI model."
          >
            <Bot />
          </Box>

          <Box
            title="Active Community"
            description="Engage with a vibrant community of learners, exchange knowledge, and receive support to stay motivated and inspired."
          >
            <MessageSquare />
          </Box>

          <Box
            title="Study Analytics"
            description="Gain insights into your study habits with detailed statistics and trends to improve your productivity."
          >
            <ChartNoAxesColumn />
          </Box>

          <Box
            title="Competitive Leaderboard"
            description="Challenge yourself and others by competing on the leaderboard, fostering a sense of achievement and accountability."
          >
            <Trophy />
          </Box>
        </div>
      </div> */}
    </main>
  );
}
