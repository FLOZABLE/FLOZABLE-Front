import { useFriendsStatus } from "@/hooks/friendHooks";
import { useRankings } from "@/hooks/rankingHooks";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const { friendsStatus } = useFriendsStatus();
  const { rankingsData } = useRankings(
    "day",
    new Date(new Date().setHours(0, 0, 0, 0)),
  );

  const { setSearchUsersModal } = useSearchUsersModal();

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
        {friendsStatus?.map((friend, i) => {
          return (
            <div key={i}>
              <UserContainer
                userinfo={friend}
                onClick={() => {
                  router.push(`/dashboard/user/${friend.user_id}`);
                }}>
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
