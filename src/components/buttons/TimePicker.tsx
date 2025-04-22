"use client";

import { useEffect, useMemo } from "react";
import { DateTime } from "luxon";
import SelectorWrapper from "../ui/select";

interface TimePickerProps extends React.HTMLProps<HTMLDivElement> {
  date: Date;
  setDate: (date: Date) => void;
}

const roundToNearest15 = (dt: DateTime): DateTime =>
  dt
    .set({ second: 0, millisecond: 0 })
    .plus({ minutes: 7.5 })
    .set({
      minute: Math.floor(dt.minute / 15) * 15,
      second: 0,
      millisecond: 0,
    });

const TimePicker: React.FC<TimePickerProps> = ({ date, setDate }) => {
  const baseDate = useMemo(() => DateTime.fromJSDate(date), [date]);
  const rounded = useMemo(() => roundToNearest15(baseDate), [baseDate]);

  useEffect(() => {
    if (baseDate.toISO() !== rounded.toISO()) {
      setDate(rounded.toJSDate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseDate, rounded]);

  const options = useMemo(
    () =>
      Array.from({ length: 96 }).map((_, i) => {
        const option = baseDate.startOf("day").plus({ minutes: i * 15 });
        return {
          label: option.toFormat("h:mm a"),
          value: option.toISO() ?? "", // never undefined
        };
      }),
    [baseDate]
  );

  const selectedISO = useMemo(() => {
    const roundedDate = roundToNearest15(DateTime.fromJSDate(date));
    return roundedDate.toISO();
  }, [date]);

  return (
    <SelectorWrapper
      value={selectedISO ?? ""}
      onChange={(val: string) => {
        const dt = DateTime.fromISO(val);
        if (dt.isValid) setDate(dt.toJSDate());
      }}
      options={options}
    />
  );
};

export default TimePicker;
