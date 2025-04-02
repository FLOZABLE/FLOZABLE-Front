import React, { useContext } from "react";
import styles from "./SubjectsManager.module.css";
import { useSubjects } from "@/hooks/subjectsHooks";
import { useSubjectsModal } from "@/components/structure/ModalProviders";
import BlobBtn from "@/components/buttons/BlobBtn/BlobBtn";

function SubjectsManager() {
  const { subjects } = useSubjects();
  const { setIsSubjectsModal } = useSubjectsModal();

  return (
    <div className={styles.SubjectsManager}>
      {subjects.map((subject, i) => {
        return (
          <div className={styles.subject} key={i}>
            <BlobBtn
              onClick={() => {
                setIsSubjectsModal({
                  opened: true,
                  subject_id: subject.subject_id,
                });
              }}
            >
              <div className={`overflowDot ${styles.name}`}>{subject.name}</div>
            </BlobBtn>
          </div>
        );
      })}
    </div>
  );
}

export default SubjectsManager;
