import {
  secondConverter,
  streakCalculator,
  todayTotalCalculator,
} from "@/lib/utils";
import { Userinfo } from "@/types/accountTypes";
import { GroupedSubjects, Subject } from "@/types/subjectTypes";
import { BookOpen, Flame, MapPin } from "lucide-react";
import { DateTime, DurationUnit } from "luxon";
import { ComponentProps, ReactNode, useMemo } from "react";

import ChatButton from "../buttons/ChatButton";
import FriendRequestButton from "../buttons/FriendRequestButton";
import AvatarWrapper from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import CountryViewer from "./CountryViewer";

type InfoBoxProps = {
  icon: ReactNode;
  name: string;
  value: string;
};

function InfoBox({ icon, value }: InfoBoxProps) {
  return (
    <Badge variant={"outline"}>
      {icon}
      {value}
    </Badge>
  );
}

interface ProfileCardProps extends ComponentProps<"div"> {
  userInfo: Userinfo;
  subjects: Subject[];
  groupedSubjects: GroupedSubjects;
}

export default function ProfileCard({
  userInfo,
  groupedSubjects,
  ...props
}: ProfileCardProps) {
  const joinedAt = useMemo(() => {
    const diff = DateTime.now().diff(DateTime.fromSeconds(userInfo.created_at));
    const diffSec = diff.as("seconds");

    let mode: DurationUnit = "seconds";

    if (diffSec > 60 * 60 * 24 * 30) {
      mode = "months";
    } else if (diffSec > 60 * 60 * 24) {
      mode = "days";
    } else if (diffSec > 60 * 60) {
      mode = "hours";
    } else if (diffSec > 60) {
      mode = "minutes";
    }

    const value = Math.round(diff.as(mode));
    return `Joined ${value} ${mode} ago`;
  }, [userInfo.created_at]);

  const studyTime = useMemo(() => {
    const todayTotal = todayTotalCalculator(groupedSubjects);
    const formattedTodayTotal = secondConverter({
      sec: todayTotal,
    });
    return formattedTodayTotal;
  }, [groupedSubjects]);

  const streak = useMemo(() => {
    if (!groupedSubjects.day) return "";
    const streaks = streakCalculator(groupedSubjects);
    return streaks + " days";
  }, [groupedSubjects]);

  return (
    <Card {...props}>
      <CardHeader className="flex flex-col items-center justify-center overflow-hidden">
        <AvatarWrapper
          className="size-30"
          userId={userInfo.user_id}
          name={userInfo.name}
        />
        <CardTitle className="flex gap-1 w-full justify-center">
          <p className="truncate">{userInfo.name}</p>
          <CountryViewer timezone={userInfo.timezone} className="shrink-0" />
        </CardTitle>
        <CardDescription>{joinedAt}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex gap-2">
          <InfoBox
            icon={<BookOpen size={30} />}
            name={"Study Time"}
            value={studyTime}
          />
          <InfoBox icon={<Flame size={30} />} name={"Streak"} value={streak} />
        </div>
        <div className="flex gap-1">
          <MapPin />
          {userInfo.timezone}
        </div>
        <div className="flex gap-2  justify-center">
          <FriendRequestButton userInfo={userInfo} />
          <ChatButton userInfo={userInfo} />
        </div>
      </CardContent>
    </Card>
  );
}
