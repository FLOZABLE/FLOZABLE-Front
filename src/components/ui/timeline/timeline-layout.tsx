"use client";

import { TimelineElement } from "@/types/timelineTypes";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

// Assuming 'Timeline' component can accept a ref and spread style props
import { Timeline, TimelineItem } from "./timeline";

interface TimelineLayoutProps {
  items: TimelineElement[];
  size?: "sm" | "md" | "lg";
  iconColor?: "primary" | "secondary" | "muted" | "accent";
  customIcon?: React.ReactNode;
  animate?: boolean;
  connectorColor?: "primary" | "secondary" | "muted" | "accent";
  className?: string;
}

export const TimelineLayout = ({
  items,
  size = "md",
  iconColor,
  customIcon,
  animate = true,
  connectorColor,
  className,
}: TimelineLayoutProps) => {
  // Use a single ref for both visibility and scroll control
  const timelineRef = useRef<HTMLOListElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);

  // Animation logic remains the same
  const inView = useInView(timelineRef, { once: false, amount: 0.1 });

  const itemAnimation = {
    opacity: animate && inView ? 1 : 0,
    y: animate && inView ? 0 : 20,
  };

  const reversedItems = [...items].reverse();

  return (
    <Timeline
      size={size}
      className={className}
      style={{
        overflowY: "auto",
      }}
      ref={timelineRef}>
      {reversedItems.map((item, index) => (
        <motion.div
          key={index}
          initial={animate ? { opacity: 0, y: 20 } : false}
          animate={itemAnimation}
          transition={{
            duration: 0.5,
            delay: animate && inView ? index * 0.15 : 0,
            ease: "easeOut",
          }}
          ref={(ref) => {
            if (index === 0) {
              firstItemRef.current = ref;
            }
          }}>
          <TimelineItem
            date={item.date}
            title={item.title}
            description={item.description}
            icon={
              typeof item.icon === "function"
                ? item.icon()
                : item.icon || customIcon
            }
            iconColor={item.color || iconColor}
            connectorColor={item.color || connectorColor}
            showConnector={index !== reversedItems.length - 1}
          />
        </motion.div>
      ))}
    </Timeline>
  );
};
