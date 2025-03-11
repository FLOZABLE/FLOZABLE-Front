import React, { useContext, useEffect, useState } from "react";
import styles from "./MemberTimer.module.css";

export default function MemberTimer({ initialSec = 0, run }) {

  const [timer, setTimer] = useState({
    value: 0,
    disp: "",
  });

  /* useEffect(() => {
    const disp = toTimer(initialSec);
    setTimer({ value: initialSec, disp });

    if (!membersTimerWorkerRef?.current) return;

    const onMessage = (e) => {
      if (!run || e.data.command !== "update-timer") return;

      const now = DateTime.now().toSeconds();
      const value = initialSec + now - run;
      const disp = toTimer(value);
      setTimer({ value, disp });
    };

    if (run) {
      membersTimerWorkerRef.current.addEventListener("message", onMessage);
    }

    return () => {
      membersTimerWorkerRef.current.removeEventListener("message", onMessage);
    };
  }, [run, initialSec, membersTimerWorkerRef]); */

  return (
    <div className={styles.MemberTimer}>
      <p className={styles.hour}>{timer.disp}</p>
    </div>
  );
}
