import { Tour } from "nextstepjs";

const steps: Tour[] = [
  {
    tour: "newUser",
    steps: [
      {
        icon: <>👋</>,
        title: "Welcome to FLOZABLE!",
        content: <>Start by clicking this button</>,
        selector: "#tour1-step1",
        side: "top",
        showControls: true,
        showSkip: true,
        pointerPadding: 5,
        pointerRadius: 10,
        nextRoute: "/dashboard/study",
        prevRoute: "/dashboard",
      },
      {
        icon: <>🎉</>,
        title: "Let's add new subject!",
        content: <>Click this button to add a new subject!</>,
        selector: "#tour1-step2",
        side: "top",
        showControls: true,
        showSkip: true,
        pointerPadding: 5,
        pointerRadius: 10,
        prevRoute: "/dashboard",
        //viewportID: "scrollable-viewport",
      },
      {
        icon: <>🎉</>,
        title: "Let's add new subject!",
        content: <>Modify subject details!</>,
        selector: "#tour1-step3",
        side: "top",
        showControls: true,
        showSkip: true,
        pointerPadding: 5,
        pointerRadius: 10,
        //viewportID: "scrollable-viewport",
      },
    ],
  },
  {
    tour: "secondTour",
    steps: [
      // Step objects
    ],
  },
];

export default steps;
