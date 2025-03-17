import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_PLAN } from "@/utils/constants";

// Generic Modal Provider Component
function ModalProvider({
  children,
  context, // The context to provide
  initialState, // Initial state value
  stateName, // Name of the state variable (e.g., "joinGroupModal")
  setStateName, // Name of the setter function (e.g., "setJoinGroupModal")
  resetOnPathChange = true, // Optional flag to disable reset behavior
}) {
  const [state, setState] = useState(initialState);
  const pathname = usePathname();

  // Reset state to initial value when pathname changes
  useEffect(() => {
    if (resetOnPathChange) {
      setState(initialState);
    }
  }, [pathname, resetOnPathChange, initialState]);

  return (
    <context.Provider value={{ [stateName]: state, [setStateName]: setState }}>
      {children}
    </context.Provider>
  );
}

// Helper to create context and provider pair with default values
export function createModalProvider(initialState, stateName) {
  const setStateName = `set${
    stateName.charAt(0).toUpperCase() + stateName.slice(1)
  }`;

  // Create default context value with the initial state and a no-op setter
  const Context = createContext({
    [stateName]: initialState,
    [setStateName]: () => {}, // No-op function as default
  });

  const Provider = ({ children, resetOnPathChange }) => (
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

// AccountModalProvider
export const { Context: AccountModalContext, Provider: AccountModalProvider } =
  createModalProvider(false, "isAccountModal");

// JoinGroupModalProvider
export const {
  Context: JoinGroupModalContext,
  Provider: JoinGroupModalProvider,
} = createModalProvider({ open: false, group: null }, "joinGroupModal");

// CreateGroupModalProvider
export const {
  Context: CreateGroupModalContext,
  Provider: CreateGroupModalProvider,
} = createModalProvider(false, "createGroupModal");

// EditGroupModalProvider
export const {
  Context: EditGroupModalContext,
  Provider: EditGroupModalProvider,
} = createModalProvider({ opened: false, group_id: null }, "editGroupModal");

// SubjectsModalProvider
export const {
  Context: SubjectsModalContext,
  Provider: SubjectsModalProvider,
} = createModalProvider({ opened: false, subject_id: null }, "isSubjectsModal");

// PlanModalProvider
export const { Context: PlanModalContext, Provider: PlanModalProvider } =
  createModalProvider(
    DEFAULT_PLAN, // Assuming DEFAULT_PLAN is defined elsewhere
    "planModal"
  );

// AddSubjectsModalProvider
export const {
  Context: AddSubjectsModalContext,
  Provider: AddSubjectsModalProvider,
} = createModalProvider(false, "isAddSubjectModal");

// ChatModalProvider (no reset on path change)
export const { Context: ChatModalContext, Provider: ChatModalProvider } =
  createModalProvider(
    { chatroom_id: null, name: "", opened: false, totalNewMsg: 0 },
    "chatModal",
    { resetOnPathChange: false } // Disable reset since useEffect was commented out
  );

// SearchUsersModalProvider
export const {
  Context: SearchUsersModalContext,
  Provider: SearchUsersModalProvider,
} = createModalProvider({ opened: false, onClick: null }, "searchUsersModal");

// WelcomeModalProvider (no reset on path change)
export const { Context: WelcomeModalContext, Provider: WelcomeModalProvider } =
  createModalProvider(
    false,
    "isWelcomeModal",
    { resetOnPathChange: false } // Disable reset since no useEffect was present
  );

export default function ModalProviders({ children }) {
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
