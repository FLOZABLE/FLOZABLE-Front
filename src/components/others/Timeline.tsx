import { TimelineElementType } from "@/types/timelineTypes";

import TimelineElement from "./TimelineElement";

interface TimelineProps {
  elements: TimelineElementType[];
}

export default function Timeline({ elements }: TimelineProps) {
  return (
    <div>
      {elements.map((element, index) => {
        return <TimelineElement key={index} element={element} />;
      })}
    </div>
  );
}
