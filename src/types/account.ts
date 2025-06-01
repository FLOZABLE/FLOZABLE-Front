import { Friend } from "./friend";
import { ApiResponse } from "./response";
import { ActiveSubject, GroupedSubjects, Subject } from "./subject";

export interface Account {
  user_id: string;
  name: string;
  email: string;
  timezone: string;
  verified: boolean;
  groups: string[];
  friends: string[];
}

export interface Userinfo {
  user_id: string;
  name: string;
  created_at: number;
  timezone: string;
}

export interface UserStatus {
  subject_id: string;
  name: string;
  start_time: number;
}

export interface GoogleAccount {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  scopes: string[];
}

// get /account
export type AccountResponse = ApiResponse<{ userinfo: Account }>;

// get /account/google
export type AccountGoogleResponse = ApiResponse<{ google_info: GoogleAccount }>;

// patch /account
export type AccountPatchResponse = ApiResponse<{ verified: boolean }>;

// get /account/profile
export type AccountProfileResponse = ApiResponse<{
  userinfo: Userinfo;
  friends: Friend[];
  subjects: Subject[];
  grouped_subjects: GroupedSubjects;
}>;

// get /account/profile/status
export type AccountProfileStatusResponse = ApiResponse<{
  active_subject: ActiveSubject;
}>;
