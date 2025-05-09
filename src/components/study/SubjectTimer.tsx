import { useSubjects } from "@/hooks/subjectsHooks";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { cn, toTimer } from "@/utils/tools";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, Pause, Play } from "lucide-react";
import socket from "@/utils/sockets/socket";
import { OnMyStopStudying, OnMyStudying } from "@/types/socket";
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
import { useWorkers } from "../structure/Providers";
import AnimatedTimerDisplay from "./AnimatedTimerDisplay";
import { useSubjectsUpdater } from "@/hooks/updaters/subjectsUpdaters";
import AnimatedSwitchButton from "../buttons/AnimatedSwitchButton";
import StudyModal from "../modals/StudyModal";

export type SubjectOption = {
  value: string; // subject.subject_id
  name: string; // subject.name
  label: ReactNode; // the rendered JSX for the option
};

export default function SubjectTimer() {
  const { subjectTimerWorker } = useWorkers();
  const { subjects } = useSubjects();

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
    return subjects.map((subject) => {
      const disp = toTimer(
        subject.day.total[subject.day.total.length - 1]?.data || 0
      );
      return {
        value: subject.subject_id,
        name: subject.name,
        label: (
          <div className="flex w-full">
            <p>{subject.name}</p>
            <p className="ml-auto">{disp}</p>
          </div>
        ),
      };
    });
  }, [subjects]);

  useEffect(() => {
    if (!subjects?.length) return;

    setSelectedSubject((prev) => ({
      ...prev,
      name: subjects[0].name,
      value: subjects[0].day.total[subjects[0].day.total.length - 1]?.data || 0,
      subject_id: subjects[0].subject_id,
    }));

    const onMyStudyStart = ({ subject }: OnMyStudying) => {
      setSelectedSubject((prev) => ({
        ...prev,
        subject_id: subject.subject_id,
        active: true,
      }));
      subjectTimerWorker?.postMessage({
        command: "startSubjectTimer",
      });
    };

    const onMyStudyStop = ({ stoppedSubject, duration }: OnMyStopStudying) => {
      setSelectedSubject((prev) => ({
        ...prev,
        active: false,
      }));

      subjectTimerWorker?.postMessage({
        command: "stopSubjectTimer",
      });

      updateSubjects((prev) => {
        const subjectIndex = prev.findIndex(
          (subject) => subject.subject_id === stoppedSubject.subject_id
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

        // Update the subject with the new day object
        newSubjects[subjectIndex] = {
          ...currentSubject,
          day: updatedDay,
        };

        setSelectedSubject((prev) => {
          if (prev.subject_id !== stoppedSubject.subject_id) {
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

    socket.on("mystudy:start", onMyStudyStart);
    socket.on("mystudy:stop", onMyStudyStop);

    return () => {
      socket.off("mystudy:start", onMyStudyStart);
      socket.off("mystudy:stop", onMyStudyStop);
    };
  }, [subjects?.length]);

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

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedSubject.subject_id !== "" ? (
              <div className="flex w-full">
                <p>{selectedSubject.name}</p>
                <AnimatedTimerDisplay
                  value={selectedSubject.value}
                  className="ml-auto"
                />
              </div>
            ) : (
              "Select a subject"
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
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
                          (subject) => subject.subject_id === subject_id
                        );
                        if (subject) {
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
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {isSelected ? (
                        <div className="flex w-full">
                          <p>{selectedSubject.name}</p>
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
        onIcon={<Pause />}
        offIcon={<Play />}
        onClick={() => {
          if (selectedSubject.active) {
            socket.emit("study:stop");
          } else {
            socket.emit("study:start", selectedSubject.subject_id);
          }
        }}
        clicked={selectedSubject.active}
      />
    </div>
  );
}
