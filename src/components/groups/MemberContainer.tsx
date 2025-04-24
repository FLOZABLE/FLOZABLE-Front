import { GroupMember } from "@/types/group";

interface MemberContainerProps {
  member: GroupMember;
}

export default function MemberContainer({ member }: MemberContainerProps) {
  return <div className="bg-muted">{member.name}</div>;
}
