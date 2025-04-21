"use client";

import SelectorWrapper from "../ui/select";
import { DateTime } from "luxon";

interface TimePickerProps extends React.HTMLProps<HTMLDivElement> {
  date: Date;
  setDate: (date: Date) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ date, setDate }) => {
  return (
    <SelectorWrapper
      value={date}
      onChange={(date) => {
        setDate(date);
      }}
      options={Array.from({ length: 96 }).map((_, i) => {
        const hour = Math.floor(i / 4);
        const minute = (i % 4) * 15;

        const value = DateTime.fromJSDate(date)
          .set({ hour, minute, second: 0, millisecond: 0 })
          .toJSDate();

        const label = DateTime.fromJSDate(date)
          .set({ hour, minute })
          .toFormat("h:mm a"); // 12-hour format with AM/PM

        return { label, value };
      })}
    />
  );
};
/* 
    <Select
      defaultValue={date}
      onChange={(date) => {
        setDate(new Date(date));
      }}
    >
      <SelectTrigger className="font-normal focus:ring-0 w-[120px] focus:ring-offset-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-[15rem]">
          {Array.from({ length: 96 }).map((_, i) => {
            const hour = Math.floor(i / 4)
              .toString()
              .padStart(2, "0");
            const minute = ((i % 4) * 15).toString().padStart(2, "0");
            return (
              <SelectItem key={i} value={`${hour}:${minute}`}>
                {hour}:{minute}
              </SelectItem>
            );
          })}
        </ScrollArea>
      </SelectContent>
    </Select>
*/

export default TimePicker;
