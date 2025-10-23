import { postGroupLike } from "@/apis/groupApi";
import { useAccount } from "@/hooks/accountHooks";
import { useFriendsStatusUpdater } from "@/hooks/updaters/friendUpdaters";
import { useGroupUpdater } from "@/hooks/updaters/groupUpdaters";
import { cn, secondConverter } from "@/lib/utils";
import { Group } from "@/types/groupTypes";
import { Ranking } from "@/types/rankingTypes";
import parser from "html-react-parser";
import { Goal, Heart, Hourglass, Lock, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps, useCallback, useMemo } from "react";

import CopyLinkButton from "../buttons/CopyLinkButton";
import LikeButton from "../buttons/LikeButton/LikeButton";
import { useJoinGroupModal } from "../structure/ModalProviders";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface GroupContainerProps extends ComponentProps<"div"> {
  group: Group;
  rankings: Ranking[] | undefined;
  isJoinButton?: boolean;
}

export default function GroupContainer({
  group,
  rankings,
  isJoinButton = true,
  className,
  ...props
}: GroupContainerProps) {
  const router = useRouter();

  const { account } = useAccount();
  const updateGroup = useGroupUpdater();

  const updateFriendsStatus = useFriendsStatusUpdater();

  const { setJoinGroupModal } = useJoinGroupModal();

  const totalTime = useMemo(() => {
    if (!rankings || !group.members.length) return "0 h";
    const groupMembers = rankings.filter((user) =>
      group.members.includes(user.user_id),
    );
    const totalTime = groupMembers.reduce(
      (partialTime, a) => partialTime + a.study_time,
      0,
    );
    const membersAvg = Math.floor(totalTime / group.members.length);
    const formattedValue = secondConverter({ sec: membersAvg });
    return formattedValue;
  }, [group.members, rankings]);

  const onLike = useCallback(async () => {
    if (!account?.user_id) return;

    const like = !group.likes.includes(account?.user_id);
    const response = await postGroupLike(group.group_id, like);
    if (!response.success) return;

    await updateGroup(group.group_id, (prev) => {
      if (like) {
        prev.likes.push(account.user_id);
      } else {
        prev.likes = prev.likes.filter((like) => like !== account.user_id);
      }

      return {
        ...prev,
      };
    });

    await updateFriendsStatus((prev) => {
      return prev.map((friend) => {
        if (friend.active_group?.group_id === group.group_id) {
          if (like) {
            friend.active_group.likes.push(account.user_id);
          } else {
            friend.active_group.likes = friend.active_group.likes.filter(
              (like) => like !== account.user_id,
            );
          }
        }
        return friend;
      });
    });
  }, [group, account]);

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-5 flex flex-col gap-2 bg-background",
        className,
      )}
      {...props}>
      <h3 className="font-semibold truncate">{group.name}</h3>
      <div className="mb-5">{parser(group.description)}</div>
      <div className="flex gap-1 mt-auto">
        <Badge variant={"outline"}>
          <UserRound />
          {group.members.length}
        </Badge>
        <Badge variant={"outline"}>
          <Goal />
          {group.goal_hr}
        </Badge>
        <Badge variant={"outline"}>
          <Hourglass />
          {totalTime}
        </Badge>
        <Badge variant={"outline"}>
          <Heart />
          {group.likes.length}
        </Badge>
      </div>
      {group.tags.length ? (
        <div className="flex gap-1 overflow-auto pb-3">
          {group.tags.map((tag, i) => (
            <Badge key={i} variant={"secondary"}>
              #{tag}
            </Badge>
          ))}
        </div>
      ) : null}
      <div className="flex justify-between relative">
        {/* <CopyButton value="ddddd" /> */}
        <CopyLinkButton link={`/dashboard/groups?group=${group.group_id}`} />

        {isJoinButton &&
          (group.members.includes(account?.user_id || "") ? (
            <Button
              className="absolute-center"
              onClick={() => {
                router.push(`/dashboard/study?study_group=${group.group_id}`);
              }}>
              Join the session
            </Button>
          ) : (
            <Button
              className="absolute-center"
              onClick={() => {
                setJoinGroupModal((prev) => ({
                  ...prev,
                  opened: true,
                  group: group,
                }));
              }}>
              {!group.visibility && <Lock />}
              Join
            </Button>
          ))}
        <LikeButton
          liked={group.likes.includes(account?.user_id || "")}
          onClick={onLike}
        />
      </div>
    </div>
  );
}
