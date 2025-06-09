import { Copy, Check } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef, useEffect, useState } from "react";

interface CopyButtonProps extends ButtonProps {
  value: string;
}

const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, value, variant, ...props }, ref) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      if (copied) {
        const timer = setTimeout(() => {
          setCopied(false);
        }, 2000);

        return () => clearTimeout(timer);
      }
      return;
    }, [copied]);

    const copyToClipboard = async () => {
      if (!navigator.clipboard) {
        console.warn("Clipboard API not supported");
        return;
      }
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
      } catch (error) {
        console.error("Failed to copy text:", error);
      }
    };

    return (
      <Button
        variant={variant}
        className={cn(className)}
        onClick={copyToClipboard}
        ref={ref}
        {...props}
      >
        {copied ? (
          <Check className="mr-2 h-4 w-4" />
        ) : (
          <Copy className="mr-2 h-4 wsembles-4" />
        )}
        <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
        {copied ? "Copied" : "Copy"}
      </Button>
    );
  }
);

CopyButton.displayName = "CopyButton";

export { CopyButton };
