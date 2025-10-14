import { Trophy } from "lucide-react";

import { useGroupLeaderboardModal } from "../structure/ModalProviders";
import { Button, ButtonProps } from "../ui/button";

interface GroupLeaderboardButtonProps extends ButtonProps {
  groupId: string;
  groupName: string;
}

export default function GroupLeaderboardButton({
  groupId,
  groupName,
  className,
  ...props
}: GroupLeaderboardButtonProps) {
  const { setGroupLeaderboardModal } = useGroupLeaderboardModal();
  return (
    <Button
      className={className}
      {...props}
      onClick={() => {
        setGroupLeaderboardModal((prev) => ({
          ...prev,
          group_id: groupId,
          group_name: groupName,
          opened: true,
        }));
      }}>
      <Trophy />
    </Button>
  );
}
