import {
  ChatModalState,
  JoinGroupModalState,
  PlanModalState,
} from "@/types/modalTypes";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// Helper type for context value
type ModalContextValue<State, StateName extends string> = {
  [K in StateName | `set${Capitalize<StateName>}`]: K extends StateName
    ? State
    : (value: State | ((prev: State) => State)) => void;
};

// Generic modal provider creator
export function createModalProvider<State, StateName extends string>(
  initialState: State,
  stateName: StateName,
  defaultResetOnPathChange = true,
) {
  type ContextValue = ModalContextValue<State, StateName>;
  const setStateName = `set${stateName[0].toUpperCase()}${stateName.slice(
    1,
  )}` as const;

  const Context = createContext<ContextValue>({
    [stateName]: initialState,
    [setStateName]: () => {},
  } as ContextValue);

  const Provider = ({
    children,
    resetOnPathChange = defaultResetOnPathChange,
  }: {
    children: ReactNode;
    resetOnPathChange?: boolean;
  }) => {
    const [state, setState] = useState<State>(initialState);
    const pathname = usePathname();

    useEffect(() => {
      if (resetOnPathChange) {
        setState(initialState);
      }
    }, [pathname, resetOnPathChange, initialState]);

    const value = useMemo(
      () => ({
        [stateName]: state,
        [setStateName]: setState,
      }),
      [state],
    ) as ContextValue;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useModalContext = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(
        `use${stateName}Context must be used within its provider`,
      );
    }
    return context;
  };

  // Export the custom hook for each modal
  const useModal = () => {
    const context = useModalContext();
    return context;
  };

  return {
    Context,
    Provider,
    useModal, // Export the hook here
  };
}

export const { Provider: AccountModalProvider, useModal: useAccountModal } =
  createModalProvider({ opened: false, isSignIn: true }, "accountModal");

export const { Provider: JoinGroupModalProvider, useModal: useJoinGroupModal } =
  createModalProvider<JoinGroupModalState, "joinGroupModal">(
    { opened: false, group_id: null, myGroupsSwiper: null },
    "joinGroupModal",
  );

export const {
  Provider: CreateGroupModalProvider,
  useModal: useCreateGroupModal,
} = createModalProvider(false, "createGroupModal");

export const { Provider: EditGroupModalProvider, useModal: useEditGroupModal } =
  createModalProvider({ opened: false, group_id: null }, "editGroupModal");

/* export const { Provider: SubjectsModalProvider, useModal: useSubjectsModal } =
  createModalProvider({ opened: false, subject_id: null }, "isSubjectsModal");
 */
export const {
  Provider: AddSubjectModalProvider,
  useModal: useAddSubjectModal,
} = createModalProvider({ opened: false }, "addSubjectModal");

export const { Provider: PlanModalProvider, useModal: usePlanModal } =
  createModalProvider<PlanModalState, "planModal">(
    {
      opened: false,
      plan_id: null,
      calendarApi: null,
      viewDate: new Date(new Date().setHours(0, 0, 0, 0)),
    },
    "planModal",
  );
export const { Provider: ChatModalProvider, useModal: useChatModal } =
  createModalProvider<ChatModalState, "chatModal">(
    { chatroom_id: null, name: "", opened: false, totalNewMsg: 0 },
    "chatModal",
    false,
  );
export const {
  Provider: SearchUsersModalProvider,
  useModal: useSearchUsersModal,
} = createModalProvider({ opened: false, onClick: null }, "searchUsersModal");
export const { Provider: WelcomeModalProvider, useModal: useWelcomeModal } =
  createModalProvider(false, "isWelcomeModal", false);

const MODAL_PROVIDERS = [
  AccountModalProvider,
  JoinGroupModalProvider,
  CreateGroupModalProvider,
  EditGroupModalProvider,
  //SubjectsModalProvider,
  AddSubjectModalProvider,
  PlanModalProvider,
  ChatModalProvider,
  SearchUsersModalProvider,
  WelcomeModalProvider,
];

export default function ModalProviders({ children }: { children: ReactNode }) {
  return MODAL_PROVIDERS.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children,
  );
}
