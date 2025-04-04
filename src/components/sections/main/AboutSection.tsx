"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import { IconApple, IconGoogle } from "@/components/others/Svgs";
import AppTrial from "@/components/others/AppTrial";

const words = ["Focus", "Learning", "Productivity"];

export default function AboutSection() {
  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="heading-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          About App
        </motion.h2>

        <motion.h1
          className="heading-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          #1 App for Empowering Your <FlipWords words={words} />
        </motion.h1>

        <motion.p
          className="leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Flozable is the #1 app that empowers you to regain control of your
          time and boost productivity. With innovative features and an
          interactive community, Flozable is your ultimate tool for studying,
          learning, and connecting with like-minded individuals.
          <br />
          <br />
          Experience the power of our advanced timer function, designed to
          challenge you and keep you focused on your tasks. Our AI-based study
          suggestions provide personalized course recommendations tailored to
          your interests and weaknesses. Engage in group study sessions,
          communicate with peers, and tap into the active community for
          motivation and support.
          <br />
          <br />
          Benefit from integrated school platform authorization, webcam support,
          and microphone compatibility. Achieve your goals, track your progress
          with detailed study analytics, and compete for the top spot on our
          dynamic leaderboard.
          <br />
          <br />
          Join the millions of users who have unlocked their full potential with
          Flozable. Start today and become #1 in maximizing your focus and
          productivity.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            effect="expandIcon"
            icon={ArrowRightIcon}
            iconPlacement="right"
            onClick={() =>
              window.open("https://apps.apple.com/us/app/flozable/id6739476657")
            }
          >
            <div className="download-button-inner">
              <IconApple className="icon-spacing" />
              <p>Download on the App Store</p>
            </div>
          </Button>

          <Button
            effect="expandIcon"
            icon={ArrowRightIcon}
            variant="outline"
            iconPlacement="right"
            onClick={() => {
              window.open("https://play.google.com/store/apps");
            }}
          >
            <div className="download-button-inner">
              <IconGoogle className="icon-spacing" />
              <p>Download on the Google Play</p>
            </div>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        viewport={{ once: true }}
      >
        <AppTrial />
      </motion.div>
    </section>
  );
}
