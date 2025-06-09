"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ComponentProps, useMemo, useState } from "react";
import { ViewerType } from "@/types/othersTypes";
import { cn, getDates, getDatesDisplay, secondConverter } from "@/lib/utils";
import { Subject } from "@/types/subjectTypes";

type ChartDatum = {
  label: string;
  [key: string]: number | string;
};

interface SubjectsTrendChartProps extends ComponentProps<"div"> {
  viewDate: Date;
  viewer: ViewerType;
  subjects: Subject[] | undefined;
  isMine?: boolean;
}

export default function SubjectsTrendChart({
  viewDate,
  viewer,
  subjects,
  className,
  ...props
}: SubjectsTrendChartProps) {
  const [_description, setDescription] = useState("");

  const chartData = useMemo(() => {
    const dates = getDates(viewDate, viewer, 7);

    const data = dates.map((dateObj) => {
      const target = dateObj.toFormat("yyyy-MM-dd");
      const label = getDatesDisplay({
        date: dateObj.toJSDate(),
        viewer,
      });

      const data: ChartDatum = { label };

      subjects?.forEach((subject) => {
        data[subject.name] = 0;
        const matched = subject[viewer].total.find((day) =>
          day.date.startsWith(target)
        );
        data[subject.name] = matched?.data ?? 0;
      });
      return data;
    });

    if (data.length) {
      const description = `${data[0].label} - ${data[data.length - 1].label}`;
      setDescription(description);
    }

    return data;
  }, [subjects, viewDate, viewer]);

  const chartConfig: ChartConfig = useMemo(() => {
    const chartConfig: ChartConfig = {};
    subjects?.map((subject, i) => {
      chartConfig[subject.name] = {
        label: subject.name,
        color: `hsl(var(--chart-${i + 1}))`,
      };
    });
    return chartConfig;
  }, [subjects]);

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Subject Study Time Trend</CardTitle>
        <CardDescription>
          See how your study time across subjects changes over your selected
          timeframe.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 10,
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
            {Object.keys(chartData[0])
              .filter((key) => key !== "label")
              .map((key) => (
                <Area
                  key={key}
                  dataKey={key}
                  type="monotone"
                  fill={`var(--color-${key})`}
                  fillOpacity={0.4}
                  stroke={`var(--color-${key})`}
                  stackId={key}
                />
              ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
