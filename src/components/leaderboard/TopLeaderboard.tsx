import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAccount } from "@/hooks/accountHooks";
import { useRankings } from "@/hooks/rankingHooks";
import { getDatesDisplay, secondConverter } from "@/lib/utils";
import { ViewerType } from "@/types/otherTypes";
import { Ranking } from "@/types/rankingTypes";
import { ArrowRight, Loader2 } from "lucide-react";
import { DateTime } from "luxon";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import UserContainer from "../users/UserContainer";

interface RankingContainerProps {
  title?: string;
  viewDate: Date;
  viewer: ViewerType;
  isOnlyFriends: boolean;
}

function RankingContainer({
  title,
  viewDate,
  viewer,
  isOnlyFriends,
}: RankingContainerProps) {
  const { rankingsData, rankingsIsLoading } = useRankings(viewer, viewDate);
  const { account } = useAccount();
  const router = useRouter();

  let slicedRanking: Ranking[] = [];

  if (rankingsData) {
    const rankings = rankingsData;
    if (account && isOnlyFriends) {
      slicedRanking = rankings
        .filter(
          (ranking) =>
            account.friends.includes(ranking.user_id) ||
            ranking.user_id === account.user_id,
        )
        .slice(0, 3);
    } else {
      slicedRanking = rankings.slice(0, 3);
    }
  }

  return (
    <div className="nth-last-[1]:pb-5">
      {title && <p className="text-sm">{title}</p>}
      {!rankingsIsLoading && rankingsData ? (
        slicedRanking.map((user, i) => (
          <div
            key={i}
            className="flex gap-1 items-center"
            style={{ zIndex: slicedRanking.length - i }}>
            <p className="text-sm">{i + 1}.</p>
            <UserContainer
              userinfo={user}
              onClick={() => router.push(`/dashboard/user/${user.user_id}`)}
              className="w-full">
              <Badge variant={"secondary"}>
                {secondConverter({ sec: user.study_time })}
              </Badge>
            </UserContainer>
          </div>
        ))
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </div>
  );
}

interface TopLeaderboardProps extends React.ComponentProps<"div"> {
  viewer: ViewerType;
  viewDate: Date;
}

export default function TopLeaderboard({
  viewer,
  viewDate,
  className,
}: TopLeaderboardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isOnlyFriends, _setIsOnlyFriends] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const viewDateTime = DateTime.fromJSDate(viewDate).startOf(viewer);
    const now = DateTime.now().startOf(viewer);
    let label = "";
    if (now.toSeconds() === viewDateTime.toSeconds()) {
      label =
        viewer === "day"
          ? "Today"
          : viewer === "week"
            ? "This week"
            : "This month";
    } else {
      label = getDatesDisplay({ date: viewDate, viewer });
    }
    setTitle(`${label}`);
  }, [viewer, viewDate]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          Top Leaderboard
          {pathname !== "/dashboard/leaderboard" && (
            <Button
              effect={"expandIcon"}
              iconPlacement="right"
              icon={ArrowRight}
              className="ml-auto"
              onClick={() => {
                router.push("/dashboard/leaderboard");
              }}>
              View All
            </Button>
          )}
        </CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto">
        <RankingContainer
          viewDate={viewDate}
          viewer={viewer}
          isOnlyFriends={isOnlyFriends}
        />
        {/* <RankingContainer
          title={"This Week's Top 3"}
          viewDate={viewDate}
          viewer={"week"}
          isOnlyFriends={isOnlyFriends}
        />
        <RankingContainer
          title={"This Month's Top 3"}
          viewDate={viewDate}
          viewer={"month"}
          isOnlyFriends={isOnlyFriends}
        /> */}
      </CardContent>
    </Card>
  );
}
