import CalendarHeatmap, {
  ReactCalendarHeatmapValue,
  TooltipDataAttrs,
} from "react-calendar-heatmap";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DateTime } from "luxon";
import { getDatesDisplay, secondConverter } from "@/utils/tools";
import { GroupedSubjects } from "@/types/subject";
import { MouseEvent, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StudyHeatMapProps {
  viewDate: Date;
  groupedSubjects: GroupedSubjects | undefined;
}

export default function StudyHeatMap({
  viewDate,
  groupedSubjects,
}: StudyHeatMapProps) {
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    label: string;
  } | null>(null);

  const handleMouseEnter = (
    e: MouseEvent,
    value: ReactCalendarHeatmapValue<string>
  ) => {
    if (!value.date) return;
    const label = secondConverter({ sec: value.count });
    const formattedDate = getDatesDisplay({
      date: DateTime.fromISO(value.date).toJSDate(),
      viewer: "day",
    });
    setTooltipData({
      x: e.clientX,
      y: e.clientY,
      label: `${label} on ${formattedDate}`,
    });
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Time Heatmap</CardTitle>
        <CardDescription>
          Visualize your daily study habits at a glance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CalendarHeatmap
          startDate={DateTime.fromJSDate(viewDate)
            .endOf("year")
            .minus({ year: 1 })
            .toJSDate()}
          endDate={DateTime.fromJSDate(viewDate).endOf("year").toJSDate()}
          tooltipDataAttrs={(
            value: CalendarHeatmap.ReactCalendarHeatmapValue<string> | undefined
          ) => {
            if (!value?.date) {
              return {} as TooltipDataAttrs;
            }
            return {
              onMouseEnter: (e: MouseEvent) => handleMouseEnter(e, value),
              onMouseOut: handleMouseLeave,
            };
          }}
          values={
            groupedSubjects?.day?.total.map((day) => ({
              date: day.date,
              count: day.data,
            })) || []
          }
          showWeekdayLabels={true}
        />
        {tooltipData && (
          <Tooltip open>
            <TooltipTrigger asChild>
              <div
                style={{
                  position: "fixed",
                  top: tooltipData.y - 10,
                  left: tooltipData.x,
                  pointerEvents: "none",
                }}
              >
                <TooltipContent side="top">{tooltipData.label}</TooltipContent>
              </div>
            </TooltipTrigger>
          </Tooltip>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-muted-foreground">
          See your daily study patterns—darker shades mean more time. Great for
          spotting habits and staying consistent.
        </div>
      </CardFooter>
    </Card>
  );
}
