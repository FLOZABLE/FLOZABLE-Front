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
import { useEffect } from "react";
import { OnStopStudying, OnStudying } from "@/types/socket";
import socket from "@/utils/sockets/socket";
import { useCallOptions } from "../structure/Providers";

interface MyGroupContainerProps {
  group: Group;
  isActive: boolean;
  isAdmin: boolean;
}

export default function MyGroupContainer({
  group,
  isActive,
}: MyGroupContainerProps) {
  const { isCam } = useCallOptions();
  const { groupMembersData, groupMembersIsLoading, updateGroupMembers } =
    useGroupMembers(group.group_id, isActive);

  console.log(groupMembersData);

  useEffect(() => {
    const onStudying = ({ userId, subject }: OnStudying) => {
      updateGroupMembers((prev) => {
        const memberIndex = prev.findIndex(
          (member) => member.user_id === userId
        );
        if (memberIndex === -1) return prev;

        const newGroupMembers = [...prev];
        newGroupMembers[memberIndex] = {
          ...newGroupMembers[memberIndex],
          active_subject: subject,
        };

        return newGroupMembers;
      }, group.group_id);
    };

    const onStopStudying = ({ userId, subject, duration }: OnStopStudying) => {
      updateGroupMembers((prev) => {
        const memberIndex = prev.findIndex(
          (member) => member.user_id === userId
        );
        if (memberIndex === -1) return prev;

        const newGroupMembers = [...prev];
        const study_time = newGroupMembers[memberIndex].study_time + duration;
        newGroupMembers[memberIndex] = {
          ...newGroupMembers[memberIndex],
          active_subject: subject,
          study_time,
        };

        return newGroupMembers;
      }, group.group_id);
    };

    if (!isActive) {
      socket.off("study:start", onStudying);
      socket.off("study:stop", onStopStudying);
      return;
    }

    socket.on("study:start", onStudying);
    socket.on("study:stop", onStopStudying);
    return () => {
      socket.off("study:start", onStudying);
      socket.off("study:stop", onStopStudying);
    };
  }, [isActive]);

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
          {isActive && !groupMembersIsLoading
            ? groupMembersData?.map((member, i) => {
                return <MemberContainer member={member} key={i} />;
              })
            : group.members.map((_, i) => (
                <Skeleton className="h-32 !rounded-xl" key={i} />
              ))}
        </div>
      </CardContent>
    </Card>
  );
}
