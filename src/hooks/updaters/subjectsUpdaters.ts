import { Subject } from "@/types/subject";
import { useUpdater } from "../otherHooks";

export function useSubjectsUpdater() {
  return useUpdater<{ subjects: Subject[] }, "subjects">(
    ["subjects"],
    "subjects"
  );
}
