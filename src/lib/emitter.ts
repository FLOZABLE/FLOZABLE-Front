import { Subject } from "@/types/subjectTypes";
import mitt, { Emitter } from "mitt";

type Events = {
  addedSubject: Subject;
};

const emitter: Emitter<Events> = mitt<Events>();

export default emitter;
