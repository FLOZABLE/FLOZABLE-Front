import { Group } from "@/types/group";
import { Ranking } from "@/types/ranking";
import { cn, secondConverter } from "@/utils/tools";
import parser from "html-react-parser";
import { Goal, Heart, Hourglass, Lock, UserRound } from "lucide-react";
import { ComponentProps, HTMLProps, useCallback, useMemo } from "react";
import { Badge } from "../ui/badge";
import { useAccount } from "@/hooks/accountHooks";
import { Button } from "../ui/button";
import CopyLinkButton from "../buttons/CopyLinkButton";
import { useJoinGroupModal } from "../structure/ModalProviders";
import { useRouter } from "next/navigation";
import { postGroupLike } from "@/apis/groupsApi";
import LikeButton from "../buttons/LikeButton/LikeButton";
import { useGroupsUpdater } from "@/hooks/updaters/groupsUpdaters";

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
  const updateGroups = useGroupsUpdater();

  const { setJoinGroupModal } = useJoinGroupModal();

  const totalTime = useMemo(() => {
    if (!rankings || !group.members.length) return "0 h";
    const groupMembers = rankings.filter((user) =>
      group.members.includes(user.user_id)
    );
    const totalTime = groupMembers.reduce(
      (partialTime, a) => partialTime + a.study_time,
      0
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

    updateGroups((prev) => {
      const newGroups = [...prev];
      const groupIndex = newGroups.findIndex(
        (_group) => _group.group_id === group.group_id
      );
      if (groupIndex === -1) return prev;

      if (like) {
        newGroups[groupIndex].likes.push(account.user_id);
      } else {
        newGroups[groupIndex].likes = newGroups[groupIndex].likes.filter(
          (like) => like !== account.user_id
        );
      }
      return newGroups;
    });
  }, [group, account]);

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-5 flex flex-col gap-2 bg-background",
        className
      )}
      {...props}
    >
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
              }}
            >
              Join the session
            </Button>
          ) : (
            <Button
              className="absolute-center"
              onClick={() => {
                setJoinGroupModal((prev) => ({
                  ...prev,
                  opened: true,
                  group_id: group.group_id,
                }));
              }}
            >
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
