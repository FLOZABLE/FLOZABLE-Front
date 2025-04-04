"use client";

import { HeroParallax } from "@/components/ui/hero-parallax";
import { motion } from "motion/react"

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

export default function Home() {
  return (
    <main>
      <HeroParallax products={products} />
      <section>
        <p>dddd</p>
      </section>
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              <span className="font-medium uppercase text-black dark:text-white">
                <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
                  New
                </span>{" "}
                SaaS Boilerplate for Next.js
              </span>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                A Complete Solution for
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  SaaS Startup
                </span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                ultricies lacus non fermentum ultrices. Fusce consectetur le.
              </p>

              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    01
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                    React 18, Next.js 13 and TypeScript
                  </h3>
                  <p>Ut ultricies lacus non fermentum ultrices.</p>
                </div>
              </div>
              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    02
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                    Fully Customizable
                  </h3>
                  <p>consectetur adipiscing elit fermentum ultricies.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== About End ===== --> */}

      {/* <!-- ===== About Two Start ===== --> */}
      <section>
        <div className="mx-auto max-w-c-1235 overflow-hidden px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2"
            >
              <h4 className="font-medium uppercase text-black dark:text-white">
                Launch Your SaaS Fast
              </h4>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Packed with All Essential {"   "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                  Integrations
                </span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                ultricies lacus non fermentum ultrices. Fusce consectetur le.
              </p>
              <div>
                <a
                  href="#"
                  className="group mt-7.5 inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover:pr-2">
                    Know More
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                  >
                    <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
