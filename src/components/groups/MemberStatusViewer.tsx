import { HoverCardContent } from "@/components/ui/hover-card";
import { GroupMember } from "@/types/groupTypes";

import UserSubjectViewer from "../users/UserSubjectViewer";

interface MemberStatusViewerProps {
  member: GroupMember;
}

export default function MemberStatusViewer({
  member,
}: MemberStatusViewerProps) {
  return (
    <HoverCardContent className="">
      <UserSubjectViewer
        userInfo={{ ...member, created_at: 0, timezone: "" }}
      />
    </HoverCardContent>
  );
}
