"use client";

import config from "@/lib/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalProviders, { useAddSubjectModal } from "./ModalProviders";
import { NextStep, NextStepProvider, useNextStep } from "nextstepjs";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import socket from "@/lib/sockets/socket";
import mediaSocket from "@/lib/sockets/mediaSocket";
import { useAccount } from "@/hooks/accountHooks";
import { updateQueryData } from "@/lib/utils";
import { useThemes, useThemesUser } from "@/hooks/themesHooks";
import { toast } from "react-toastify";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  OnActiveGroup,
  OnDeActiveGroup,
  OnStopStudying,
  OnStudying,
} from "@/types/socketTypes";
import {
  CallOptionsContextType,
  WorkersContextType,
} from "@/types/contextTypes";
import { useFriendsStatusUpdater } from "@/hooks/updaters/friendUpdaters";
//import { ViewerType } from "@/types/others";

/* export const ViewDateContext = createContext({});
export const ViewerContext = createContext({}); */

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failiureCount: number, err: any) => {
        console.log(err?.response?.status, "err");
        if (err?.response?.status) {
          const retryableStatusCodes: number[] = [500, 502, 503, 504, 408];
          return retryableStatusCodes.includes(err.response.status);
        }

        // Retry if it's a network error (e.g., ECONNABORTED)
        return err.message === "Network Error" || err.code === "ECONNABORTED";
      },
      retryDelay: (retryCount: number) => {
        return Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s, etc.
      },
      gcTime: 1000 * 60 * 10,
    },
  },
});

interface ProviderProps {
  children: ReactNode;
}

export function AppContainer({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={config.google_client_id}>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <ViewerProvider>
              <ViewDateProvider>{children}</ViewDateProvider>
            </ViewerProvider> */}
            {children}
          </ThemeProvider>
        </AppProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

interface ThemeProviderProps {
  children: ReactNode;
  [key: string]: any;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

import type { CardComponentProps } from "nextstepjs";
import steps from "@/lib/steps";

export const CustomCard = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  skipTour,
  arrow,
}: CardComponentProps) => {
  return (
    <div>
      <h1>
        {step.icon} {step.title}
      </h1>
      <h2>
        {currentStep} of {totalSteps}
      </h2>
      <p>{step.content}</p>
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
      <button onClick={skipTour}>Skip</button>
      {arrow}
    </div>
  );
};

function AppProvider({ children }: ProviderProps) {
  const { account } = useAccount();

  useEffect(() => {
    if (!account) {
      socket.disconnect();
      mediaSocket.disconnect();
      return;
    }

    setTimeout(() => {
      socket.connect();
      mediaSocket.connect();
    }, 100);
  }, [account?.user_id]);

  const updateFriendsStatus = useFriendsStatusUpdater();

  /* const updateProfileStatus = useCallback(
    async (userId: string, field: string, newData: any) => {
      await queryClient.setQueryData(
        ["useProfileStatus", userId],
        (oldData: any) => {
          return updateQueryData(oldData, newData, field);
        }
      );
    },
    []
  ); */

  const updateNotificationsData = useCallback(async (newData: any) => {
    await queryClient.setQueryData(["useNotifications"], (oldData: any) => {
      return updateQueryData(oldData, newData, "notifications");
    });
  }, []);

  useEffect(() => {
    const onStudying = ({ userId, subject }: OnStudying) => {
      updateFriendsStatus((prev) => {
        const index = prev.findIndex((f) => f.user_id === userId);
        if (index === -1) return prev;
        const copy = [...prev];
        copy[index] = { ...copy[index], status: subject };
        return copy;
      });
      //updateProfileStatus(userId, "status", status);
    };

    const onStopStudying = ({ user_id, status, duration }: OnStopStudying) => {
      updateFriendsStatus((prev) => {
        const index = prev.findIndex((f) => f.user_id === user_id);
        if (index === -1) return prev;
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          status: status,
          study_time: (copy[index].study_time || 0) + duration,
        };
        return copy;
      });
      //updateProfileStatus(userId, "status", status);
    };

    const onActiveGroup = ({ userId, group }: OnActiveGroup) => {
      updateFriendsStatus((prev) => {
        const index = prev.findIndex((f) => f.user_id === userId);
        if (index === -1) return prev;
        const copy = [...prev];
        copy[index] = { ...copy[index], active_group: group };
        return copy;
      });
    };

    const onDeActiveGroup = ({ userId }: OnDeActiveGroup) => {
      updateFriendsStatus((prev) => {
        const index = prev.findIndex((f) => f.user_id === userId);
        if (index === -1) return prev;
        const copy = [...prev];
        copy[index] = { ...copy[index], active_group: undefined };
        return copy;
      });
    };

    const onNotification = (notification: any) => {
      updateNotificationsData((prev: any[]) => [...prev, notification]);
      toast.info(notification.message?.title);
    };

    socket.on("study:start", onStudying);
    socket.on("study:stop", onStopStudying);
    socket.on("group:member:online", onActiveGroup);
    socket.on("group:member:offline", onDeActiveGroup);
    socket.on("notification", onNotification);

    return () => {
      socket.off("study:start", onStudying);
      socket.off("study:stop", onStopStudying);
      socket.off("group:member:online", onActiveGroup);
      socket.off("group:member:offline", onDeActiveGroup);
      socket.off("notification", onNotification);
    };
  }, []);

  return (
    <WorkersProvider>
      <ModalProviders>
        <CallOptionsProvider>
          <ThemesProvider>
            <NextStepProvider>
              <TutorialProvider>{children}</TutorialProvider>
            </NextStepProvider>
          </ThemesProvider>
        </CallOptionsProvider>
      </ModalProviders>
    </WorkersProvider>
  );
}

export const WorkersContext = createContext<WorkersContextType>({
  membersTimerWorker: null,
  subjectTimerWorker: null,
  createWorker: () => {},
  terminateWorker: () => {},
  getWorker: () => null,
});

export function WorkersProvider({ children }: ProviderProps) {
  const membersTimerWorkerRef = useRef<Worker | null>(null);
  const subjectTimerWorkerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (!membersTimerWorkerRef.current) {
      membersTimerWorkerRef.current = new Worker(
        new URL("@/lib/workers/timerWorker.js", import.meta.url)
      );
    }

    if (!subjectTimerWorkerRef.current) {
      subjectTimerWorkerRef.current = new Worker(
        new URL("@/lib/workers/subjectTimerWorker.js", import.meta.url)
      );
    }

    return () => {
      membersTimerWorkerRef.current?.terminate();
      membersTimerWorkerRef.current = null;

      subjectTimerWorkerRef.current?.terminate();
      subjectTimerWorkerRef.current = null;
    };
  }, []);

  const createWorker = (name: string) => {
    console.warn(
      `Workers are auto-initialized. Manual creation not supported. Tried: ${name}`
    );
  };

  const terminateWorker = (name: string) => {
    if (name === "membersTimer" && membersTimerWorkerRef.current) {
      membersTimerWorkerRef.current.terminate();
      membersTimerWorkerRef.current = null;
    }
    if (name === "statusTimer" && subjectTimerWorkerRef.current) {
      subjectTimerWorkerRef.current.terminate();
      subjectTimerWorkerRef.current = null;
    }
  };

  const getWorker = (name: string): Worker | null => {
    if (name === "membersTimer") return membersTimerWorkerRef.current;
    if (name === "statusTimer") return subjectTimerWorkerRef.current;
    return null;
  };

  return (
    <WorkersContext.Provider
      value={{
        membersTimerWorker: membersTimerWorkerRef.current,
        subjectTimerWorker: subjectTimerWorkerRef.current,
        createWorker,
        terminateWorker,
        getWorker,
      }}
    >
      {children}
    </WorkersContext.Provider>
  );
}

export function useWorkers() {
  return useContext(WorkersContext);
}

export const CallOptionsContext = createContext<CallOptionsContextType>({
  isCam: false,
  setIsCam: () => {},
  isMic: false,
  setIsMic: () => {},
  isHeadphone: false,
  setIsHeadphone: () => {},
});

function CallOptionsProvider({ children }: { children: ReactNode }) {
  const [isCam, setIsCam] = useState(false);
  const [isMic, setIsMic] = useState(false);
  const [isHeadphone, setIsHeadphone] = useState(false);

  return (
    <CallOptionsContext.Provider
      value={{ isCam, setIsCam, isMic, setIsMic, isHeadphone, setIsHeadphone }}
    >
      {children}
    </CallOptionsContext.Provider>
  );
}

export function useCallOptions() {
  return useContext(CallOptionsContext);
}

export const ThemesContext = createContext({});

function ThemesProvider({ children }: { children: ReactNode }) {
  const [themes, setThemes] = useState<any[]>([]);
  const [userThemes, setUserThemes] = useState<any[]>([]);

  const { themesData } = useThemes();
  const { themesUserData } = useThemesUser();

  useEffect(() => {
    if (themesData?.success) {
      setThemes(themesData.data.themes);
    }
  }, [themesData]);

  useEffect(() => {
    if (themesUserData?.success) {
      setUserThemes(themesUserData.data.themes);
    }
  }, [themesUserData]);

  return (
    <ThemesContext.Provider
      value={{ themes, setThemes, userThemes, setUserThemes }}
    >
      {children}
    </ThemesContext.Provider>
  );
}

function TutorialProvider({ children }: ProviderProps) {
  const { setAddSubjectModal } = useAddSubjectModal();
  const { setCurrentStep } = useNextStep();

  return (
    <NextStep
      steps={steps}
      showNextStep={true}
      shadowRgb="55,48,163"
      shadowOpacity="0.8"
      cardTransition={{ duration: 0.5, type: "spring" }}
      onStepChange={(step, tourName) => {
        console.log(`Step changed to ${step} in ${tourName}`);
        if (tourName === "newUser") {
          switch (step) {
            case 0:
              break;
            case 1:
              break;
            case 2:
              setAddSubjectModal((prev) => ({ ...prev, opened: true }));
              break;
            default:
          }
        }
      }}
      onComplete={(tourName) => console.log(`Tour completed: ${tourName}`)}
      onSkip={(step, tourName) =>
        console.log(`Tour skipped: ${step} in ${tourName}`)
      }
      clickThroughOverlay={false}
    >
      {children}
    </NextStep>
  );
}
