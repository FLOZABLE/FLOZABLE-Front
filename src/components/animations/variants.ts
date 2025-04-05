// animations/variants.ts
import { MotionProps } from "framer-motion";

type Direction = "left" | "right" | "up" | "down";

interface FadeInOptions extends MotionProps {
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

export const fadeIn = ({
  direction = "left",
  delay = 0.3,
  duration = 0.7,
  distance = 50,
  once = false,
  ...rest
}: FadeInOptions = {}): MotionProps => {
  let x = 0,
    y = 0;

  if (direction === "left") x = -distance;
  if (direction === "right") x = distance;
  if (direction === "up") y = -distance;
  if (direction === "down") y = distance;

  return {
    initial: { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    transition: { delay, duration, ease: "easeOut" },
    viewport: { once },
    ...rest, // let user override everything else (e.g. variants, transition, etc)
  };
};
