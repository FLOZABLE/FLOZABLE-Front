import { TimelineElementType } from "@/types/timelineTypes";

import TimelineElement from "./TimelineElement";

interface TimelineProps {
  elements: TimelineElementType[];
}

export default function Timeline({ elements }: TimelineProps) {
  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen">
      {elements.map((element, index) => (
        <TimelineElement key={index} element={element} index={index} />
      ))}
    </div>
  );
}
