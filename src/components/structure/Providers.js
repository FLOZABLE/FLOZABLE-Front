"use client";

import config from "@/utils/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalProviders from "./ModalProviders";
import { NextStep, NextStepProvider } from "nextstepjs";
import { usePlans, usePlansGoogle } from "@/hooks/plansHooks";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { isEqual } from "lodash";
import socket from "@/utils/sockets/socket";
import { useFriendsStatus } from "@/hooks/friendsHooks";

//modals

/* const AccountModalContext = createContext({
  isAccountModal: false,
  setIsAccountModal: () => {},
});
const JoinGroupModalContext = createContext({});
const EditGroupModalContext = createContext({});
const SubjectsModalContext = createContext({});
const AddSubjectsModalContext = createContext({});
const ChatModalContext = createContext({});
const SearchUsersModalContext = createContext({});
const WelcomeModalContext = createContext({});
const PlanModalContext = createContext({});
 */

export const WorkersContext = createContext({});
export const PlansContext = createContext({});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failiureCount, err) => {
        console.log(err?.response?.status, "err");
        if (err?.response?.status) {
          const retryableStatusCodes = [500, 502, 503, 504, 408];
          return retryableStatusCodes.includes(err.response.status);
        }

        // Retry if it's a network error (e.g., ECONNABORTED)
        return err.message === "Network Error" || err.code === "ECONNABORTED";
      },
      retryDelay: (retryCount) => {
        return Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s, etc.
      },
      gcTime: 1000 * 60 * 10,
    },
  },
});

export function AppContainer({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={config.google_client_id}>
        <AppProvider>{children}</AppProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

const steps = [
  {
    tour: "mainTour",
    steps: [
      {
        icon: "👋",
        title: "Welcome",
        content: "Let's get started with NextStep!",
        selector: "#step1",
        side: "right",
        showControls: true,
        showSkip: true,
      },
      // More steps...
    ],
  },
];

function AppProvider({ children }) {
  const { updateFriendsStatus } = useFriendsStatus();

  useEffect(() => {
    const onStudying = ({ userId, subject }) => {
      updateFriendsStatus((prev) => {
        const friendIndex = prev.findIndex(
          (friend) => friend.user_id === userId
        );
        if (friendIndex === -1) return prev;

        const newFriends = [...prev];
        newFriends[friendIndex] = {
          ...newFriends[friendIndex],
          activeSubject: subject,
        };

        return newFriends;
      });
    };

    const onStopStudying = ({ userId, subject, duration }) => {
      updateFriendsStatus((prev) => {
        const friendIndex = prev.findIndex(
          (friend) => friend.user_id === userId
        );
        if (friendIndex === -1) return prev;

        const newFriends = [...prev];
        const study_time = newFriends[friendIndex].study_time + duration;
        newFriends[friendIndex] = {
          ...newFriends[friendIndex],
          activeSubject: subject,
          study_time,
        };

        return newFriends;
      });
    };

    const onDeActiveGroup = ({ userId }) => {
      updateFriendsStatus((prev) => {
        const friendIndex = prev.findIndex(
          (friend) => friend.user_id === userId
        );
        if (friendIndex === -1) return prev;

        const newFriends = [...prev];
        newFriends[friendIndex] = {
          ...newFriends[friendIndex],
          activeGroup: null,
        };

        return newFriends;
      });
    };

    const onActiveGroup = ({ userId, group }) => {
      updateFriendsStatus((prev) => {
        const friendIndex = prev.findIndex(
          (friend) => friend.user_id === userId
        );
        if (friendIndex === -1) return prev;

        const newFriends = [...prev];
        newFriends[friendIndex] = {
          ...newFriends[friendIndex],
          activeGroup: group,
        };

        return newFriends;
      });
    };

    socket.on("studying", onStudying);
    socket.on("stopStudying", onStopStudying);
    socket.on(`deActiveGroup`, onDeActiveGroup);
    socket.on(`activeGroup`, onActiveGroup);
    return () => {
      socket.off("studying", onStudying);
      socket.off("stopStudying", onStopStudying);
      socket.off(`deActiveGroup`, onDeActiveGroup);
      socket.off(`activeGroup`, onActiveGroup);
    };
  }, []);
  
  return (
    <WorkersProvider>
      <NextStepProvider>
        <NextStep steps={steps}></NextStep>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ModalProviders>
            <PlansProvider>{children}</PlansProvider>
          </ModalProviders>
        </LocalizationProvider>
      </NextStepProvider>
    </WorkersProvider>
  );
}

function WorkersProvider({ children }) {
  const membersTimerWorkerRef = useRef(null);
  const subjectsTimerWorkerRef = useRef(null);

  useEffect(() => {
    membersTimerWorkerRef.current = new Worker(
      new URL("@/utils/workers/timerWorker.js", import.meta.url)
    );
    subjectsTimerWorkerRef.current = new Worker(
      new URL("@/utils/workers/subjectTimerWorker.js", import.meta.url)
    );

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("scope is: ", registration.scope);
        });
    }

    return () => {
      membersTimerWorkerRef.current?.terminate();
      subjectsTimerWorkerRef.current?.terminate();
    };
  }, []);

  return (
    <WorkersContext.Provider
      value={{ membersTimerWorkerRef, subjectsTimerWorkerRef }}
    >
      {children}
    </WorkersContext.Provider>
  );
}

function PlansProvider({ children }) {
  const [plans, setPlans] = useState([]);
  const [plansDate, setPlansDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  const { plansData } = usePlans();
  const { plansGoogleData } = usePlansGoogle(plansDate);

  // Memoize the sorted plans so it only recomputes when data changes
  const sortedPlans = useMemo(() => {
    return [...plansData, ...plansGoogleData].sort((a, b) => a.start - b.start);
  }, [plansData, plansGoogleData]);

  useEffect(() => {
    setPlans((prevPlans) => {
      // Merge existing plans with new sorted plans while keeping references if unchanged
      if (isEqual(prevPlans, sortedPlans)) return prevPlans;
      return sortedPlans;
    });
  }, [sortedPlans]);

  return (
    <PlansContext.Provider value={{ plans, setPlans, plansDate, setPlansDate }}>
      {children}
    </PlansContext.Provider>
  );
}
