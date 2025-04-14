"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { useSubjects } from "@/hooks/subjectsHooks";
import { DateTime } from "luxon";
import { ViewerType } from "@/types/others";
import { getDates, getDatesDisplay, secondConverter } from "@/utils/tools";

interface StudyTrendData {
  label: string;
  time: number;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface StudyTrendChartProps {
  viewDate: Date;
  viewer: ViewerType;
}
export default function StudyTrendChart({
  viewDate,
  viewer,
}: StudyTrendChartProps) {
  const { groupedSubjects } = useSubjects();

  const [data, setData] = useState<StudyTrendData[]>([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!groupedSubjects) return;

    const dates = getDates(viewDate, viewer, 7);
    const total = groupedSubjects[viewer].total;

    const data = dates.map((dateObj) => {
      const target = dateObj.toFormat("yyyy-MM-dd");
      const matched = total.find((day) => day.date.startsWith(target));

      const label = getDatesDisplay({
        date: dateObj.toJSDate(),
        viewer,
      });

      return {
        label,
        time: matched?.data ?? 0,
      };
    });

    setData(data);

    if (data.length) {
      const description = `${data[0].label} - ${data[data.length - 1].label}`;
      setDescription(description);
    }
  }, [groupedSubjects, viewDate, viewer]);

  return (
    <Card className="flex-1/2">
      <CardHeader>
        <CardTitle>Total study time trend</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(sec) => {
                const formattedValue = secondConverter({ sec });
                return formattedValue;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  valueFormatter={(sec) => {
                    const formattedValue = secondConverter({
                      sec: Number(sec),
                    });
                    return formattedValue;
                  }}
                />
              }
            />
            <Bar dataKey="time" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(sec: number) => {
                  const formattedValue = secondConverter({ sec });
                  return formattedValue;
                }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
