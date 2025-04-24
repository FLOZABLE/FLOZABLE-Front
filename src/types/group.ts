import { Userinfo } from "./account";
import { ApiResponse } from "./response";
import { ActiveSubject } from "./subject";

export interface Group {
  group_id: string;
  name: string;
  leader: string;
  visibility: boolean;
  description: string;
  created_at: number;
  max_members: number;
  tags: string[];
  color: string;
  goal_hr: number;
  members: string[];
  likes: string[];
}

export interface ActiveGroup extends Group {
  time: number;
}

export interface GroupMember extends Pick<Userinfo, "user_id" | "name"> {
  study_time: number;
  active_subject?: ActiveSubject;
}

// get /groups
export type GroupsResponse = ApiResponse<{
  groups: Group[];
  my_groups: Group[];
}>;

// get /groups/group/members
export type GroupMembersResponse = ApiResponse<{
  members: GroupMember[];
}>;
