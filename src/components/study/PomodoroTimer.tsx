import { Button } from "@/components/ui/button";
import socket from "@/lib/sockets/socket";
import { SelectedSubject } from "@/types/subjectTypes";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";

import AnimatedTimerDisplay from "./AnimatedTimerDisplay";

interface PomodoroTimerProps {
  selectedSubject: SelectedSubject & { active: boolean };
  setSelectedSubject: React.Dispatch<React.SetStateAction<SelectedSubject>>;
}

const POMODORO_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

const radius = 45;
const circumference = 2 * Math.PI * radius;

export default function PomodoroTimer({
  selectedSubject,
  setSelectedSubject,
}: PomodoroTimerProps) {
  const [time, setTime] = useState(POMODORO_TIME);
  const [mode, setMode] = useState<"pomodoro" | "shortBreak" | "longBreak">(
    "pomodoro",
  );

  /* useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (selectedSubject.active && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      if (mode === "pomodoro") {
        setMode("shortBreak");
        setTime(SHORT_BREAK_TIME);
      } else {
        setMode("pomodoro");
        setTime(POMODORO_TIME);
      }
      setSelectedSubject((prev) => ({ ...prev, active: false }));
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selectedSubject.active, time, mode, setSelectedSubject]); */

  useEffect(() => {
    const totalTime =
      mode === "pomodoro"
        ? POMODORO_TIME
        : mode === "shortBreak"
          ? SHORT_BREAK_TIME
          : LONG_BREAK_TIME;
    const now = Math.round(Date.now() / 1000);

    const time = totalTime - (now - selectedSubject.start);
    setTime(time);
    console.log("gd sss");
  }, [selectedSubject.value]);

  useEffect(() => {
    if (selectedSubject.active) {
      setMode("pomodoro");
    }
  }, [selectedSubject.active]);

  /* useEffect(() => {
    if (!selectedSubject.active) {
      setMode("pomodoro");
      return;
    }
  }, [selectedSubject.active]); */

  useEffect(() => {
    const totalTime =
      mode === "pomodoro"
        ? POMODORO_TIME
        : mode === "shortBreak"
          ? SHORT_BREAK_TIME
          : LONG_BREAK_TIME;
    setTime(totalTime);
  }, [mode]);

  const endBreak = useCallback(() => {
    setSelectedSubject((prev) => ({ ...prev, active: false }));
    const intervalId = setInterval(() => {
      setTime((time) => {
        console.log("gd", time);
        if (time === 0) {
          setMode("pomodoro");
          clearInterval(intervalId);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
    socket.emit("study:stop");

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const totalTime =
    mode === "pomodoro"
      ? POMODORO_TIME
      : mode === "shortBreak"
        ? SHORT_BREAK_TIME
        : LONG_BREAK_TIME;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{selectedSubject.name}</h2>
      </div>
      <div className="relative w-64 h-64">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          style={{ transform: "rotate(-90deg)" }}>
          <circle
            className="text-gray-300"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          <motion.circle
            className="text-blue-500"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference - (time / totalTime) * circumference
            }
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset:
                circumference - (time / totalTime) * circumference,
            }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <AnimatedTimerDisplay
            value={time}
            className="text-5xl font-bold"
            isHour={false}
          />
        </div>
      </div>
      <div className="flex mt-4 space-x-2">
        <Button
          onClick={() => {
            setMode("pomodoro");
            setSelectedSubject((prev) => ({ ...prev, active: false }));
          }}
          variant={mode === "pomodoro" ? "default" : "secondary"}>
          Pomodoro
        </Button>
        <Button
          onClick={() => {
            setMode("shortBreak");
            endBreak();
          }}
          variant={mode === "shortBreak" ? "default" : "secondary"}>
          Short Break
        </Button>
        <Button
          onClick={() => {
            setMode("longBreak");
            endBreak();
          }}
          variant={mode === "longBreak" ? "default" : "secondary"}>
          Long Break
        </Button>
      </div>
    </div>
  );
}
