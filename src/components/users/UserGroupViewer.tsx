import { Userinfo } from "@/types/accountTypes";
import { ActiveGroup } from "@/types/groupTypes";
import GroupContainer from "../groups/GroupContainer";
import { Ranking } from "@/types/rankingTypes";
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
          <Button variant="link" effect={"hoverUnderline"} className="truncate w-full">
            Inside {group.name}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent side="bottom" align={"center"} className="w-[21rem]">
        {group && (
          <GroupContainer
            group={group}
            rankings={rankings}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
