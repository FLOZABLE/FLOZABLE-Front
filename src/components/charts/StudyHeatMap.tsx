import { CalendarHeatmap } from "../ui/calendar-heatmap";

export default function StudyHeatMap() {
  return (
    <CalendarHeatmap
      variantClassnames={[
        "text-white hover:text-white bg-green-400 hover:bg-green-400",
        "text-white hover:text-white bg-green-500 hover:bg-green-500",
        "text-white hover:text-white bg-green-700 hover:bg-green-700",
      ]}
      weightedDates={[
        { date: new Date("Jan 1, 2024"), weight: 2 },
        { date: new Date("Jan 15, 2024"), weight: 1.5 },
        { date: new Date("Jun 12, 2024"), weight: 8 },
        { date: new Date("July 1, 2024"), weight: 5 },
        { date: new Date("Jan 19, 2024"), weight: 6 },
        { date: new Date("Apr 19, 2024"), weight: 13.5 },
      ]}
    />
  );
}
