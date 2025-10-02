import { GroupMember } from "@/types/groupTypes";
import { Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { Badge } from "../ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import UserContainer from "../users/UserContainer";

type MembersStatusViewerProps = {
  members: GroupMember[] | undefined;
};
export default function MembersStatusViewer({
  members,
}: MembersStatusViewerProps) {
  const router = useRouter();

  const membersStatus = useMemo(() => {
    const status = {
      offline: [] as GroupMember[],
      resting: [] as GroupMember[],
      studying: [] as GroupMember[],
    };

    if (!members) return status;

    members.forEach((member) => {
      if (!member.status) {
        status.offline.push(member);
      } else if (member.status.subject_id === "0") {
        status.resting.push(member);
      } else {
        status.studying.push(member);
      }
    });

    return status;
  }, [members]);
  return (
    <div className="absolute right-0 top-0 flex gap-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Badge className="cursor-pointer">
            <Circle className="fill-green-500 text-green-500" />
            <p>
              {membersStatus.studying.length}
              {" Members studying"}
            </p>
          </Badge>
        </HoverCardTrigger>
        <HoverCardContent>
          {membersStatus.studying.map((member) => (
            <UserContainer
              userinfo={{ ...member, created_at: 0, timezone: "" }}
              key={member.user_id}
              onClick={() => {
                router.push(`/dashboard/user/${member.user_id}`);
              }}
            />
          ))}
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Badge className="cursor-pointer">
            <Circle className="fill-red-500 text-red-500" />
            <p>
              {membersStatus.resting.length}
              {" Members resting"}
            </p>
          </Badge>
        </HoverCardTrigger>
        <HoverCardContent>
          {membersStatus.resting.map((member) => (
            <UserContainer
              userinfo={{ ...member, created_at: 0, timezone: "" }}
              key={member.user_id}
              onClick={() => {
                router.push(`/dashboard/user/${member.user_id}`);
              }}
            />
          ))}
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Badge className="cursor-pointer">
            <Circle className="fill-gray-500 text-gray-500" />
            <p>
              {membersStatus.offline.length}
              {" Members offline"}
            </p>
          </Badge>
        </HoverCardTrigger>
        <HoverCardContent className="max-h-80 overflow-auto">
          {membersStatus.offline.map((member) => (
            <UserContainer
              userinfo={{ ...member, created_at: 0, timezone: "" }}
              key={member.user_id}
              onClick={() => {
                router.push(`/dashboard/user/${member.user_id}`);
              }}
            />
          ))}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
