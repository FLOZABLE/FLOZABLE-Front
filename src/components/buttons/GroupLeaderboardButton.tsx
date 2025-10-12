import { useGroupLeaderboardModal } from "../structure/ModalProviders";
import { Button, ButtonProps } from "../ui/button";

interface GroupLeaderboardButtonProps extends ButtonProps {
  groupId: string;
}

export default function GroupLeaderboardButton({
  groupId,
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
          opened: true,
        }));
      }}>
      sdfsd
    </Button>
  );
}
