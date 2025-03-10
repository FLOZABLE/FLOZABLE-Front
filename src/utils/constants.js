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
