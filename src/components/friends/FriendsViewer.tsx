import { useFriendsStatus } from "@/hooks/friendHooks";
import { useRankings } from "@/hooks/rankingHooks";
import { nowSec } from "@/lib/utils";
import { Search } from "lucide-react";
import { useMemo } from "react";

import ChatButton from "../buttons/ChatButton";
import { useSearchUsersModal } from "../structure/ModalProviders";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import UserContainer from "../users/UserContainer";
import UserGroupViewer from "../users/UserGroupViewer";
import UserSubjectViewer from "../users/UserSubjectViewer";

export default function FriendsViewer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { friendsStatus } = useFriendsStatus();
  const { rankingsData } = useRankings(
    "day",
    new Date(new Date().setHours(0, 0, 0, 0)),
  );

  const { setSearchUsersModal } = useSearchUsersModal();

  //console.log("gd", friendsStatus)

  const sortedFriendsStatus = useMemo(() => {
    if (!friendsStatus) return [];
    const now = nowSec();

    return friendsStatus.sort(
      (a, b) =>
        (a.status?.start_time || now + 1) - (b.status?.start_time || now + 1),
    );
  }, [friendsStatus]);

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Friends</CardTitle>
        <CardDescription>See what your friends are doing</CardDescription>
        <Button
          onClick={() => {
            setSearchUsersModal((prev) => ({ ...prev, opened: !prev.opened }));
          }}>
          <Search />
        </Button>
      </CardHeader>
      <CardContent className="overflow-auto">
        {sortedFriendsStatus?.map((friend, i) => {
          return (
            <div key={i}>
              <UserContainer userinfo={friend}>
                <ChatButton className="ml-10" userInfo={friend} />
              </UserContainer>
              <UserSubjectViewer userInfo={friend} />
              <UserGroupViewer
                userInfo={friend}
                group={friend.active_group}
                rankings={rankingsData}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
