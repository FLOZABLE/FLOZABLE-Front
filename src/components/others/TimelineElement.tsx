import { TimelineElementType } from "@/types/timelineTypes";

import { Separator } from "../ui/separator";

interface TimelineElementProps {
  element: TimelineElementType;
}

export default function TimelineElement({ element }: TimelineElementProps) {
  return (
    <div className="items-center flex flex-col bg-red-200 my-2 py-2">
      <div className="flex w-full gap-10">
        <div className="flex-1 flex justify-end">
          <p className="text-muted-foreground">{element.date}</p>
        </div>
        <div
          className="rounded-full w-10 h-10"
          style={{ backgroundColor: element.color }}></div>
        <div className="flex-1">
          <p className="text-2xl">{element.title}</p>
        </div>
      </div>
      <Separator
        className="min-h-10 my-2 h-full flex-1 grow"
        orientation="vertical"
      />
    </div>
  );
}
