import { cn } from "@/lib/utils";
import { TimelineElementType } from "@/types/timelineTypes";

import TimelineElement from "./TimelineElement";

interface TimelineProps extends React.ComponentProps<"div"> {
  elements: TimelineElementType[];
}

export default function Timeline({
  elements,
  className,
  ...props
}: TimelineProps) {
  return (
    <div className={cn("p-8 max-w-2xl mx-auto", className)} {...props}>
      {elements.map((element, index) => (
        <TimelineElement key={index} element={element} index={index} />
      ))}
    </div>
  );
}
