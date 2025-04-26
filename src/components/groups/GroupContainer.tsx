import { Group } from "@/types/group";
import { Ranking } from "@/types/ranking";
import { secondConverter } from "@/utils/tools";
import parser from "html-react-parser";
import { Goal, Heart, Hourglass, Lock, UserRound } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "../ui/badge";
import { useAccount } from "@/hooks/accountHooks";
import { Button } from "../ui/button";
import CopyLinkButton from "../buttons/CopyLinkButton";
import { useJoinGroupModal } from "../structure/ModalProviders";
import { useRouter } from "next/navigation";

interface GroupContainerProps {
  group: Group;
  rankings: Ranking[];
}

export default function GroupContainer({
  group,
  rankings,
}: GroupContainerProps) {
  const router = useRouter();

  const { account } = useAccount();

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

  return (
    <div className="rounded-xl border-2 p-5 flex flex-col gap-2">
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
        <CopyLinkButton link="ddddd" />
        {group.members.includes(account?.user_id || "") ? (
          <Button
            className="absolute-center"
            onClick={() => {
              router.push(`/dashboard/study?group=${group.group_id}`);
            }}
          >
            Join the session
          </Button>
        ) : (
          <Button
            className="absolute-center"
            onClick={() => {
              setJoinGroupModal((prev) => ({ ...prev, opened: true, group: group.group_id }));
            }}
          >
            {!group.visibility && <Lock />}
            Join
          </Button>
        )}
        <Button></Button>
      </div>
    </div>
  );
}
