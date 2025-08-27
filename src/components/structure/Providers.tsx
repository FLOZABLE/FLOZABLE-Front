"use client";

import { useAccount } from "@/hooks/accountHooks";
import { useFriendsStatusUpdater } from "@/hooks/updaters/friendUpdaters";
import { useNotificationsUpdater } from "@/hooks/updaters/notificationUpdaters";
import config from "@/lib/config";
import mediaSocket from "@/lib/sockets/mediaSocket";
import socket from "@/lib/sockets/socket";
import steps from "@/lib/steps";
import {
  CallOptionsContextType,
  WorkersContextType,
} from "@/types/contextTypes";
import { Notification } from "@/types/notificationTypes";
import {
  OnActiveGroup,
  OnDeActiveGroup,
  OnStopStudying,
  OnStudying,
} from "@/types/socketTypes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextStep, NextStepProvider } from "nextstepjs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

import TutorialCard from "../tutorial/TutorialCard";
import ModalProviders from "./ModalProviders";

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
            disableTransitionOnChange>
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

  const updateNotifications = useNotificationsUpdater();

  useEffect(() => {
    const onStudying = ({ user_id, subject }: OnStudying) => {
      updateFriendsStatus((prev) => {
        const index = prev.findIndex((f) => f.user_id === user_id);
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

    const onActiveGroup = ({ user_id: userId, group }: OnActiveGroup) => {
      updateFriendsStatus((prev) => {
        const index = prev.findIndex((f) => f.user_id === userId);
        if (index === -1) return prev;
        const copy = [...prev];
        copy[index] = { ...copy[index], active_group: group };
        return copy;
      });
    };

    const onDeActiveGroup = ({ user_id: userId }: OnDeActiveGroup) => {
      updateFriendsStatus((prev) => {
        const index = prev.findIndex((f) => f.user_id === userId);
        if (index === -1) return prev;
        const copy = [...prev];
        copy[index] = { ...copy[index], active_group: undefined };
        return copy;
      });
    };

    const onNotification = (notification: Notification) => {
      console.log("new notification", notification);
      updateNotifications((prev) => [...prev, notification]);
      toast.info(notification.title);
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
              <TutorialProvider>
                <DevelopmentProvider>{children}</DevelopmentProvider>
              </TutorialProvider>
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
        new URL("@/lib/workers/timerWorker.js", import.meta.url),
      );
    }

    if (!subjectTimerWorkerRef.current) {
      subjectTimerWorkerRef.current = new Worker(
        new URL("@/lib/workers/subjectTimerWorker.js", import.meta.url),
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
      `Workers are auto-initialized. Manual creation not supported. Tried: ${name}`,
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
      }}>
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
      value={{ isCam, setIsCam, isMic, setIsMic, isHeadphone, setIsHeadphone }}>
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

  /* useEffect(() => {
    if (themesData?.success) {
      setThemes(themesData.data.themes);
    }
  }, [themesData]);

  useEffect(() => {
    if (themesUserData?.success) {
      setUserThemes(themesUserData.data.themes);
    }
  }, [themesUserData]); */

  return (
    <ThemesContext.Provider
      value={{ themes, setThemes, userThemes, setUserThemes }}>
      {children}
    </ThemesContext.Provider>
  );
}

function TutorialProvider({ children }: ProviderProps) {
  return (
    <NextStep
      steps={steps}
      showNextStep={true}
      shadowRgb="125, 125, 125"
      shadowOpacity="0.7"
      cardTransition={{
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      onComplete={(tourName) => {
        console.log(`Tour completed: ${tourName}`);
      }}
      onSkip={(step, tourName) =>
        console.log(`Tour skipped: ${step} in ${tourName}`)
      }
      clickThroughOverlay={false}
      cardComponent={TutorialCard}>
      {children}
    </NextStep>
  );
}

function DevelopmentProvider({ children }: ProviderProps) {
  /* const { setCurrentStep, startNextStep, currentTour } = useTutorial();

  useEffect(() => {
    setTimeout(() => {
      console.log("shit");
      startNextStep("newUser");
    }, 1000);
    setTimeout(() => {
      setCurrentStep(17);
    }, 1500);
  }, [currentTour]); */

  return children;
}
