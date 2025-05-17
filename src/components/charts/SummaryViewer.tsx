import { useExtensionUsage } from "@/hooks/extensionHooks";
import { useSubjects } from "@/hooks/subjectsHooks";
import {
  cn,
  DynamicTimeParts,
  splitSecondConverter,
  streakCalculator,
  todayFocusCalculator,
  todayTotalCalculator,
} from "@/utils/tools";
import { ComponentProps, useMemo } from "react";
import { Card, CardContent } from "../ui/card";
import NumberFlow from "@number-flow/react";
import SimpleStudyTimeChart from "./SimpleStudyTimeChart";

interface TimeDisplayProps {
  title: string;
  timeParts: DynamicTimeParts | undefined;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ title, timeParts }) => {
  return (
    <div>
      {timeParts &&
        Object.keys(timeParts).map((key) => {
          const value = timeParts[key];
          if (value !== null && value !== undefined) {
            return (
              <span key={key} className="flex gap-1 items-baseline h-14">
                <NumberFlow
                  value={value || 0}
                  className={"text-5xl font-bold"}
                />
                <p className="font-semibold text-2xl">{key}</p>
              </span>
            );
          }
          return null;
        })}
      <p>{title}</p>
    </div>
  );
};

export default function SummaryViewer({
  className,
  ...props
}: ComponentProps<"div">) {
  const { groupedSubjects } = useSubjects();
  const { extensionUsage } = useExtensionUsage(
    new Date(new Date().setHours(0, 0, 0, 0)),
    "day"
  );

  const studyTime: DynamicTimeParts | undefined = useMemo(() => {
    if (!groupedSubjects?.day) return;
    const todayTotal = todayTotalCalculator(groupedSubjects);
    const formattedTodayTotal = splitSecondConverter({
      sec: todayTotal,
      options: ["sec", "mins", "hours"],
    });
    return formattedTodayTotal;
  }, [groupedSubjects]);

  const websiteTime: DynamicTimeParts | undefined = useMemo(() => {
    if (!extensionUsage) return;
    const totalWebsiteUsage = extensionUsage.reduce((a, b) => {
      return a + b.duration;
    }, 0);
    const formattedWebsiteUsage = splitSecondConverter({
      sec: totalWebsiteUsage,
      options: ["sec", "mins", "hours"],
    });
    return formattedWebsiteUsage;
  }, [extensionUsage]);

  const focusTime: DynamicTimeParts | undefined = useMemo(() => {
    if (!groupedSubjects) return;
    const focus = todayFocusCalculator(groupedSubjects);
    const formattedFocus = splitSecondConverter({
      sec: focus,
      options: ["sec", "mins", "hours"],
    });
    return formattedFocus;
  }, [groupedSubjects]);

  const streak = useMemo(() => {
    if (!groupedSubjects) return 0;
    const streaks = streakCalculator(groupedSubjects);
    return streaks;
  }, [groupedSubjects]);

  return (
    <Card className={cn("border-0 shadow-none", className)} {...props}>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <TimeDisplay title="Study Time" timeParts={studyTime} />
          <TimeDisplay title="Focus Time" timeParts={focusTime} />
          <TimeDisplay title="Website Usage" timeParts={websiteTime} />
        </div>
        <div className="mt-3 flex">
          <div className="flex-1/2">
            <span className="flex items-baseline gap-1 h-14">
              <p className="text-5xl font-bold">
                <NumberFlow value={streak} />
              </p>
              <p className="font-semibold text-2xl">days</p>
            </span>
            <p>Streak</p>
          </div>
          <SimpleStudyTimeChart
            groupedSubjects={groupedSubjects}
            className="flex-1/2"
          />
        </div>
      </CardContent>
    </Card>
  );
}
