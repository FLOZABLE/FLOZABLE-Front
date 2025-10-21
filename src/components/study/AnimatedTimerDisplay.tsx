import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { ComponentProps } from "react";

interface AnimatedTimerDisplayProps extends ComponentProps<"div"> {
  value: number;
  isHour?: boolean;
}

export default function AnimatedTimerDisplay({
  value,
  isHour = true,
  className,
  ...props
}: AnimatedTimerDisplayProps) {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;
  return (
    <div className={cn("whitespace-nowrap shrink-0", className)} {...props}>
      {isHour && (
        <>
          <NumberFlow value={hours} format={{ minimumIntegerDigits: 2 }} />
          <span>:</span>
        </>
      )}
      <NumberFlow value={minutes} format={{ minimumIntegerDigits: 2 }} />
      <span>:</span>
      <NumberFlow value={seconds} format={{ minimumIntegerDigits: 2 }} />
    </div>
  );
}
