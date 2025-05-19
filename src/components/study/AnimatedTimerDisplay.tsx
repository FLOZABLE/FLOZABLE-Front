import { cn } from "@/utils/tools";
import NumberFlow from "@number-flow/react";
import { ComponentProps } from "react";

interface AnimatedTimerDisplayProps extends ComponentProps<"div"> {
  value: number;
}

export default function AnimatedTimerDisplay({
  value,
  className,
  ...props
}: AnimatedTimerDisplayProps) {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;
  return (
    <div className={cn("", className)} {...props}>
      <NumberFlow value={hours} format={{ minimumIntegerDigits: 2 }} />
      <span>:</span>
      <NumberFlow value={minutes} format={{ minimumIntegerDigits: 2 }} />
      <span>:</span>
      <NumberFlow value={seconds} format={{ minimumIntegerDigits: 2 }} />
    </div>
  );
}
