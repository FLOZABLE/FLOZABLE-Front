"use client";

import config from "@/utils/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalProviders from "./ModalProviders";
import { NextStep, NextStepProvider, Tour } from "nextstepjs";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import socket from "@/utils/sockets/socket";
import mediaSocket from "@/utils/sockets/mediaSocket";
import { useAccount } from "@/hooks/accountHooks";
import { updateQueryData } from "@/utils/tools";
import { useThemes, useThemesUser } from "@/hooks/themesHooks";
import { toast } from "react-toastify";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useUpdater } from "@/hooks/otherHooks";
import { FriendStatus } from "@/types/friend";
import { ActiveSubject } from "@/types/subject";
import { ActiveGroup } from "@/types/group";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContainerProps {
  children: ReactNode;
}

export const CallOptionsContext = createContext({});
export const ThemesContext = createContext({});

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

export function AppContainer({ children }: AppContainerProps) {
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

const steps: Tour[] = [
  {
    tour: "firstTour",
    steps: [
      // Step objects
    ],
  },
  {
    tour: "secondTour",
    steps: [
      // Step objects
    ],
  },
];

function AppProvider({ children }: AppProviderProps) {
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

  const updateFriendsStatus = useUpdater<
    { friends: FriendStatus[] },
    "friends"
  >(["friendsStatus"], "friends");

  const updateProfileStatus = useCallback(
    async (userId: string, field: string, newData: any) => {
      await queryClient.setQueryData(
        ["useProfileStatus", userId],
        (oldData: any) => {
          return updateQueryData(oldData, newData, field);
        }
      );
    },
    []
  );

  const updateNotificationsData = useCallback(async (newData: any) => {
    await queryClient.setQueryData(["useNotifications"], (oldData: any) => {
      return updateQueryData(oldData, newData, "notifications");
    });
  }, []);

  useEffect(() => {
    const onStudying = ({
      userId,
      subject,
    }: {
      userId: string;
      subject: ActiveSubject;
    }) => {
      updateFriendsStatus((prev) => {
        console.log("prev", prev);
        const index = prev.findIndex((f) => f.user_id === userId);
        if (index === -1) return prev;
        const copy = [...prev];
        copy[index] = { ...copy[index], active_subject: subject };
        return copy;
      });
      updateProfileStatus(userId, "active_subject", subject);
    };

    const onStopStudying = ({
      userId,
      subject,
      duration,
    }: {
      userId: string;
      subject: ActiveSubject;
      duration: number;
    }) => {
      updateFriendsStatus((prev) => {
        const index = prev.findIndex((f) => f.user_id === userId);
        if (index === -1) return prev;
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          active_subject: subject,
          study_time: (copy[index].study_time || 0) + duration,
        };
        return copy;
      });
      updateProfileStatus(userId, "active_subject", subject);
    };

    const onActiveGroup = ({
      userId,
      group,
    }: {
      userId: string;
      group: ActiveGroup;
    }) => {
      updateFriendsStatus((prev) => {
        const index = prev.findIndex((f) => f.user_id === userId);
        if (index === -1) return prev;
        const copy = [...prev];
        copy[index] = { ...copy[index], active_group: group };
        return copy;
      });
    };

    const onDeActiveGroup = ({ userId }: { userId: string }) => {
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
      <NextStepProvider>
        <NextStep steps={steps}>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <ModalProviders>
              <CallOptionsProvider>
                <ThemesProvider>{children}</ThemesProvider>
              </CallOptionsProvider>
            </ModalProviders>
          </LocalizationProvider>
        </NextStep>
      </NextStepProvider>
    </WorkersProvider>
  );
}

interface WorkersProviderProps {
  children: ReactNode;
}

interface WorkersContextType {
  membersTimerWorker: Worker | null;
  createWorker: (name: string, script: string) => void;
  terminateWorker: (name: string) => void;
  getWorker: (name: string) => Worker | null;
}

interface WorkersProviderProps {
  children: React.ReactNode;
}

export const WorkersContext = createContext<WorkersContextType>({
  membersTimerWorker: null,
  createWorker: () => {},
  terminateWorker: () => {},
  getWorker: () => null,
});

export function WorkersProvider({ children }: WorkersProviderProps) {
  const membersTimerWorkerRef = useRef<Worker | null>(null);

  // Initialize the shared membersTimer worker
  useEffect(() => {
    if (!membersTimerWorkerRef.current) {
      membersTimerWorkerRef.current = new Worker(
        new URL("@/utils/workers/timerWorker.js", import.meta.url)
      );
    }

    return () => {
      // Cleanup worker when app unmounts
      membersTimerWorkerRef.current?.terminate();
      membersTimerWorkerRef.current = null;
    };
  }, []);

  const createWorker = (name: string) => {
    // You can add logic here for dynamically creating other workers
    console.warn(`Only membersTimer worker is shared in this context.`, name);
  };

  const terminateWorker = (name: string) => {
    if (name === "membersTimer" && membersTimerWorkerRef.current) {
      membersTimerWorkerRef.current.terminate();
      membersTimerWorkerRef.current = null;
    }
  };

  const getWorker = (name: string) => {
    if (name === "membersTimer") {
      return membersTimerWorkerRef.current;
    }
    return null;
  };

  return (
    <WorkersContext.Provider
      value={{
        membersTimerWorker: membersTimerWorkerRef.current,
        createWorker,
        terminateWorker,
        getWorker,
      }}
    >
      {children}
    </WorkersContext.Provider>
  );
}

// Hook to use Workers Context
export function useWorkers() {
  return useContext(WorkersContext);
}

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
