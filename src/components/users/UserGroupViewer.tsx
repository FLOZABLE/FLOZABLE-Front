import { Userinfo } from "@/types/account";
import { ActiveGroup } from "@/types/group";
import GroupContainer from "../groups/GroupContainer";
import { Ranking } from "@/types/ranking";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

type UserGroupViewerProps = {
  userInfo: Userinfo;
  group: ActiveGroup | undefined;
  rankings: Ranking[] | undefined;
};
export default function UserGroupViewer({
  group,
  rankings,
}: UserGroupViewerProps) {
  console.log(group);
  return (
    <Popover>
      <PopoverTrigger asChild>
        {group && (
          <Button variant="link" effect={"hoverUnderline"} className="truncate">
            Inside {group.name}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        {group && <GroupContainer group={group} rankings={rankings} />}
      </PopoverContent>
    </Popover>
  );
}
