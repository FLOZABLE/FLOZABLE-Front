"use client";

import { BookOpen, Brain, Flame, Hourglass } from "lucide-react";
import NotificationsBtn from "../buttons/NotificationsBtn";
import { ThemeToggleBtn } from "../buttons/ThemeToggleBtn";
import AvatarWrapper from "../ui/avatar";
import { useAccount } from "@/hooks/accountHooks";
import { ReactNode, useEffect, useState } from "react";
import { useSubjects } from "@/hooks/subjectsHooks";
import {
  useExtensionSettings,
  useExtensionUsage,
} from "@/hooks/extensionHooks";
import {
  secondConverter,
  streakCalculator,
  todayFocusCalculator,
  todayTotalCalculator,
} from "@/utils/tools";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

type InfoBoxProps = {
  icon: ReactNode;
  name: string;
  value: string;
};

function InfoBox({ icon, name, value }: InfoBoxProps) {
  return (
    <div className="flex gap-2 items-center">
      {icon}
      <div className="">
        <p className="text-sm">{name}</p>
        <Badge>
          <p>{value}</p>
        </Badge>
      </div>
    </div>
  );
}

export default function Header() {
  const { account } = useAccount();
  const { groupedSubjects } = useSubjects();

  const [studyTime, setStudyTime] = useState("0 minutes");
  const [websiteTime, setWebsiteTime] = useState("0 minutes");
  const [focusTime, setFocusTime] = useState("0 seconds");
  const [streak, setStreak] = useState("0 days");
  const { useExtensionSettingsData } = useExtensionSettings();

  const { extensionUsageData } = useExtensionUsage(
    new Date(new Date().setHours(0, 0, 0, 0)),
    "day"
  );

  useEffect(() => {
    if (!groupedSubjects?.day) return;

    //Solve day
    const todayTotal = todayTotalCalculator(groupedSubjects);
    const formattedTodayTotal = secondConverter({
      sec: todayTotal,
      options: ["seconds", "minutes", "hours"],
    });
    setStudyTime(formattedTodayTotal);

    //Solve streak
    const streaks = streakCalculator(groupedSubjects);
    setStreak(streaks + " days");

    const focus = todayFocusCalculator(groupedSubjects);
    const formattedFocus = secondConverter({
      sec: focus,
      options: ["seconds", "minutes", "hours"],
    });
    setFocusTime(formattedFocus);
  }, [groupedSubjects]);

  useEffect(() => {
    if (!extensionUsageData?.success || !extensionUsageData.data.usage.length)
      return;
    const totalWebsiteUsage = extensionUsageData.data.usage.reduce((a, b) => {
      return a + b.duration;
    }, 0);
    const formattedWebsiteUsage = secondConverter({
      sec: totalWebsiteUsage,
      options: ["seconds", "minutes", "hours"],
    });
    setWebsiteTime(formattedWebsiteUsage);
  }, [extensionUsageData]);

  console.log("account", account)
  
  return (
    <header className="backdrop-blur-sm sticky top-0 left-0 w-full h-12 px-10 flex flex-row justify-between items-center">
      <div className="flex gap-3 items-center">
        <InfoBox
          icon={<BookOpen size={30} />}
          name={"Study Time"}
          value={studyTime}
        />
        <Separator orientation="vertical" className="min-w-0.5 min-h-10 mx-5" />
        <InfoBox
          icon={<Hourglass size={30} />}
          name={"Website Usage"}
          value={websiteTime}
        />
        <Separator orientation="vertical" className="min-w-0.5 min-h-10 mx-5" />
        <InfoBox icon={<Flame size={30} />} name={"Streak"} value={streak} />
        <Separator orientation="vertical" className="min-w-0.5 min-h-10 mx-5" />
        <InfoBox
          icon={<Brain size={30} />}
          name={"Focus Time"}
          value={focusTime}
        />
      </div>
      <div className="flex gap-3 items-center">
        <NotificationsBtn />
        <ThemeToggleBtn />
        <AvatarWrapper
          name={account?.name || ""}
          userId={account?.user_id}
        />
      </div>
    </header>
  );
}
