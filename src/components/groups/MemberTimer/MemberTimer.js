import React, { useContext, useEffect, useState } from "react";
import styles from "./MemberTimer.module.css";
import { toTimer } from "@/utils/tools";
import { WorkersContext } from "@/components/structure/Providers";

export default function MemberTimer({ initialSec = 0, start }) {
  const { membersTimerWorkerRef } = useContext(WorkersContext);

  const [timer, setTimer] = useState({
    value: 0,
    disp: "",
  });

  useEffect(() => {
    const disp = toTimer(initialSec);
    setTimer({ value: initialSec, disp });

    const onMessage = (e) => {
      if (!start || e.data.command !== "update-timer") return;

      const now = Math.round(Date.now() / 1000);
      const value = initialSec + now - start;
      const disp = toTimer(value);
      setTimer({ value, disp });
    };

    if (!membersTimerWorkerRef?.current) {
      membersTimerWorkerRef.current.removeEventListener("message", onMessage);
      return;
    }

    if (start) {
      membersTimerWorkerRef.current.addEventListener("message", onMessage);
    }

    return () => {
      membersTimerWorkerRef.current.removeEventListener("message", onMessage);
    };
  }, [start, initialSec]);

  return (
    <div className={styles.MemberTimer}>
      <p className={styles.hour}>{timer.disp}</p>
    </div>
  );
}
