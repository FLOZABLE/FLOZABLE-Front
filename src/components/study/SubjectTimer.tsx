import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAccount } from "@/hooks/accountHooks";
import { useSubjects } from "@/hooks/subjectHooks";
import { useTutorial } from "@/hooks/tutorialHooks";
import { useSubjectsUpdater } from "@/hooks/updaters/subjectUpdaters";
import emitter from "@/lib/emitter";
import socket from "@/lib/sockets/socket";
import { cn, nowSec, toTimer } from "@/lib/utils";
import { ActiveSubjectCookie } from "@/types/cookieTypes";
import { OnMyStopStudying, OnMyStudying } from "@/types/socketTypes";
import { SelectedSubject, Subject } from "@/types/subjectTypes";
import Cookies from "js-cookie";
import { Check, ChevronsUpDown, Library, Pause, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import AnimatedSwitchButton from "../buttons/AnimatedSwitchButton";
import { showAccountToast } from "../others/AccountToast";
import { useAddSubjectModal } from "../structure/ModalProviders";
import { useWorkers } from "../structure/Providers";
import { Button } from "../ui/button";
import AnimatedTimerDisplay from "./AnimatedTimerDisplay";
import PomodoroTimer from "./PomodoroTimer";

export type SubjectOption = {
  subject_id: string; // subject.subject_id
  name: string; // subject.name
  disp: string; // the rendered JSX for the option
  time: number;
};

type SubjectTimerProps = {
  isPopup?: boolean;
};

export default function SubjectTimer({ isPopup = false }: SubjectTimerProps) {
  const { membersTimerWorker } = useWorkers();
  const { subjects, subjectsRefetch } = useSubjects();
  const { account } = useAccount();

  const { setAddSubjectModal } = useAddSubjectModal();
  const { currentStep, setCurrentStep, currentTour } = useTutorial();

  const updateSubjects = useSubjectsUpdater();

  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<SelectedSubject>({
    subject_id: "",
    name: "",
    active: false,
    start: 0,
    value: 0,
    initialValue: 0,
  });

  const options: SubjectOption[] = useMemo(() => {
    if (!subjects?.length) return [];
    return subjects
      .map((subject) => {
        const disp = toTimer(
          subject.day.total[subject.day.total.length - 1]?.data || 0,
        );
        return {
          subject_id: subject.subject_id,
          name: subject.name,
          disp: disp,
          time: subject.day.total[subject.day.total.length - 1]?.data || 0,
        };
      })
      .sort((a, b) => b.time - a.time);
  }, [subjects]);

  useEffect(() => {
    if (isPopup) return;

    return () => {
      socket.emit("study:stop");
      subjectsRefetch();
    };
  }, [isPopup]);

  useEffect(() => {
    if (!options?.length) return;

    setSelectedSubject((prev) => ({
      ...prev,
      name: options[0].name,
      value: options[0].time,
      subject_id: options[0].subject_id,
    }));
  }, [options.length]);

  useEffect(() => {
    const onAddedSubject = (subject: Subject) => {
      if (!subject) return;

      setSelectedSubject((prev) => ({
        ...prev,
        subject_id: subject.subject_id,
        name: subject.name,
        value: subject.day.total[subject.day.total.length - 1]?.data || 0,
        active: false,
      }));
    };

    emitter.on("addedSubject", onAddedSubject);

    return () => {
      emitter.off("addedSubject", onAddedSubject);
    };
  }, []);

  useEffect(() => {
    if (!subjects?.length) return;

    const onMyStudyStart = async ({ subject }: OnMyStudying) => {
      const subjectData = subjects.find(
        (_subject) => _subject.subject_id === subject.subject_id,
      );
      if (!subjectData) return;

      const now = nowSec();

      setSelectedSubject((prev) => ({
        ...prev,
        subject_id: subject.subject_id,
        name: subjectData.name,
        initialValue:
          subjectData.day.total[subjectData.day.total.length - 1]?.data || 0,
        active: true,
        start: now,
      }));

      Cookies.set(
        "active_subject",
        JSON.stringify({ subject_id: subject.subject_id, start_time: now }),
      );
    };

    const onMyStudyStop = async ({
      stopped_subject_id,
      duration,
    }: OnMyStopStudying) => {
      Cookies.remove("active_subject");

      updateSubjects((prev) => {
        const subjectIndex = prev.findIndex(
          (subject) => subject.subject_id === stopped_subject_id,
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
              : totalItem,
          ),
        };

        // Update the subject with the new day object
        newSubjects[subjectIndex] = {
          ...currentSubject,
          day: updatedDay,
        };

        setSelectedSubject((prev) => {
          if (prev.subject_id !== stopped_subject_id) {
            return prev;
          }
          const updatedValue =
            updatedDay.total[updatedDay.total.length - 1].data;

          const disp = toTimer(updatedValue);
          return {
            ...prev,
            active: false,
            value: updatedValue,
            disp,
          };
        });

        return newSubjects;
      });
    };

    const onDisconnection = async () => {
      try {
        console.log("socket disconnection");

        const rawActiveSubject = Cookies.get("active_subject");
        if (!rawActiveSubject) return;

        const activeSubject: ActiveSubjectCookie = JSON.parse(rawActiveSubject);

        const duration = nowSec() - activeSubject.start_time;

        onMyStudyStop({
          stopped_subject_id: activeSubject.subject_id,
          duration: duration,
        });
      } catch (err) {
        console.log(err);
      }
    };

    socket.on("mystudy:start", onMyStudyStart);
    socket.on("mystudy:stop", onMyStudyStop);

    socket.on("disconnect", onDisconnection);

    return () => {
      socket.off("mystudy:start", onMyStudyStart);
      socket.off("mystudy:stop", onMyStudyStop);

      socket.off("disconnect", onDisconnection);
    };
  }, [subjects]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!selectedSubject.active || e.data.command !== "update-timer") return;

      setSelectedSubject((prev) => {
        const now = Math.round(Date.now() / 1000);
        const value = prev.initialValue + now - prev.start;
        const disp = toTimer(value);

        let slicedName = prev.name.slice(0, 7);

        if (slicedName.length !== prev.name.length) {
          slicedName += "...";
        }

        document.title = `${disp} ${slicedName}`;

        return { ...prev, value, disp };
      });
    };

    if (selectedSubject.active) {
      membersTimerWorker?.addEventListener("message", onMessage);
    }

    return () => {
      membersTimerWorker?.removeEventListener("message", onMessage);
    };
  }, [selectedSubject.subject_id, selectedSubject.active]);

  useEffect(() => {
    if (currentTour !== "newUser") return;

    if (currentStep === 3 || currentStep === 4) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [currentStep, currentTour]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Popover
          open={open}
          onOpenChange={(open) => {
            if (currentTour === "newUser") return;
            setOpen(open);
          }}
          modal={currentTour !== "newUser"}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between overflow-hidden"
              id="tour1-step7">
              <div className="flex w-full items-center">
                {selectedSubject.subject_id !== "" ? (
                  <>
                    <p className="truncate">{selectedSubject.name}</p>
                    <AnimatedTimerDisplay
                      value={selectedSubject.value}
                      className="ml-auto"
                    />
                  </>
                ) : (
                  "Select a subject"
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[200px] p-0 pointer-events-auto"
            id={"tour1-step4"}>
            <Command>
              <CommandList>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected =
                      selectedSubject.subject_id === option.subject_id;
                    return (
                      <CommandItem
                        key={option.subject_id}
                        value={option.subject_id}
                        onSelect={(subject_id) => {
                          const subject = subjects?.find(
                            (subject) => subject.subject_id === subject_id,
                          );
                          if (subject) {
                            setCurrentStep(5);
                            setSelectedSubject((prev) => ({
                              ...prev,
                              subject_id,
                              name: subject.name,
                              value:
                                subject.day.total[subject.day.total.length - 1]
                                  ?.data || 0,
                              active: false,
                            }));
                          }
                          if (selectedSubject.active) {
                            socket.emit("study:stop");
                          }
                          setOpen(false);
                        }}>
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <div className="flex w-full overflow-hidden">
                          <p className="truncate">{option.name}</p>
                          {isSelected ? (
                            <AnimatedTimerDisplay
                              value={selectedSubject.value}
                              className="ml-auto"
                            />
                          ) : (
                            <p className="ml-auto">{option.disp}</p>
                          )}
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <AnimatedSwitchButton
          id={"tour1-step5-6"}
          onIcon={<Pause />}
          offIcon={<Play />}
          onClick={() => {
            if (selectedSubject.active) {
              socket.emit("study:stop");
            } else {
              socket.emit("study:start", selectedSubject.subject_id);
            }

            if (currentStep === 5) {
              setCurrentStep(6);
            } else if (currentStep === 6) {
              setCurrentStep(7);
            }

            if (!account?.user_id) {
              showAccountToast();
            }
          }}
          clicked={selectedSubject.active}
        />
      </div>
      <Button
        effect={"expandIcon"}
        icon={Library}
        iconPlacement="right"
        variant={"secondary"}
        onClick={() => {
          if (selectedSubject.active) {
            socket.emit("study:stop");
          }
          setAddSubjectModal((prev) => ({ ...prev, opened: true }));
          setTimeout(() => {
            setCurrentStep(3);
          }, 500);
        }}
        id={"tour1-step2"}>
        Or add one
      </Button>
      <PomodoroTimer
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />
    </div>
  );
}
