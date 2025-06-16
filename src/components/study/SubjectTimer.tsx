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
import { useSubjects } from "@/hooks/subjectsHooks";
import { useTutorial } from "@/hooks/tutorialHooks";
import { useSubjectsUpdater } from "@/hooks/updaters/subjectUpdaters";
import socket from "@/lib/sockets/socket";
import { cn, toTimer } from "@/lib/utils";
import { OnMyStopStudying, OnMyStudying } from "@/types/socketTypes";
import { Check, ChevronsUpDown, Library, Pause, Play } from "lucide-react";
import { ReactNode, useEffect, useMemo, useState } from "react";

import AnimatedSwitchButton from "../buttons/AnimatedSwitchButton";
import { useAddSubjectModal } from "../structure/ModalProviders";
import { useWorkers } from "../structure/Providers";
import { Button } from "../ui/button";
import AnimatedTimerDisplay from "./AnimatedTimerDisplay";

export type SubjectOption = {
  value: string; // subject.subject_id
  name: string; // subject.name
  label: ReactNode; // the rendered JSX for the option
  time: number;
};

type SubjectTimerProps = {
  isPopup?: boolean;
};

export default function SubjectTimer({ isPopup = false }: SubjectTimerProps) {
  const { subjectTimerWorker } = useWorkers();
  const { subjects, subjectsRefetch } = useSubjects();

  const { setAddSubjectModal } = useAddSubjectModal();
  const { currentStep, setCurrentStep, currentTour } = useTutorial();

  const updateSubjects = useSubjectsUpdater();

  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState({
    subject_id: "",
    name: "",
    value: 0,
    active: false,
    disp: "",
  });

  const options: SubjectOption[] = useMemo(() => {
    if (!subjects?.length) return [];
    return subjects
      .map((subject) => {
        const disp = toTimer(
          subject.day.total[subject.day.total.length - 1]?.data || 0,
        );
        return {
          value: subject.subject_id,
          name: subject.name,
          label: (
            <div className="flex w-full gap-2 overflow-hidden">
              <p className="truncate">{subject.name}</p>
              <p className="ml-auto">{disp}</p>
            </div>
          ),
          time: subject.day.total[subject.day.total.length - 1]?.data || 0,
        };
      })
      .sort((a, b) => b.time - a.time);
  }, [subjects]);

  useEffect(() => {
    if (isPopup) return;

    return () => {
      socket.emit("study:stop");
      setTimeout(() => {
        subjectTimerWorker?.postMessage({
          command: "stopSubjectTimer",
        });
        subjectsRefetch();
      }, 500);

      setTimeout(() => {
        subjectTimerWorker?.postMessage({
          command: "stopSubjectTimer",
        });
      }, 1500);
    };
  }, [isPopup]);

  useEffect(() => {
    if (!options?.length) return;

    setSelectedSubject((prev) => ({
      ...prev,
      name: options[0].name,
      value: options[0].time,
      subject_id: options[0].value,
    }));
  }, [options.length]);

  useEffect(() => {
    if (!subjects?.length) return;

    const onMyStudyStart = ({ subject }: OnMyStudying) => {
      const subjectData = subjects.find(
        (_subject) => _subject.subject_id === subject.subject_id,
      );
      console.log("start", subjectData, subject);
      if (!subjectData) return;

      setSelectedSubject((prev) => ({
        ...prev,
        subject_id: subject.subject_id,
        name: subjectData.name,
        value:
          subjectData.day.total[subjectData.day.total.length - 1]?.data || 0,
        active: true,
      }));
      subjectTimerWorker?.postMessage({
        command: "startSubjectTimer",
      });
    };

    const onMyStudyStop = ({
      stopped_subject_id,
      duration,
    }: OnMyStopStudying) => {
      setSelectedSubject((prev) => ({
        ...prev,
        active: false,
      }));

      subjectTimerWorker?.postMessage({
        command: "stopSubjectTimer",
      });

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

    const onDisconnection = () => {};

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
    subjectTimerWorker?.addEventListener("message", onMessage);

    return () => {
      subjectTimerWorker?.removeEventListener("message", onMessage);
    };
  }, [selectedSubject.subject_id]);

  useEffect(() => {
    if (currentStep === 2 || currentStep === 3) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [currentStep]);

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
                      selectedSubject.subject_id === option.value;
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(subject_id) => {
                          const subject = subjects?.find(
                            (subject) => subject.subject_id === subject_id,
                          );
                          if (subject) {
                            setCurrentStep(4);
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
                        {isSelected ? (
                          <div className="flex w-full overflow-hidden">
                            <p className="truncate">{selectedSubject.name}</p>
                            <AnimatedTimerDisplay
                              value={selectedSubject.value}
                              className="ml-auto"
                            />
                          </div>
                        ) : (
                          option.label
                        )}
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

            if (currentStep === 4) {
              setCurrentStep(5);
            } else if (currentStep === 5) {
              setCurrentStep(6);
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
            setCurrentStep(2);
          }, 500);
        }}
        id={"tour1-step2"}>
        Or add one
      </Button>
    </div>
  );
}
