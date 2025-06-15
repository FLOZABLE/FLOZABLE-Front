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
        showControls: false,
        showSkip: true,
        pointerPadding: 5,
        pointerRadius: 10,
        prevRoute: "/dashboard",
      },
      {
        icon: <>🎉</>,
        title: "Let's add new subject!",
        content: <>Modify subject details!</>,
        selector: "#tour1-step3",
        side: "top",
        showControls: false,
        showSkip: true,
        pointerPadding: 5,
        pointerRadius: 10,
      },
      {
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>Select subject!</>,
        selector: "#tour1-step4",
        side: "top",
        showControls: false,
        showSkip: true,
        pointerPadding: 5,
        pointerRadius: 10,
      },
      {
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>Click here to study!</>,
        selector: "#tour1-step5-6",
        side: "top",
        showControls: true,
        showSkip: true,
        pointerPadding: 5,
        pointerRadius: 10,
      },
      {
        icon: <>🎉</>,
        title: "Select the created subject!",
        content: <>This shows your study time!</>,
        selector: "#tour1-step6",
        side: "top",
        showControls: true,
        showSkip: true,
        pointerPadding: 5,
        pointerRadius: 10,
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
