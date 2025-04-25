import { GroupMember } from "@/types/group";
import AvatarWrapper from "../ui/avatar";
import { useEffect, useState } from "react";
import { IconRestPerson, IconStudyPerson } from "../others/Svgs";

interface MemberContainerProps {
  member: GroupMember;
}

interface SubjectTimer {
  start: number | null;
  name: string;
  total: number;
}

export default function MemberContainer({ member }: MemberContainerProps) {
  const [subjectTimer, setSubjectTimer] = useState<SubjectTimer>({
    start: null,
    name: "",
    total: 0,
  });

  console.log(member.active_subject);

  useEffect(() => {
    const timer: SubjectTimer = {
      name: "Offline",
      start: null,
      total: member.study_time,
    };
    if (member.active_subject && member.active_subject?.subject_id !== "0") {
      timer.start = member.active_subject?.time;
      timer.name = `Studying ${member.active_subject.name}`;
    }
    setSubjectTimer(timer);
  }, [member]);

  return (
    <div className="bg-muted h-32 !rounded-xl relative p-3">
      <p className="truncate">{member.name}</p>
      <AvatarWrapper
        className="absolute bottom-[-0.5rem] left-[-0.5rem]"
        name={member.name}
        id={member.user_id}
      />
      {subjectTimer.start ? (
        <IconStudyPerson className="size-12 absolute-center" />
      ) : (
        <IconRestPerson className="size-12 absolute-center" />
      )}
    </div>
  );
}
