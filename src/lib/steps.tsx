import { Step, Tour } from "nextstepjs";

const defaultStep: Partial<Step> = {
  isPrevButton: true,
  isNextButton: true,
  blockKeyboardControl: true,
  showSkip: true,
  pointerPadding: 5,
  pointerRadius: 10,
  side: "right",
  prevDelay: 500,
  nextDelay: 500,
};

export function createStep(overrides: Partial<Step>): Step {
  return {
    ...defaultStep,
    ...overrides,
  } as Step;
}

const steps: Tour[] = [
  {
    tour: "newUser",
    steps: [
      createStep({
        icon: <>👋</>,
        title: "Welcome to FLOZABLE!",
        content: <>Start studying by clicking this button</>,
        selector: "#tour1-step1",
        side: "top",
        nextRoute: "/dashboard/study",
        prevRoute: "/dashboard",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Let's add new subject!",
        content: <>Click this button to add a new subject!</>,
        selector: "#tour1-step2",
        side: "top",
        prevRoute: "/dashboard",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Let's add new subject!",
        content: <>Modify subject details!</>,
        selector: "#tour1-step3",
        side: "top",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>Select subject!</>,
        selector: "#tour1-step4",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>Click here to study!</>,
        selector: "#tour1-step5-6",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>Click again to stop!</>,
        selector: "#tour1-step5-6",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>This shows your study time!</>,
        selector: "#tour1-step7",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>You can use these buttons to adjust your study rooms!</>,
        selector: "#tour1-step8",
        pointerPadding: 60,
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>Click to go home!</>,
        selector: "#tour1-step9",
        side: "top",
        prevRoute: "/dashboard/study",
        nextRoute: "/dashboard",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>Click here to go stats!</>,
        selector: "#tour1-step10",
        prevRoute: "/dashboard/study",
        nextRoute: "/dashboard/stats",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>You can see your study time chart here!</>,
        selector: "#tour1-step11",
        prevRoute: "/dashboard",
        nextRoute: "/dashboard/stats",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>You can see your ranking chart here!</>,
        selector: "#tour1-step12",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>You can see heatmap!</>,
        selector: "#tour1-step13",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>You can see website usage here!</>,
        selector: "#tour1-step14",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>Click here to go leaderboard!</>,
        selector: "#tour1-step15",
        prevRoute: "/dashboard/stats",
        nextRoute: "/dashboard/leaderboard",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>This is leaderboard!</>,
        selector: "#tour1-step16",
        prevRoute: "/dashboard/stats",
        nextRoute: "/dashboard/leaderboard",
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>You can adjust view of it from here!</>,
        selector: "#tour1-step17",
        side: "bottom-right",
        pointerPadding: 10,
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>Click here to go to groups apge!</>,
        selector: "#tour1-step18",
        prevRoute: "/dashboard/leaderboard",
        nextRoute: "/dashboard/groups",
        nextDelay: 2000,
      }),
      createStep({
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>These are all the groups that you can join!</>,
        selector: "#tour1-step19",
      }),
    ],
  },
  {
    tour: "secondTour",
    steps: [
      // You can use `createStep()` here too
    ],
  },
];

export default steps;
