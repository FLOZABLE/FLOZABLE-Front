"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, getDatesDisplay } from "@/lib/utils";
import { ViewerType } from "@/types/othersTypes";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

interface DatePickerProps
  extends React.ComponentProps<typeof PopoverPrimitive.Content> {
  viewDate: Date;
  setViewDate: (date: Date) => void;
  viewer: ViewerType;
}

export function DatePicker({
  viewDate,
  setViewDate,
  viewer,
  ...props
}: DatePickerProps) {
  const [disp, setDisp] = useState("");
  const [options, setOptions] = useState<{ label: string; value: Date }[]>([]);

  useEffect(() => {
    const disp = getDatesDisplay({
      date: viewDate,
      viewer,
      formats: {
        day: "cccc, LLL d",
        week: "LLL d",
        month: "kkkk LLL",
      },
    });
    setDisp(disp);
  }, [viewDate, viewer]);

  useEffect(() => {
    const now = DateTime.now().startOf("day");

    let opts: { label: string; value: Date }[] = [];

    if (viewer === "day") {
      opts = [
        { label: "Today", value: now.startOf("day").toJSDate() },
        {
          label: "Yesterday",
          value: now.minus({ days: 1 }).startOf("day").toJSDate(),
        },
        {
          label: "Same day last week",
          value: now.minus({ weeks: 1 }).startOf("day").toJSDate(),
        },
      ];
    } else if (viewer === "week") {
      opts = [
        { label: "This week", value: now.startOf("week").toJSDate() },
        {
          label: "Last week",
          value: now.minus({ weeks: 1 }).startOf("week").toJSDate(),
        },
        {
          label: "Same week last month",
          value: now.minus({ months: 1 }).startOf("week").toJSDate(),
        },
      ];
    } else if (viewer === "month") {
      opts = [
        { label: "This month", value: now.startOf("month").toJSDate() },
        {
          label: "Last month",
          value: now.minus({ months: 1 }).startOf("month").toJSDate(),
        },
      ];
    }

    setOptions(opts);
  }, [viewer]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !viewDate ? "text-muted-foreground" : "",
          )}>
          <CalendarIcon />
          {disp}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        {...props}
        className={cn(
          "z-50 pointer-events-auto flex w-auto flex-col space-y-2 p-2",
          props.className,
        )}>
        <Select
          onValueChange={(value) => {
            const date = DateTime.fromISO(value).toJSDate();
            setViewDate(date);
          }}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            {options.map((option, i) => (
              <SelectItem key={i} value={option.value.toISOString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={viewDate}
            onSelect={(date) => {
              if (date) {
                setViewDate(date);
              }
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
