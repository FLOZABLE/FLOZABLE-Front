import { Userinfo } from "./accountTypes";
import { Friend } from "./friendTypes";
import { ApiResponse } from "./responseTypes";
import { GroupedSubjects, Subject } from "./subjectTypes";

// GET /user/:user_id/profile
export type UserProfileResponse = ApiResponse<{
  userinfo: Userinfo;
  friends: Friend[];
  subjects: Subject[];
  grouped_subjects: GroupedSubjects;
}>;
