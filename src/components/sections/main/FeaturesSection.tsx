"use client";

import { fadeIn } from "@/components/animations/variants";
import { motion } from "framer-motion";
import {
  Bot,
  ChartNoAxesColumn,
  Hourglass,
  MessageSquare,
  Trophy,
  Users,
} from "lucide-react";
import { ReactNode } from "react";

interface BoxProps {
  title: string;
  description: string;
  children: ReactNode;
}

function Box({ title, description, children }: BoxProps) {
  return (
    <div className="bg-accent p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
      <div className="w-16 h-16 rounded-full bg-accent-foreground flex justify-center items-center text-accent text-xl">
        {children}
      </div>
      <h3 className="font-semibold text-[1.1rem] mt-4 mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
}

//hella minor performance opt
const featuresFadeIn = fadeIn({ once: true });

export default function FeaturesSection() {
  return (
    <section className="section-container">
      <motion.div {...featuresFadeIn}>
        <div className="text-center">
          <h2 className="heading-sm">App Features</h2>
          <h1 className="heading-lg">
            Powerful Features to Boost Your Focus and Productivity
          </h1>
        </div>
        <div className="absolute -top-20" id="features" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          <Box
            title="Timer and Study Tracker"
            description="Efficiently manage your time and track your study progress with our intuitive timer and study tracker features.">
            <Hourglass />
          </Box>
          <Box
            title="Collaborative Study Groups"
            description="Connect with like-minded individuals, form study groups, and share ideas to enhance your learning experience.">
            <Users />
          </Box>

          <Box
            title="AI-Based Study Suggestions"
            description="Receive personalized study suggestions tailored to your interests and goals, powered by our advanced AI model.">
            <Bot />
          </Box>

          <Box
            title="Active Community"
            description="Engage with a vibrant community of learners, exchange knowledge, and receive support to stay motivated and inspired.">
            <MessageSquare />
          </Box>

          <Box
            title="Study Analytics"
            description="Gain insights into your study habits with detailed statistics and trends to improve your productivity.">
            <ChartNoAxesColumn />
          </Box>

          <Box
            title="Competitive Leaderboard"
            description="Challenge yourself and others by competing on the leaderboard, fostering a sense of achievement and accountability.">
            <Trophy />
          </Box>
        </div>
      </motion.div>
    </section>
  );
}
