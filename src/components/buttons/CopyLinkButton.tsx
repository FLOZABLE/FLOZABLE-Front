import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Check, Link } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import config from "@/utils/config";

interface CopyLinkButtonProps {
  link: string;
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ link }) => {
  const [copied, setCopied] = useState(false);
  const handleClick = async () => {
    copyToClipboard(link.startsWith("/") ? config.next_server + link : link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset copied state after 2 seconds
  };

  const copyToClipboard = async (link: string) => {
    if (!navigator.clipboard) {
      console.warn("Clipboard API not supported");
      return;
    }
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={handleClick} variant={"ghost"}>
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Check />
              </motion.div>
            ) : (
              <motion.div
                key="link"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Link />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{copied ? "Copied!" : "Click to copy"}</TooltipContent>
    </Tooltip>
  );
};

export default CopyLinkButton;
