"use client";

import { Button } from "@/components/ui/button";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type SendButtonProps = {
  onSubmit: () => void;
};

export function SendButton({ onSubmit }: SendButtonProps) {
  const [submit, setSubmit] = useState(false);

  const handleSubmit = () => {
    onSubmit();
    setSubmit(true);
    setTimeout(() => setSubmit(false), 600);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative w-10 h-10 overflow-hidden"
      onClick={handleSubmit}>
      <AnimatePresence mode="wait">
        {submit ? (
          <motion.div
            key="flying"
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={{ x: [0, 20, 20, -20, 0], y: [0, -20, 20, 20, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute">
            <FontAwesomeIcon icon={faPaperPlane} className="text-orange-500" />
          </motion.div>
        ) : (
          <motion.div
            key="normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute">
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-muted-foreground hover:text-orange-500 transition-colors"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
