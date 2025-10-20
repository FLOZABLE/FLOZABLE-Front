
import { SelectedSubject } from "@/types/subjectTypes";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PomodoroTimerProps {
  selectedSubject: SelectedSubject & { active: boolean };
  setSelectedSubject: React.Dispatch<React.SetStateAction<SelectedSubject>>;
}

const POMODORO_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

export default function PomodoroTimer({
  selectedSubject,
  setSelectedSubject,
}: PomodoroTimerProps) {
  const [time, setTime] = useState(POMODORO_TIME);
  const [mode, setMode] = useState<"pomodoro" | "shortBreak" | "longBreak">(
    "pomodoro"
  );

  useEffect(() => {
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
  }, [selectedSubject.active, time, mode, setSelectedSubject]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

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
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial={{ rotate: -90 }}
          animate={{ rotate: -90 + (time / totalTime) * 360 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-300"
              strokeWidth="5"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            <motion.circle
              className="text-blue-500"
              strokeWidth="5"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={
                2 * Math.PI * 45 - (time / totalTime) * 2 * Math.PI * 45
              }
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
          </svg>
        </motion.div>
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <span className="text-5xl font-bold">{formatTime(time)}</span>
        </div>
      </div>
      <div className="flex mt-4 space-x-2">
        <Button
          onClick={() => {
            setMode("pomodoro");
            setTime(POMODORO_TIME);
            setSelectedSubject((prev) => ({ ...prev, active: false }));
          }}
          variant={mode === "pomodoro" ? "default" : "secondary"}
        >
          Pomodoro
        </Button>
        <Button
          onClick={() => {
            setMode("shortBreak");
            setTime(SHORT_BREAK_TIME);
            setSelectedSubject((prev) => ({ ...prev, active: false }));
          }}
          variant={mode === "shortBreak" ? "default" : "secondary"}
        >
          Short Break
        </Button>
        <Button
          onClick={() => {
            setMode("longBreak");
            setTime(LONG_BREAK_TIME);
            setSelectedSubject((prev) => ({ ...prev, active: false }));
          }}
          variant={mode === "longBreak" ? "default" : "secondary"}
        >
          Long Break
        </Button>
      </div>
    </div>
  );
}
