"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import { IconApple, IconGoogle } from "@/components/others/Svgs";
import AppTrial from "@/components/others/AppTrial";
import { fadeIn } from "@/components/animations/variants";

const words = ["Focus", "Learning", "Productivity"];

export default function AboutSection() {
  return (
    <section className="section-container">
      <motion.div {...fadeIn({ once: true })}>
        <h2 className="heading-sm">About App</h2>

        <h1 className="heading-lg">
          #1 App for Empowering Your <FlipWords words={words} />
        </h1>

        <p className="leading-relaxed">
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
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
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
        </div>
      </motion.div>

      <motion.div {...fadeIn({ direction: "right", once: true })}>
        <AppTrial />
      </motion.div>
    </section>
  );
}
