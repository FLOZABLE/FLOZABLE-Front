import { useEffect, useState } from "react";
import { useWorkers } from "../structure/Providers";
import { toTimer } from "@/utils/tools";
import { Badge, BadgeProps } from "../ui/badge";

interface MemberTimerProps extends BadgeProps {
  initialSec?: number;
  start: number | null;
}

export default function MemberTimer({
  initialSec = 0,
  start,
  ...props
}: MemberTimerProps) {
  const { membersTimerWorker } = useWorkers();

  const [timer, setTimer] = useState({
    value: 0,
    disp: "",
  });

  useEffect(() => {
    const disp = toTimer(initialSec);
    setTimer({ value: initialSec, disp });

    const onMessage = (e: MessageEvent) => {
      if (!start || e.data.command !== "update-timer") return;

      const now = Math.round(Date.now() / 1000);
      const value = initialSec + now - start;
      const disp = toTimer(value);
      setTimer({ value, disp });
    };

    if (start) {
      membersTimerWorker?.addEventListener("message", onMessage);
    }

    return () => {
      membersTimerWorker?.removeEventListener("message", onMessage);
    };
  }, [start, initialSec]);

  return <Badge {...props}>{timer.disp}</Badge>;
}
