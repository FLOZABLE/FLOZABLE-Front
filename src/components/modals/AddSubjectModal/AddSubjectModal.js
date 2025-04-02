"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./AddSubjectModal.module.css";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";
import DraggableModal from "../DraggableModal/DraggableModal";
import CustomInput from "@/components/inputs/CustomInput/CustomInput";
import ColorPalette from "@/components/inputs/ColorPalette/ColorPalette";
import BlobBtn from "@/components/buttons/BlobBtn/BlobBtn";
import { useSubjects } from "@/hooks/subjectsHooks";
import { useNextStep } from "nextstepjs";
import { AddSubjectsModalContext } from "@/components/structure/ModalProviders";
import { WorkersContext } from "@/components/structure/Providers";
import socket from "@/utils/sockets/socket";
import { putSubjectsSubject } from "@/apis/subjectsApi";
import { sortNewSubject } from "@/utils/timelineSorter";
import { ColorPicker } from "@/components/inputs/ColorPicker";
import { Input } from "@/components/ui/input";

function AddSubjectModal({}) {
  const { currentStep, setCurrentStep } = useNextStep();
  const { subjects, updateSubjects } = useSubjects();

  const { isAddSubjectModal, setIsAddSubjectModal } = useContext(
    AddSubjectsModalContext
  );
  const { subjectsTimerWorkerRef } = useContext(WorkersContext);

  const [subject, setSubject] = useState({
    name: "",
    color: null,
  });
  const [isSelectColor, setIsSelectColor] = useState(false);

  const [debouncedName] = useDebounce(subject.name, 1000);
  const [debouncedColor] = useDebounce(subject.color, 1000);

  useEffect(() => {
    if (debouncedName === "" || currentStep !== 4) return;

    if (!/^[a-zA-Z0-9!?#@&()<>'[\],~".,/\p{Emoji}\s]+$/u.test(debouncedName)) {
      setIsSelectColor(true);
      toast.error("Invalid Characters");
      return;
    }

    setIsSelectColor(true);
    setTimeout(() => {
      setCurrentStep(5);
    }, 500);
  }, [debouncedName]);

  useEffect(() => {
    if (!debouncedColor) return;

    if (currentStep === 5) {
      setCurrentStep(6);
    }
  }, [debouncedColor]);

  useEffect(() => {
    if (isAddSubjectModal) {
      const subjectId = subjectsTimerWorkerRef?.current?.subjectId;
      if (subjectId) {
        subjectsTimerWorkerRef?.current?.postMessage({
          command: "stopSubjectTimer",
        });
        socket.emit("study:stop", subjectId);
      }
    }
  }, [isAddSubjectModal]);

  const onSubmit = useCallback(
    async (subject) => {
      try {
        const response = await putSubjectsSubject(subject);

        if (!response.success) {
          setCurrentStep(4);
          return;
        }

        const newSubjects = sortNewSubject(
          structuredClone(subjects),
          response.data.subject
        );
        updateSubjects(newSubjects);
        setIsSelectColor(false);
        setIsAddSubjectModal(false);
        setSubject({ name: "", color: null });

        if (currentStep === 6) {
          setCurrentStep(7);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [subjects, currentStep]
  );

  return (
    <DraggableModal
      isOpen={isAddSubjectModal}
      setIsOpen={setIsAddSubjectModal}
      top="0rem"
    >
      <div className="p-8 w-70 box-border">
        <div className="mb-2.5" data-tutorial={4}>
          <Input
            value={subject.name}
            placeholder="Subject Name"
            type="text"
            onChange={(e) =>
              setSubject((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="mt-5 flex justify-center">
          <ColorPicker
            background={subject.color ?? ""}
            setBackground={(color) => {
              setSubject((prev) => ({ ...prev, color }));
            }}
            options={["solid"]}
          />
          {/* <Button onClick={() => onSubmit(subject)}>SAVE</Button> */}
        </div>
        <div className="mt-5 flex justify-center" data-tutorial={6}>
          <BlobBtn
            onClick={() => {
              onSubmit(subject);
            }}
          >
            test
          </BlobBtn>
        </div>
      </div>
    </DraggableModal>
  );
}

export default AddSubjectModal;
