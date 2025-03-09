"use client";

import { useModalState } from "@/hooks/otherHooks";
import config from "@/utils/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const PlansContext = createContext({});
const CallOptionsContext = createContext({});
const ThemesContext = createContext({});
const WorkersContext = createContext({});
//modals

const AccountModalContext = createContext({
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

function AppProvider({ children }) {
  return <AccountModalProvider>{children}</AccountModalProvider>;
}
function PlansProvider({ children }) {
  const [plans, setPlans] = useState([]);
  const [plansDate, setPlansDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  const { plansData } = usePlans();
  const { plansGoogleData } = usePlansGoogle(plansDate);

  useEffect(() => {
    const sortedPlans = [...plansData, ...plansGoogleData].sort(
      (a, b) => a.start - b.start
    );
    if (JSON.stringify(sortedPlans) === JSON.stringify(plans)) return;
    setPlans(sortedPlans);
  }, [plansData, plansGoogleData]);

  return (
    <PlansContext.Provider value={{ plans, setPlans, plansDate, setPlansDate }}>
      {children}
    </PlansContext.Provider>
  );
}

function AccountModalProvider({ children }) {
  const [isAccountModal, setIsAccountModal] = useModalState(false);

  return (
    <AccountModalContext.Provider
      value={{
        isAccountModal,
        setIsAccountModal,
      }}
    >
      {children}
    </AccountModalContext.Provider>
  );
}

function JoinGroupModalProvider({ children }) {
  const [joinGroupModal, setJoinGroupModal] = useState({
    open: false,
    group: null,
  });

  const pathname = usePathname();

  useEffect(() => {
    setJoinGroupModal({
      open: false,
      group: null,
    });
  }, [pathname]);

  return (
    <JoinGroupModalContext.Provider
      value={{
        joinGroupModal,
        setJoinGroupModal,
      }}
    >
      {children}
    </JoinGroupModalContext.Provider>
  );
}

function EditGroupModalProvider({ children }) {
  const [editGroupModal, setEditGroupModal] = useState({
    opened: false,
    group_id: null,
  });

  const pathname = usePathname();

  useEffect(() => {
    setEditGroupModal({
      opened: false,
      group_id: null,
    });
  }, [pathname]);

  return (
    <EditGroupModalContext.Provider
      value={{
        editGroupModal,
        setEditGroupModal,
      }}
    >
      {children}
    </EditGroupModalContext.Provider>
  );
}

function SubjectsModalProvider({ children }) {
  const [isSubjectsModal, setIsSubjectsModal] = useState({
    opened: false,
    subject_id: null,
  });

  const pathname = usePathname();

  useEffect(() => {
    setIsSubjectsModal({ opened: false, subject_id: null });
  }, [pathname]);

  return (
    <SubjectsModalContext.Provider
      value={{
        isSubjectsModal,
        setIsSubjectsModal,
      }}
    >
      {children}
    </SubjectsModalContext.Provider>
  );
}

function PlanModalProvider({ children }) {
  const [planModal, setPlanModal] = useState(DEFAULT_PLAN);

  const pathname = usePathname();

  useEffect(() => {
    setPlanModal(DEFAULT_PLAN);
  }, [pathname]);

  return (
    <PlanModalContext.Provider
      value={{
        planModal,
        setPlanModal,
      }}
    >
      {children}
    </PlanModalContext.Provider>
  );
}

function AddSubjectsModalProvider({ children }) {
  const [isAddSubjectModal, setIsAddSubjectModal] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsAddSubjectModal(false);
  }, [pathname]);

  return (
    <AddSubjectsModalContext.Provider
      value={{
        isAddSubjectModal,
        setIsAddSubjectModal,
      }}
    >
      {children}
    </AddSubjectsModalContext.Provider>
  );
}

function ChatModalProvider({ children }) {
  const [chatModal, setChatModal] = useState({
    chatroom_id: null,
    name: "",
    opened: false,
    totalNewMsg: 0,
  });

  /* useEffect(() => {
    setChatModal((prev) => ({ ...prev, chatroom_id: null, opened: false }));
  }, [pathname]); */

  return (
    <ChatModalContext.Provider
      value={{
        chatModal,
        setChatModal,
      }}
    >
      {children}
    </ChatModalContext.Provider>
  );
}

function SearchUsersModalProvider({ children }) {
  const [searchUsersModal, setSearchUsersModal] = useState({
    opened: false,
    onClick: null,
  });

  const pathname = usePathname();

  useEffect(() => {
    setSearchUsersModal({
      opened: false,
      onClick: null,
    });
  }, [pathname]);

  return (
    <SearchUsersModalContext.Provider
      value={{
        searchUsersModal,
        setSearchUsersModal,
      }}
    >
      {children}
    </SearchUsersModalContext.Provider>
  );
}

function WelcomeModalProvider({ children }) {
  const [isWelcomeModal, setIsWelcomeModal] = useState(false);

  return (
    <WelcomeModalContext.Provider value={{ isWelcomeModal, setIsWelcomeModal }}>
      {children}
    </WelcomeModalContext.Provider>
  );
}

export { AccountModalContext };
