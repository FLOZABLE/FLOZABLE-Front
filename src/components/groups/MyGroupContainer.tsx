import { Group } from "@/types/group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { BookOpen, UserRound } from "lucide-react";
import { useGroupMembers } from "@/hooks/groupsHook";
import MemberContainer from "./MemberContainer";
import Skeleton from "react-loading-skeleton";

interface MyGroupContainerProps {
  group: Group;
  isActive: boolean;
  isAdmin: boolean;
}

export default function MyGroupContainer({
  group,
  isActive,
  isAdmin,
}: MyGroupContainerProps) {
  const { groupMembersData, groupMembersIsLoading } = useGroupMembers(
    group.group_id,
    isActive
  );

  console.log(groupMembersData);

  return (
    <Card className="p-9">
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
        <CardDescription>
          <Badge variant={"outline"}>
            {groupMembersIsLoading
              ? group.members.length
              : groupMembersData?.length}
            <UserRound />
          </Badge>
          <Badge variant={"outline"}>
            {groupMembersIsLoading
              ? group.members.length
              : groupMembersData?.length}
            <BookOpen />
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[repeat(auto-fill,_15rem)] gap-4">
          {
            /* isActive && !groupMembersIsLoading */ false
              ? groupMembersData?.map((member, i) => {
                  return <MemberContainer member={member} key={i} />;
                })
              : group.members.map((_, i) => (
                  <Skeleton className="h-32 !rounded-xl" key={i} />
                ))
          }
        </div>
      </CardContent>
    </Card>
  );
}
