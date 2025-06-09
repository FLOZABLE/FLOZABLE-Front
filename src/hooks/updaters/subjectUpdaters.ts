import { Subject } from "@/types/subjectTypes";
import { useUpdater } from "../otherHooks";

export function useSubjectsUpdater() {
  return useUpdater<{ subjects: Subject[] }, "subjects">(
    ["subjects"],
    "subjects"
  );
}
