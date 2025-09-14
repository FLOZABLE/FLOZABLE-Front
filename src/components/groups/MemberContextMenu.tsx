import { sendFriendRequest } from "@/apis/friendApi";
import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import { GroupMember } from "@/types/groupTypes";
import { useRouter } from "next/navigation";

interface MemberContextMenuProps {
  memberInfo: GroupMember;
}
export default function MemberContextMenu({
  memberInfo,
}: MemberContextMenuProps) {
  const router = useRouter();

  return (
    <ContextMenuContent>
      <ContextMenuItem
        onClick={() => {
          router.push(`/dashboard/user/${memberInfo.user_id}`);
        }}>
        Profile
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => {
          sendFriendRequest(memberInfo.user_id);
        }}>
        Add friend
      </ContextMenuItem>
    </ContextMenuContent>
  );
}
