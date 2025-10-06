import { secondConverter } from "@/lib/utils";
import { Subject } from "@/types/subjectTypes";
import { TimelineStatus } from "@/types/timelineTypes";
import { Check } from "lucide-react";
import { DateTime } from "luxon";
import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TimelineLayout } from "../ui/timeline/timeline-layout";

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
      .flatMap((subject, i) => {
        return subject.day.timeline[index].data.map((data) => ({
          subject_id: subject.subject_id,
          name: subject.name,
          //color: subject.color,
          data: data,
          icon: <Check />,
          id: i,
          status: "in-progress" as TimelineStatus,
          title: `Studied ${subject.name}`,
          description: `Studied for ${secondConverter({ sec: data[1] - data[0], options: ["seconds", "minutes", "hours"] })}`,
          date:
            DateTime.fromSeconds(data[0]).toFormat("h:mm a") +
            DateTime.fromSeconds(data[1]).toFormat(" - h:mm a"),
        }));
      })
      .sort((a, b) => a.data[0] - b.data[1]);
  }, [subjects, viewDate]);

  console.log("gd", timeline);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Study Timeline</CardTitle>
        <CardDescription>
          Visualize your daily study habits at a glance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TimelineLayout items={timeline} size="md" />
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
