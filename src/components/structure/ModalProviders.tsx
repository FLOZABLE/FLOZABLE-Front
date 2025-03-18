import { createContext, useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_PLAN } from "@/utils/constants";

// Define the type for ModalProvider props generically
interface ModalProviderProps<S> {
  children: ReactNode;
  context: React.Context<any>; // Temporarily any, refined later
  initialState: S;
  stateName: string;
  setStateName: string;
  resetOnPathChange?: boolean;
}

// Generic Modal Provider Component
function ModalProvider<S>({
  children,
  context,
  initialState,
  stateName,
  setStateName,
  resetOnPathChange = true,
}: ModalProviderProps<S>) {
  const [state, setState] = useState<S>(initialState);
  const pathname = usePathname();

  useEffect(() => {
    if (resetOnPathChange) {
      setState(initialState);
    }
  }, [pathname, resetOnPathChange, initialState]);

  const value = { [stateName]: state, [setStateName]: setState };
  return <context.Provider value={value}>{children}</context.Provider>;
}

// Define a generic type for the context value
type ModalContextValue<S> = {
  [key: string]: S | (() => void);
};

// Helper function to create typed context and provider
export function createModalProvider<S>(
  initialState: S,
  stateName: string,
  defaultResetOnPathChange: boolean = true
): {
  Context: React.Context<ModalContextValue<S>>;
  Provider: React.FC<{ children: ReactNode; resetOnPathChange?: boolean }>;
} {
  const setStateName = `set${
    stateName.charAt(0).toUpperCase() + stateName.slice(1)
  }`;

  const Context = createContext<ModalContextValue<S>>({
    [stateName]: initialState,
    [setStateName]: () => {},
  });

  const Provider: React.FC<{
    children: ReactNode;
    resetOnPathChange?: boolean;
  }> = ({ children, resetOnPathChange = defaultResetOnPathChange }) => (
    <ModalProvider
      context={Context}
      initialState={initialState}
      stateName={stateName}
      setStateName={setStateName}
      resetOnPathChange={resetOnPathChange}
    >
      {children}
    </ModalProvider>
  );

  return { Context, Provider };
}

// **AccountModal**
export const { Context: AccountModalContext, Provider: AccountModalProvider } =
  createModalProvider<boolean>(false, "isAccountModal");

// **JoinGroupModal**
type JoinGroupModalState = { open: boolean; group: string | null };
export const {
  Context: JoinGroupModalContext,
  Provider: JoinGroupModalProvider,
} = createModalProvider<JoinGroupModalState>(
  { open: false, group: null },
  "joinGroupModal"
);

// **CreateGroupModal**
export const {
  Context: CreateGroupModalContext,
  Provider: CreateGroupModalProvider,
} = createModalProvider<boolean>(false, "createGroupModal");

// **EditGroupModal**
type EditGroupModalState = { opened: boolean; group_id: string | null };
export const {
  Context: EditGroupModalContext,
  Provider: EditGroupModalProvider,
} = createModalProvider<EditGroupModalState>(
  { opened: false, group_id: null },
  "editGroupModal"
);

// **SubjectsModal**
type SubjectsModalState = { opened: boolean; subject_id: string | null };
export const {
  Context: SubjectsModalContext,
  Provider: SubjectsModalProvider,
} = createModalProvider<SubjectsModalState>(
  { opened: false, subject_id: null },
  "isSubjectsModal"
);

// **PlanModal**
type PlanModalState = typeof DEFAULT_PLAN; // Replace with actual type if known
export const { Context: PlanModalContext, Provider: PlanModalProvider } =
  createModalProvider<PlanModalState>(DEFAULT_PLAN, "planModal");

// **AddSubjectsModal**
export const {
  Context: AddSubjectsModalContext,
  Provider: AddSubjectsModalProvider,
} = createModalProvider<boolean>(false, "isAddSubjectModal");

// **ChatModal** (no reset on path change)
type ChatModalState = {
  chatroom_id: string | null;
  name: string;
  opened: boolean;
  totalNewMsg: number;
};
export const { Context: ChatModalContext, Provider: ChatModalProvider } =
  createModalProvider<ChatModalState>(
    { chatroom_id: null, name: "", opened: false, totalNewMsg: 0 },
    "chatModal",
    false
  );

// **SearchUsersModal**
type SearchUsersModalState = { opened: boolean; onClick: (() => void) | null };
export const {
  Context: SearchUsersModalContext,
  Provider: SearchUsersModalProvider,
} = createModalProvider<SearchUsersModalState>(
  { opened: false, onClick: null },
  "searchUsersModal"
);

// **WelcomeModal** (no reset on path change)
export const { Context: WelcomeModalContext, Provider: WelcomeModalProvider } =
  createModalProvider<boolean>(false, "isWelcomeModal", false);

// Compose all providers
export default function ModalProviders({ children }: { children: ReactNode }) {
  return (
    <AccountModalProvider>
      <JoinGroupModalProvider>
        <CreateGroupModalProvider>
          <EditGroupModalProvider>
            <SubjectsModalProvider>
              <PlanModalProvider>
                <AddSubjectsModalProvider>
                  <ChatModalProvider>
                    <SearchUsersModalProvider>
                      <WelcomeModalProvider>{children}</WelcomeModalProvider>
                    </SearchUsersModalProvider>
                  </ChatModalProvider>
                </AddSubjectsModalProvider>
              </PlanModalProvider>
            </SubjectsModalProvider>
          </EditGroupModalProvider>
        </CreateGroupModalProvider>
      </JoinGroupModalProvider>
    </AccountModalProvider>
  );
}
