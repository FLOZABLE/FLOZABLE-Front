import { GroupMember } from "@/types/group";
import AvatarWrapper from "../ui/avatar";
import { useEffect, useState } from "react";
import { IconRestPerson, IconStudyPerson } from "../others/Svgs";
import MemberCamDisplay from "./MemberCamDisplay";
import { Device } from "mediasoup-client";
import { Transport } from "mediasoup-client/lib/Transport";
import { useRouter } from "next/navigation";
import MemberTimer from "./MemberTimer";

interface SubjectTimer {
  start: number | null;
  name: string;
  total: number;
}

interface MemberContainerProps {
  member: GroupMember;
  device: Device | null;
  recvTransport: Transport | null;
}

export default function MemberContainer({
  member,
  device,
  recvTransport,
}: MemberContainerProps) {
  const router = useRouter();

  const [subjectTimer, setSubjectTimer] = useState<SubjectTimer>({
    start: null,
    name: "",
    total: 0,
  });

  useEffect(() => {
    const timer: SubjectTimer = {
      name: "Offline",
      start: null,
      total: member.study_time,
    };
    if (member.status && member.status?.subject_id !== "0") {
      timer.start = member.status?.start_time;
      timer.name = `Studying ${member.status.name}`;
    }
    setSubjectTimer(timer);
  }, [member]);

  return (
    <div
      className="bg-muted/50 h-32 !rounded-xl relative p-3"
      onClick={() => {
        router.push(`/dashboard/user/${member.user_id}`);
      }}
    >
      <p className="truncate">{member.name}</p>
      <AvatarWrapper
        className="absolute bottom-[-0.5rem] left-[-0.5rem]"
        name={member.name}
        userId={member.user_id}
      />
      <MemberCamDisplay
        member={member}
        device={device}
        recvTransport={recvTransport}
      />
      {subjectTimer.start ? (
        <IconStudyPerson className="size-12 absolute-center" />
      ) : (
        <IconRestPerson className="size-12 absolute-center" />
      )}
      <MemberTimer
        initialSec={subjectTimer.total}
        start={subjectTimer.start}
        className="absolute-center translate-y-8"
      />
    </div>
  );
}
