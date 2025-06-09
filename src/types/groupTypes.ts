import { Userinfo, UserStatus } from "./accountTypes";
import { ApiResponse } from "./responseTypes";

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

// Group with active time (for the current user)
export interface ActiveGroup extends Group {
  time: number;
}

export interface GroupMember extends Pick<Userinfo, "user_id" | "name"> {
  study_time: number;
  status?: UserStatus;
}

// GET /group/all
export type AllGroupsResponse = ApiResponse<{ groups: Group[] }>;

// GET /group/mine
export type MyGroupsResponse = ApiResponse<{ groups: string[] }>;

// GET /group/members
export type GroupMembersResponse = ApiResponse<{ members: GroupMember[] }>;
