"use client";

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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ComponentProps, useEffect, useState } from "react";
import { useSubjects } from "@/hooks/subjectsHooks";
import { ViewerType } from "@/types/others";
import { getDates, getDatesDisplay, secondConverter } from "@/utils/tools";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

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

interface StudyTrendChartProps extends ComponentProps<"div"> {
  viewDate: Date;
  viewer: ViewerType;
}
export default function StudyTrendChart({
  viewDate,
  viewer,
  ...props
}: StudyTrendChartProps) {
  const router = useRouter();

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
    <Card {...props}>
      <CardHeader>
        <CardTitle>Total study time trend</CardTitle>
        <CardDescription className="flex items-center">
          {description}
          <Button
            onClick={() => {
              router.push("/dashboard/subjects");
            }}
            effect={"hoverUnderline"}
            variant={"link"}
            className="ml-auto"
          >
            View by subjects
          </Button>
        </CardDescription>
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
    </Card>
  );
}
