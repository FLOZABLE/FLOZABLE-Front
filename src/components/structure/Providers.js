"use client";

import config from "@/utils/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalProviders from "./ModalProviders";
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
  return <ModalProviders>{children}</ModalProviders>;
}

/* function PlansProvider({ children }) {
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
 */
