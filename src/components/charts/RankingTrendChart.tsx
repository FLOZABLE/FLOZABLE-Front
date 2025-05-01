"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import { ComponentProps, useMemo } from "react";
import { ViewerType } from "@/types/others";
import { useRankingsUser } from "@/hooks/rankingsHooks";
import { DateTime } from "luxon";
import { cn, getDatesDisplay } from "@/utils/tools";

const chartConfig = {
  data: {
    label: "Ranking",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface RankingTrendChartProps extends ComponentProps<"div"> {
  viewDate: Date;
  viewer: ViewerType;
  userId: string | undefined;
}

export default function RankingTrendChart({
  viewDate,
  viewer,
  userId,
  className,
  ...props
}: RankingTrendChartProps) {
  const { rankingsUserData } = useRankingsUser(userId || "", viewer, viewDate);

  const data = useMemo(() => {
    if (!rankingsUserData) return [];
    return rankingsUserData.map((ranking) => {
      const label = getDatesDisplay({
        date: DateTime.fromISO(ranking.date).toJSDate(),
        viewer,
      });
      return {
        label,
        data: ranking.ranking,
      };
    });
  }, [viewDate, viewer, rankingsUserData]);

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Ranking Trend</CardTitle>
        <CardDescription>
          See how your rank has changed over time. Stay motivated as you climb
          the leaderboard and compare your progress with others.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis reversed={true} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  valueFormatter={(ranking) => ` ${ranking}`}
                />
              }
            />
            <Line
              dataKey="data"
              type="natural"
              stroke="var(--color-data)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-data)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="text-muted-foreground">
          Showing ranking trend for the last 7 {viewer}s
        </div>
      </CardFooter>
    </Card>
  );
}
