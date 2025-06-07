import { Circle } from "lucide-react";
import { Badge } from "../ui/badge";
import { useMemo } from "react";
import { GroupMember } from "@/types/groupTypes";
type MembersStatusViewerProps = {
  members: GroupMember[] | undefined;
};
export default function MembersStatusViewer({
  members,
}: MembersStatusViewerProps) {
  const membersStatus = useMemo(() => {
    const status = {
      offline: [] as string[],
      resting: [] as string[],
      studying: [] as string[],
    };

    if (!members) return status;

    members.forEach((member) => {
      if (!member.status) {
        status.offline.push(member.user_id);
      } else if (member.status.subject_id === "0") {
        status.resting.push(member.user_id);
      } else {
        status.studying.push(member.user_id);
      }
    });

    return status;
  }, [members]);
  return (
    <div className="absolute right-0 top-0 flex gap-2">
      <Badge>
        <Circle className="fill-green-500 text-green-500" />
        <p>
          {membersStatus.studying.length}
          {" Members studying"}
        </p>
      </Badge>
      <Badge>
        <Circle className="fill-red-500 text-red-500" />
        <p>
          {membersStatus.resting.length}
          {" Members resting"}
        </p>
      </Badge>
      <Badge>
        <Circle className="fill-gray-500 text-gray-500" />
        <p>
          {membersStatus.offline.length}
          {" Members offline"}
        </p>
      </Badge>
    </div>
  );
}
