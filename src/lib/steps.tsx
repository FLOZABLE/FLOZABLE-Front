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
        icon: <>➕</>,
        title: "Add a Subject",
        content: <>Click here to create your first subject!</>,
        selector: "#tour1-step2",
        side: "top",
        prevRoute: "/dashboard",
      }),
      createStep({
        icon: <>✏️</>,
        title: "Edit Subject",
        content: <>Customize subject name, color, and goal!</>,
        selector: "#tour1-step3",
        side: "top",
      }),
      createStep({
        icon: <>📚</>,
        title: "Choose a Subject",
        content: <>Select the subject you just created.</>,
        selector: "#tour1-step4",
      }),
      createStep({
        icon: <>⏱️</>,
        title: "Start Studying",
        content: <>Click here to begin your study session.</>,
        selector: "#tour1-step5-6",
      }),
      createStep({
        icon: <>🛑</>,
        title: "Stop Studying",
        content: <>Click again to stop your session.</>,
        selector: "#tour1-step5-6",
      }),
      createStep({
        icon: <>📈</>,
        title: "Track Study Time",
        content: <>See how long you’ve studied today!</>,
        selector: "#tour1-step7",
      }),
      createStep({
        icon: <>🛠️</>,
        title: "Study Session Tools",
        content: <>Use these controls to adjust your study view and tools.</>,
        selector: "#tour1-step8",
        pointerPadding: 60,
      }),
      createStep({
        icon: <>🏠</>,
        title: "Go to Dashboard",
        content: <>Click here to return to the home dashboard.</>,
        selector: "#tour1-step9",
        side: "top",
        prevRoute: "/dashboard/study",
        nextRoute: "/dashboard",
        pointerPadding: 15,
      }),
      createStep({
        icon: <>📊</>,
        title: "Go to Stats",
        content: <>See your study analytics here.</>,
        selector: "#tour1-step10",
        prevRoute: "/dashboard/study",
        nextRoute: "/dashboard/stats",
      }),
      createStep({
        icon: <>📅</>,
        title: "Study Time Chart",
        content: <>Visualize your study time trends.</>,
        selector: "#tour1-step11",
        prevRoute: "/dashboard",
        nextRoute: "/dashboard/stats",
      }),
      createStep({
        icon: <>🏆</>,
        title: "Ranking Chart",
        content: <>Check how your ranking changes over time.</>,
        selector: "#tour1-step12",
      }),
      createStep({
        icon: <>🔥</>,
        title: "Heatmap",
        content: <>View your daily study intensity.</>,
        selector: "#tour1-step13",
      }),
      createStep({
        icon: <>🌐</>,
        title: "Website Usage",
        content: <>See where you spent your online time.</>,
        selector: "#tour1-step14",
      }),
      createStep({
        icon: <>📊</>,
        title: "Go to Leaderboard",
        content: <>See how you rank among friends.</>,
        selector: "#tour1-step15",
        prevRoute: "/dashboard/stats",
        nextRoute: "/dashboard/leaderboard",
      }),
      createStep({
        icon: <>🥇</>,
        title: "Leaderboard",
        content: <>Track your performance vs others.</>,
        selector: "#tour1-step16",
        prevRoute: "/dashboard/stats",
        nextRoute: "/dashboard/leaderboard",
      }),
      createStep({
        icon: <>🔍</>,
        title: "Leaderboard View",
        content: <>Filter or switch leaderboard view here.</>,
        selector: "#tour1-step17",
        side: "bottom-right",
        pointerPadding: 10,
      }),
      createStep({
        icon: <>👥</>,
        title: "Study Groups",
        content: <>Join or explore public study groups.</>,
        selector: "#tour1-step18",
        prevRoute: "/dashboard/leaderboard",
        nextRoute: "/dashboard/groups",
        nextDelay: 3000,
      }),
      createStep({
        icon: <>📁</>,
        title: "Your Groups",
        content: <>Browse all available study groups.</>,
        selector: "#tour1-step19",
        side: "top",
      }),
      createStep({
        icon: <>✅</>,
        title: "All Set!",
        content: <>You’re ready to focus and thrive with FLOZABLE!</>,
      }),
    ],
  },
];

export default steps;
