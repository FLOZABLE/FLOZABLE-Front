import { getContrastColor } from "@/lib/utils";
import { TimelineElementType } from "@/types/timelineTypes";
import { motion, Variants } from "framer-motion";
import { BookOpen, Calendar } from "lucide-react";

interface TimelineElementProps {
  element: TimelineElementType;
  index: number;
}

export default function TimelineElement({
  element,
  index,
}: TimelineElementProps) {
  const iconColor = getContrastColor(element.color);

  // Define the animation properties using Framer Motion
  const animationVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        // Staggered delay based on index
        delay: index * 0.15,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="flex mb-8 last:mb-0"
      variants={animationVariants}
      initial="hidden"
      // Animation triggers when element scrolls into view
      whileInView="visible"
      // Only animate once, when 50% of the item is visible
      viewport={{ once: true, amount: 0.5 }}
      // Added a small whileHover effect for interactive feel
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}>
      {/* Timeline Connector & Icon */}
      <div className="flex flex-col items-center mr-4 z-10">
        <div
          className="rounded-full w-10 h-10 flex items-center justify-center shadow-xl ring-4 ring-white dark:ring-gray-900"
          style={{ backgroundColor: element.color }}>
          {/* Icon with calculated contrast color */}
          <BookOpen size={20} style={{ color: iconColor }} />
        </div>

        {/* Vertical Line Connector (Added a check for index 5 or less for continuity) */}
        {index < 5 && (
          <div className="w-0.5 flex-grow bg-gray-300 dark:bg-gray-600 my-1"></div>
        )}
      </div>

      {/* Content Card */}
      <div className="flex-1 bg-card dark:bg-gray-800 p-4 rounded-xl shadow-xl transition-shadow duration-300 transform -translate-y-1 hover:shadow-2xl">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center mb-1">
          <Calendar size={14} className="mr-1" />
          {element.date}
        </p>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {element.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          {element.description}
        </p>
      </div>
    </motion.div>
  );
}
