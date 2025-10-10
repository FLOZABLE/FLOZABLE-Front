import { secondConverter } from "@/lib/utils";
import { Subject } from "@/types/subjectTypes";
import { DateTime } from "luxon";
import { useMemo } from "react";

import Timeline from "../others/Timeline";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface StudyTimelineProps extends React.ComponentProps<"div"> {
  viewDate: Date;
  subjects: Subject[] | undefined;
}

export default function StudyTimeline({
  viewDate,
  subjects,
  ...props
}: StudyTimelineProps) {
  const timeline = useMemo(() => {
    const target = DateTime.fromJSDate(viewDate).startOf("day");

    if (!subjects?.length) return [];

    const sortedSubjects = subjects.sort(
      (a, b) => (a.created_at = b.created_at),
    );

    const index = target.diff(
      DateTime.fromSeconds(sortedSubjects[0].created_at).startOf("day"),
      "days",
    ).days;

    return subjects
      .flatMap((subject) => {
        return subject.day.timeline[index].data.map((data) => ({
          color: subject.color,
          start: data[0],
          title: `Studied ${subject.name}`,
          description: `Studied for ${secondConverter({ sec: data[1] - data[0], options: ["seconds", "minutes", "hours"] })}`,
          date:
            DateTime.fromSeconds(data[0]).toFormat("h:mm a") +
            DateTime.fromSeconds(data[1]).toFormat(" - h:mm a"),
        }));
      })
      .sort((a, b) => b.start - a.start)
      .filter((item) => item);
  }, [subjects, viewDate]);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Study Timeline</CardTitle>
        <CardDescription>
          Track your study sessions across time.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto flex-1">
        <Timeline elements={timeline} />
      </CardContent>
      <CardFooter>
        <div className="text-muted-foreground">
          View all your study activities in sequence—from start to finish.
          Perfect for reviewing progress and identifying productive streaks.
        </div>
      </CardFooter>
    </Card>
  );
}
