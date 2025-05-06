import { useSubjects } from "@/hooks/subjectsHooks";
import Combobox from "../ui/combo-box";
import { useMemo, useState } from "react";

export default function SubjectTimer() {
  const { subjects } = useSubjects();

  const [selectedSubject, setSelectedSubject] = useState({
    subject_id: "",
    name: "",
    value: 0,
    active: false,
    disp: "",
  });

  const options = useMemo(() => {
    if (!subjects?.length) return [];
    return subjects.map((subject) => {
      return {
        value: subject.subject_id,
        label: subject.name,
      };
    });
  }, [subjects]);
  return (
    <Combobox
      options={options}
      onChange={() => {}}
      value={selectedSubject.subject_id}
    />
  );
}
