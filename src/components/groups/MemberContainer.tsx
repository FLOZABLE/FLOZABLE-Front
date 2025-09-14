import { GroupMember } from "@/types/groupTypes";
import { Device } from "mediasoup-client";
import { Transport } from "mediasoup-client/types";
import { useEffect, useRef, useState } from "react";

import { IconRestPerson, IconStudyPerson } from "../others/Svgs";
import AvatarWrapper from "../ui/avatar";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import MemberCamDisplay from "./MemberCamDisplay";
import MemberContextMenu from "./MemberContextMenu";
import MemberStatusViewer from "./MemberStatusViewer";
import MemberTimer from "./MemberTimer";
import MyContextMenu from "./MyContextMenu";

interface SubjectTimer {
  start: number | null;
  name: string;
  total: number;
}

interface MemberContainerProps {
  member: GroupMember;
  device: Device | null;
  recvTransport: Transport | null;
  isMe: boolean;
}

export default function MemberContainer({
  member,
  device,
  recvTransport,
  isMe,
}: MemberContainerProps) {
  const [subjectTimer, setSubjectTimer] = useState<SubjectTimer>({
    start: null,
    name: "",
    total: 0,
  });
  const [media, setMedia] = useState({
    video: false,
    audio: false,
  });

  const contextMenuRef = useRef<HTMLDivElement>(null);

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
    <HoverCard>
      <MemberStatusViewer member={member} />
      <ContextMenu>
        {isMe ? <MyContextMenu /> : <MemberContextMenu memberInfo={member} />}
        <HoverCardTrigger asChild>
          <ContextMenuTrigger
            className="bg-muted/50 h-32 !rounded-xl relative p-3 overflow-hidden cursor-pointer"
            ref={contextMenuRef}
            onClick={(e) => {
              const { clientX, clientY } = e;

              const event = new MouseEvent("contextmenu", {
                bubbles: true,
                cancelable: true,
                button: 2,
                clientX,
                clientY,
              });

              // Dispatch the event on the DOM element
              contextMenuRef.current?.dispatchEvent(event);
            }}>
            <p className="truncate">{member.name}</p>
            <AvatarWrapper
              className="absolute bottom-[0.5rem] left-[0.5rem] z-10"
              name={member.name}
              userId={member.user_id}
            />
            <MemberCamDisplay
              member={member}
              device={device}
              recvTransport={recvTransport}
              media={media}
              setMedia={setMedia}
            />
            {media.video ? null : subjectTimer.start ? (
              <IconStudyPerson className="size-12 absolute-center" />
            ) : (
              <IconRestPerson className="size-12 absolute-center" />
            )}
            <MemberTimer
              initialSec={subjectTimer.total}
              start={subjectTimer.start}
              className="absolute-center translate-y-8"
            />
          </ContextMenuTrigger>
        </HoverCardTrigger>
      </ContextMenu>
    </HoverCard>
  );
}
