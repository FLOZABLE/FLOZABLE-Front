"use client";

import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { cn } from "@/utils/tools";

type SendButtonProps = {
  onSubmit: () => void;
};

export function SendButton({ onSubmit }: SendButtonProps) {
  const [submit, setSubmit] = useState(false);

  const handleSubmit = () => {
    onSubmit();
    setSubmit(true);
    setTimeout(() => {
      setSubmit(false);
    }, 1000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSubmit}
      className="relative w-10 h-10"
    >
      <FontAwesomeIcon
        icon={faPaperPlane}
        className={cn(
          "absolute transition-colors duration-300 hover:text-orange-500",
          submit && "animate-send"
        )}
      />
    </Button>
  );
}
