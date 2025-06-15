import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

import { Button, ButtonProps } from "../ui/button";

interface AnimatedSwitchButtonProps extends ButtonProps {
  onIcon: ReactNode;
  offIcon: ReactNode;
  clicked: boolean;
}
export default function AnimatedSwitchButton({
  onIcon,
  offIcon,
  clicked,
  ...props
}: AnimatedSwitchButtonProps) {
  return (
    <Button {...props}>
      <AnimatePresence mode="wait" initial={false}>
        {clicked ? (
          <motion.div
            key="pause"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}>
            {onIcon}
          </motion.div>
        ) : (
          <motion.div
            key="play"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}>
            {offIcon}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
