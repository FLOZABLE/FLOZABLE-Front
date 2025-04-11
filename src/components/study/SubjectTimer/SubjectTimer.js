import React, { useContext, useState, useEffect, useCallback } from "react";
import styles from "./SubjectTimer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useNextStep } from "nextstepjs";
import { WorkersContext } from "@/components/structure/Providers";
import { useAddSubjectsModal } from "@/components/structure/ModalProviders";
import { useSubjects } from "@/hooks/subjectsHooks";
import { useAccount } from "@/hooks/accountHooks";
import socket from "@/utils/sockets/socket";
import SimpleToggleBtn from "@/components/buttons/SimpleToggleBtn/SimpleToggleBtn";
import PomodoroTimer from "../PomodoroTimer/PomodoroTimer";
import { toTimer } from "@/utils/tools";

export default function SubjectTimer({}) {
  const { currentStep, setCurrentStep } = useNextStep();

  const { subjectsTimerWorkerRef } = useContext(WorkersContext);
  const { setIsAddSubjectModal } = useAddSubjectsModal();

  const { account } = useAccount();
  const { subjects, updateSubjects, subjectsRefetch } = useSubjects();

  const [subjectOptions, setSubjectOptions] = useState([]);
  const [isSelectNewSubject, setIsSelectNewSubject] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState({
    subject_id: null,
    name: "",
    value: 0,
    active: false,
    disp: "",
  });
  const [pomodoro, setPomodoro] = useState({
    active: false,
    mode: 0,
    running: false,
  });

  useEffect(() => {
    if (currentStep === 8) {
      setIsSelectNewSubject(true);
      setTimeout(() => {
        setCurrentStep(9);
      }, 2000);
    }
  }, [currentStep]);

  useEffect(() => {
    return () => {
      console.log("unhook");
      socket.emit("study:stop");
      subjectsTimerWorkerRef?.current?.postMessage({
        command: "stopSubjectTimer",
      });
      setTimeout(() => {
        subjectsRefetch();
      }, 500);
    };
  }, []);

  useEffect(() => {
    if (!subjects?.length) return;
    const subjectOptions = subjects.map((subject) => {
      const value = subject.day.total[subject.day.total.length - 1].data;
      const disp = toTimer(value);
      return {
        name: subject.name,
        subject_id: subject.subject_id,
        disp,
        value,
      };
    });
    console.log(subjectOptions, "subject opt");
    subjectOptions.sort((a, b) => b.value - a.value);
    if (!selectedSubject.subject_id) {
      //const newSelectedSubject = subjectOptions.splice(0, 1)[0];
      setSelectedSubject({ ...subjectOptions[0], active: false });
    }
    setSubjectOptions(subjectOptions);
  }, [subjects]);

  const toggleTimer = useCallback(() => {
    console.log("toggle timer", selectedSubject);
    if (selectedSubject.active) {
      socket.emit("study:stop");
    } else {
      socket.emit("study:start", selectedSubject.subject_id);
    }
  }, [selectedSubject]);

  useEffect(() => {
    const onStudying = ({ userId, subject }) => {
      console.log(userId, subject);
      if (
        userId !== account?.user_id ||
        !subject ||
        subject.subject_id === "0"
      )
        return;
      if (subject.subject_id !== selectedSubject.subject_id) return;

      setSelectedSubject((prev) => ({ ...prev, active: true }));
      console.log("start", subjectsTimerWorkerRef);
      subjectsTimerWorkerRef?.current?.postMessage({
        command: "startSubjectTimer",
      });
    };
    const onStopStudying = ({ userId, duration, stopped_subject }) => {
      console.log("stop");
      if (userId !== account?.user_id) return;
      if (!stopped_subject || stopped_subject.subject_id === "0") {
        subjectsTimerWorkerRef?.current?.postMessage({
          command: "stopSubjectTimer",
        });
        return setSelectedSubject((prev) => ({ ...prev, active: false }));
      }

      if (stopped_subject.subject_id !== selectedSubject.subject_id) {
        subjectsTimerWorkerRef?.current?.postMessage({
          command: "stopSubjectTimer",
        });
        return setSelectedSubject((prev) => ({ ...prev, active: false }));
      }

      //setSelectedSubject((prev) => ({ ...prev, active: false }));
      updateSubjects((prev) => {
        const subjectIndex = prev.findIndex(
          (subject) => subject.subject_id === stopped_subject.subject_id
        );

        if (subjectIndex === -1) {
          return prev;
        }

        const newSubjects = [...prev];
        const currentSubject = newSubjects[subjectIndex];

        // Create a new day object with updated total
        const updatedDay = {
          ...currentSubject.day,
          total: currentSubject.day.total.map((totalItem, index) =>
            index === currentSubject.day.total.length - 1
              ? { ...totalItem, data: totalItem.data + duration }
              : totalItem
          ),
        };

        // Store the updated value before returning
        const updatedValue = updatedDay.total[updatedDay.total.length - 1].data;

        console.log("updated", updatedValue);

        // Update the subject with the new day object
        newSubjects[subjectIndex] = {
          ...currentSubject,
          day: updatedDay,
        };

        const disp = toTimer(updatedValue);
        // Use a callback to update selectedSubject with the computed value
        setSelectedSubject((prev) => ({
          ...prev,
          active: false,
          value: updatedValue,
          disp,
        }));

        return newSubjects;
      });

      subjectsTimerWorkerRef?.current?.postMessage({
        command: "stopSubjectTimer",
      });
    };

    socket.on("study:start", onStudying);
    socket.on("study:stop", onStopStudying);
    socket.on("disconnected", onStopStudying);

    return () => {
      socket.off("study:start", onStudying);
      socket.off("study:stop", onStopStudying);
    };
  }, [account, selectedSubject, updateSubjects]);

  useEffect(() => {
    const onMessage = (e) => {
      if (e.data.command !== "updateSubjectTimer") return;

      setSelectedSubject((prev) => {
        const value = prev.value + 1;
        const disp = toTimer(value);

        let slicedName = prev.name.slice(0, 7);

        if (slicedName.length !== prev.name.length) {
          slicedName += "...";
        }

        document.title = `${disp} ${slicedName}`;

        return { ...prev, value, disp };
      });
    };
    subjectsTimerWorkerRef?.current?.addEventListener("message", onMessage);
    return () => {
      subjectsTimerWorkerRef?.current?.removeEventListener(
        "message",
        onMessage
      );
    };
  }, [selectedSubject, subjectsTimerWorkerRef]);

  return (
    <div className={styles.SubjectTimer}>
      <div className={styles.header}>
        <div
          className={`${styles.pomodoroToggle} ${
            pomodoro.active ? styles.active : null
          }`}
          data-tutorial={11}
        >
          <SimpleToggleBtn
            checked={pomodoro.active}
            onToggle={() => {
              if (pomodoro.active) {
                setPomodoro({ active: false, mode: 0 });
                if (currentStep === 11) {
                  setTimeout(() => {
                    setCurrentStep(12);
                  }, 2000);
                }
              } else {
                setPomodoro({ active: true, mode: 0 });
              }
            }}
            tutorial={8}
            id="subjectimer"
          />
          <p>Pomodoro</p>
        </div>
        <div
          className={styles.button}
          id={styles.addSubject}
          onClick={() => setIsAddSubjectModal((prev) => !prev)}
        >
          +<p className={`hoverText ${styles.hoverText}`}>Add Subject</p>
        </div>
      </div>
      <div className={styles.mainDisplay}>
        <div
          className={`${styles.subject} ${
            isSelectNewSubject ? styles.active : null
          }`}
          onClick={() => setIsSelectNewSubject((prev) => !prev)}
        >
          <p className={styles.name}>{selectedSubject.name}</p>
          <p className={styles.time}>{selectedSubject.disp}</p>
          <i
            id={styles.caret}
            className={`${isSelectNewSubject ? styles.active : null}`}
          >
            <FontAwesomeIcon icon={faCaretDown} />
          </i>
        </div>
        <div className={styles.buttons}>
          <div
            className={styles.button}
            id={styles.start}
            data-tutorial={10}
            onClick={() => {
              if (currentStep === 10 && selectedSubject.active) {
                setCurrentStep(11);
              }

              //if pomodoro is active  & mode is short/long break, intead of toggling the timer, take a break
              if (
                pomodoro.active &&
                (pomodoro.mode === 1 || pomodoro.mode === 2)
              ) {
                setPomodoro((prev) => ({ ...prev, running: !prev.running }));
                return;
              }
              toggleTimer();
            }}
          >
            {selectedSubject.active || pomodoro.running ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </div>
        </div>
      </div>
      <div
        className={`customScroll ${isSelectNewSubject ? styles.active : null} ${
          styles.subjects
        }`}
        data-tutorial={9}
      >
        {subjectOptions.map((subject, i) => {
          const liveDisp =
            subject.subject_id === selectedSubject.subject_id
              ? selectedSubject.disp
              : subject.disp;
          return (
            <div
              className={styles.subject}
              key={i}
              onClick={() => {
                if (currentStep === 9) {
                  setCurrentStep(10);
                }
                setIsSelectNewSubject(false);

                if (selectedSubject.active) {
                  toggleTimer();
                }
                setTimeout(() => {
                  setSelectedSubject({ ...subject, active: false });
                }, 500);
              }}
            >
              <p className={styles.name}>{subject.name}</p>
              <p className={styles.time}>{liveDisp}</p>
            </div>
          );
        })}
      </div>
      <div
        className={`${styles.pomodoroTimer} ${
          pomodoro.active ? styles.active : ""
        }`}
        data-tutorial={12}
      >
        <PomodoroTimer
          pomodoro={pomodoro}
          setPomodoro={setPomodoro}
          selectedSubject={selectedSubject}
          toggleTimer={toggleTimer}
        />
      </div>
    </div>
  );
}
