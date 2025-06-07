import { Friend } from "./friendTypes";
import { ApiResponse } from "./responseTypes";
import { ActiveSubject, GroupedSubjects, Subject } from "./subjectTypes";

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

// GET /account
export type AccountResponse = ApiResponse<{ userinfo: Account }>;

// GET /account/google
export type AccountGoogleResponse = ApiResponse<{ google_info: GoogleAccount }>;

// GET /account
export type AccountPatchResponse = ApiResponse<{ verified: boolean }>;

// GET /account/profile
export type AccountProfileResponse = ApiResponse<{
  userinfo: Userinfo;
  friends: Friend[];
  subjects: Subject[];
  grouped_subjects: GroupedSubjects;
}>;

// GET /account/profile/status
export type AccountProfileStatusResponse = ApiResponse<{
  active_subject: ActiveSubject;
}>;
