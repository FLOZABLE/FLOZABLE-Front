import { GroupedSubjects } from "@/types/subject";
import { cn } from "@/utils/tools";
import { ComponentProps, useEffect, useMemo, useRef } from "react";

type StreakDataType = {
  isStreak: boolean;
  value: number;
};

interface SimpleStudyTimeChartProps extends ComponentProps<"div"> {
  groupedSubjects: GroupedSubjects | undefined;
}

export default function SimpleStudyTimeChart({
  groupedSubjects,
  className,
}: SimpleStudyTimeChartProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const streakData: { data: StreakDataType[]; max: number } = useMemo(() => {
    if (!groupedSubjects?.day?.total) return { data: [], max: 0 };
    const reversedDaily = groupedSubjects.day.total.toReversed();

    const data: StreakDataType[] = [];
    let isStreak = true;

    reversedDaily.slice(0, 50).map((day) => {
      if (!day.data) {
        isStreak = false;
      }
      data.push({ isStreak, value: day.data });
    });
    const max = data.toSorted((a, b) => b.value - a.value)[0]?.value || 0;
    data.reverse();
    data.push(...Array(5).fill({ isStreak: false, value: 0 }));
    return { data, max };
  }, [groupedSubjects]);

  useEffect(() => {
    const element = scrollContainerRef.current;

    if (element && element.scrollWidth > element.clientWidth) {
      setTimeout(() => {
        element.scrollTo({
          left: element.scrollWidth,
          behavior: "smooth",
        });
      }, 500);
    }
  }, [streakData.data]);

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div
        className="w-full h-full flex items-end gap-3 overflow-auto pb-3"
        ref={scrollContainerRef}
      >
        {streakData.data.map((data, i) => {
          return (
            <div
              key={i}
              style={{ height: (data.value / streakData.max) * 100 + "%" }}
              className={cn(
                "w-[7px] min-h-2 rounded-sm h-fit shrink-0",
                data.isStreak ? "bg-amber-500" : "bg-border"
              )}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
