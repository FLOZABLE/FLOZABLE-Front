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
