export const DEFAULT_PLAN = {
  opened: false,
  title: "",
  description: "",
  start: new Date(),
  end: new Date(new Date().getTime() + 60 * 1000 * 30),
  repeat: 0,
  priority: 50,
  notification: -1,
  subject_id: null,
  plan_id: null,
  //saved: false,
  completed: false,
  type: "local",
  /* editable: true,
  isEditable: true, */
  share: [],
  shared: [],
};

export const DEFAULT_GROUP = {
  name: "",
  max_members: 10,
  color: "#000000",
  tags: [],
  description: "",
  visibility: 1,
  password: "",
  goal_hr: 3,
};

export const SUBJECTS_PIE_COLORS = [
  "#0395f9",
  "#3fc2ff",
  "#ff6844",
  "#82d795",
  "#705dc1",
  "#ffee65",
  "#beb9db",
  "#fdcce5",
  "#8bd3c7",
  "#e60049",
  "#0bb4ff",
  "#50e991",
  "#e6d800",
  "#9b19f5",
  "#ffa300",
  "#dc0ab4",
  "#b3d4ff",
  "#00bfa0",
];

export const STUDY_TREND_COLORS = [
  "#0395f9",
  "#3fc2ff",
  "#ff6844",
  "#82d795",
  "#705dc1",
  "#ffee65",
  "#beb9db",
  "#fdcce5",
  "#8bd3c7",
  "#e60049",
  "#0bb4ff",
  "#50e991",
  "#e6d800",
  "#9b19f5",
  "#ffa300",
  "#dc0ab4",
  "#b3d4ff",
  "#00bfa0",
];

export const COLOR_PALETTE_OPTIONS = [
  {
    name: "Sky Blue",
    colors: ["#D9F0FF", "#A3D5FF", "#83C9F4", "#6F73D2"],
  },
  {
    name: "Polaroid",
    colors: ["#F8E16C", "#00C49A", "#FB8F67", "#156064"],
  },
  {
    name: "Retro",
    colors: ["#FCAB10", "#F8333C", "#44AF69", "#2B9EB3"],
  },
  {
    name: "Winter",
    colors: ["#393D3F", "#FDFDFF", "#C6C5B9", "#546A7B"],
  },
  {
    name: "Peace",
    colors: ["#93A3B1", "#7C898B", "#636564", "#4C443C"],
  },
  {
    name: "Cream",
    colors: ["#4C5760", "#93A8AC", "#D7CEB2", "#A59E8C"],
  },
];
