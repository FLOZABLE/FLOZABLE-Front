import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

import styles from "./LikeButton.module.css";

interface LikeButtonProps {
  liked: boolean;
  onClick: () => void;
}

export default function LikeButton({ liked, onClick }: LikeButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn(
            "relative",
            liked && "!text-pink-400 border-current grayscale-0",
          )}
          variant={"ghost"}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}>
          <div className={`${styles.likeIcon} ${liked ? styles.liked : ""}`}>
            <Heart className={cn("w-full h-full", liked && "fill-pink-400")} />
          </div>
          {liked && (
            <>
              <div className={cn("absolute-center", styles.heartAnimation1)}>
                <Heart
                  className={cn("w-full h-full fill-pink-400")}
                  fill="currentColor"
                />
                <Heart
                  className={cn(
                    "w-[0.75rem] h-[0.625rem] fill-pink-400",
                    styles.heartAnimation1Before,
                  )}
                  fill="currentColor"
                />
                <Heart
                  className={cn(
                    "w-[0.75rem] h-[0.625rem] fill-pink-400",
                    styles.heartAnimation1After,
                  )}
                  fill="currentColor"
                />
              </div>
              <div className={styles.heartAnimation2}>
                <Heart
                  className={cn("w-full h-full fill-pink-400")}
                  fill="currentColor"
                />
                <Heart
                  className={cn(
                    "w-[0.625rem] h-[0.5rem] fill-pink-400",
                    styles.heartAnimation2Before,
                  )}
                  fill="currentColor"
                />
                <Heart
                  className={cn(
                    "w-[0.625rem] h-[0.5rem] fill-pink-400",
                    styles.heartAnimation2After,
                  )}
                  fill="currentColor"
                />
              </div>
            </>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{liked ? "Unlike" : "Like"}</TooltipContent>
    </Tooltip>
  );
}
