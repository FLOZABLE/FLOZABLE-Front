import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAccount } from "@/hooks/accountHooks";
import StudyBtn from "../buttons/StudyBtn";
import Image from "next/image";
import { ComponentProps, useMemo } from "react";
import { useSubjects } from "@/hooks/subjectsHooks";
import {
  DynamicTimeParts,
  secondConverter,
  splitSecondConverter,
  streakCalculator,
  todayFocusCalculator,
  todayTotalCalculator,
} from "@/utils/tools";
import { useExtensionUsage } from "@/hooks/extensionHooks";

export default function Welcome({ ...props }: ComponentProps<"div">) {
  const { account } = useAccount();
  const { subjects, groupedSubjects } = useSubjects();
  const { extensionUsage } = useExtensionUsage(
    new Date(new Date().setHours(0, 0, 0, 0)),
    "day"
  );

  const studyTime: DynamicTimeParts | undefined = useMemo(() => {
    if (!groupedSubjects?.day) return;
    const todayTotal = todayTotalCalculator(groupedSubjects);
    const formattedTodayTotal = splitSecondConverter({
      sec: todayTotal,
      options: ["seconds", "minutes", "hours"],
    });
    return formattedTodayTotal;
  }, [groupedSubjects]);

  const websiteTime: DynamicTimeParts | undefined = useMemo(() => {
    if (!extensionUsage) return;
    const totalWebsiteUsage = extensionUsage.reduce((a, b) => {
      return a + b.duration;
    }, 0);
    const formattedWebsiteUsage = splitSecondConverter({
      sec: totalWebsiteUsage,
      options: ["seconds", "minutes", "hours"],
    });
    return formattedWebsiteUsage;
  }, [extensionUsage]);

  const focus: DynamicTimeParts | undefined = useMemo(() => {
    if (!groupedSubjects) return;
    const focus = todayFocusCalculator(groupedSubjects);
    const formattedFocus = splitSecondConverter({
      sec: focus,
      options: ["seconds", "minutes", "hours"],
    });
    return formattedFocus;
  }, [groupedSubjects]);

  const streak = useMemo(() => {
    if (!groupedSubjects) return "0 day";
    const streaks = streakCalculator(groupedSubjects);
    return `${streaks} days`;
  }, [groupedSubjects]);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-3xl">Hi, {account?.name} 👋</CardTitle>
        <CardDescription className="flex">
          <p>What do you want to learn today?</p>
          <Image
            alt="cover image"
            width={40}
            height={40}
            className="w-48 ml-auto h-auto object-cover"
            src={"/img/icons/study.svg"}
          />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <StudyBtn />
      </CardFooter>
    </Card>
  );
}
