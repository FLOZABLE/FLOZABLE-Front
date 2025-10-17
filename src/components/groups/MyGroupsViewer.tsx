import { postGroupLeave } from "@/apis/groupApi";
import { useAccount } from "@/hooks/accountHooks";
import { useMyGroups } from "@/hooks/groupHooks";
import { useRemoveSearchParams } from "@/hooks/otherHooks";
import { useChatroomsUpdater } from "@/hooks/updaters/chatUpdaters";
import {
  useGroupUpdater,
  useMyGroupsUpdater,
} from "@/hooks/updaters/groupUpdaters";
import { ACTIVE_GROUP_DEBOUNCE } from "@/lib/constants";
import mediaSocket from "@/lib/sockets/mediaSocket";
import socket from "@/lib/sockets/socket";
import { cn } from "@/lib/utils";
import { Group } from "@/types/groupTypes";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useDebounce } from "use-debounce";

import { useChatModal, useJoinGroupModal } from "../structure/ModalProviders";
import { AlertDialogWrapper } from "../ui/alert-dialog";
import MyGroupContainer from "./MyGroupContainer";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface MyGroupsViewerProps extends ComponentProps<"div"> {
  swiperClassName?: ComponentProps<"div">["className"];
}

export type setConfirmLeaveModalType = {
  open: boolean;
  group: Group | null;
};

export default function MyGroupsViewer({
  swiperClassName,
  ...props
}: MyGroupsViewerProps) {
  const myGroupsRef = useRef<SwiperRef>(null);

  const pathname = usePathname();

  const { myGroups } = useMyGroups();
  const { account } = useAccount();

  const { setJoinGroupModal } = useJoinGroupModal();
  const { setChatModal } = useChatModal();

  const [activeIndex, setActiveIndex] = useState(-1);

  const [debouncedIndex] = useDebounce(activeIndex, ACTIVE_GROUP_DEBOUNCE);

  const searchParams = useSearchParams();
  const studyGroupId = searchParams.get("study_group");

  const removeSearchParams = useRemoveSearchParams();

  const updateMyGroups = useMyGroupsUpdater();
  const updateGroup = useGroupUpdater();
  const updateChatrooms = useChatroomsUpdater();

  const [confirmLeaveModal, setConfirmLeaveModal] =
    useState<setConfirmLeaveModalType>({
      open: false,
      group: null,
    });

  useEffect(() => {
    if (!myGroupsRef.current?.swiper) return;

    setJoinGroupModal((prev) => ({
      ...prev,
      myGroupsSwiper: myGroupsRef.current && myGroupsRef.current.swiper,
    }));

    return () => {
      setJoinGroupModal((prev) => ({
        ...prev,
        myGroupsSwiper: null,
      }));
    };
  }, [!!myGroups?.length]);

  useEffect(() => {
    if (debouncedIndex === -1 || !myGroups) return;

    const groupId = myGroups[debouncedIndex]?.group_id;
    if (!groupId) return;

    localStorage.setItem("swiperGroupId", groupId);
    //only in study page
    //if (!window.location.href.includes("study")) return;

    socket.emit("group:change", groupId);
    mediaSocket.emit("group:change", groupId);

    return () => {
      socket.emit("group:change", null);
      mediaSocket.emit("group:change", null);
    };
  }, [debouncedIndex, !!myGroups?.length]);

  useEffect(() => {
    const swiperGroupId = localStorage.getItem("swiperGroupId");
    setTimeout(() => {
      if (!swiperGroupId || !myGroups?.length) return;
      localStorage.removeItem("swiperGroupId");

      const groupIndex = myGroups.findIndex(
        (group) => group.group_id === swiperGroupId,
      );
      if (groupIndex === -1) return;
      myGroupsRef.current?.swiper.slideTo(groupIndex);
    }, 600);
  }, [myGroups?.length]);

  useEffect(() => {
    if (!studyGroupId || !myGroups?.length) return;
    setTimeout(() => {
      const groupIndex = myGroups.findIndex(
        (group) => group.group_id === studyGroupId,
      );
      if (groupIndex === -1) return;
      myGroupsRef.current?.swiper.slideTo(groupIndex);
    }, 1000);
    removeSearchParams("study_group");
  }, [studyGroupId, myGroups?.length]);

  const leaveGroup = useCallback(async () => {
    const groupId = confirmLeaveModal.group?.group_id;
    if (!groupId) return;

    const response = await postGroupLeave(groupId);
    if (!response.success) return;

    updateMyGroups((prev) =>
      prev.filter((group) => group.group_id !== groupId),
    );
    updateGroup(groupId, (prev) => {
      return {
        ...prev,
        members: prev.members.filter(
          (memberId) => memberId !== account?.user_id,
        ),
      };
    });

    updateChatrooms((prev) => {
      const chatroomIndex = prev.findIndex(
        (chatroom) => chatroom.group_id === groupId,
      );

      if (chatroomIndex === -1) return prev;

      setChatModal((prevModal) => {
        console.log(prevModal, prev, prev[chatroomIndex]);
        if (prevModal.chatroom_id === prev[chatroomIndex]?.chatroom_id) {
          return { ...prevModal, chatroom_id: null };
        } else {
          return prevModal;
        }
      });

      prev.splice(chatroomIndex, 1);
      return prev;
    });
  }, [myGroups, confirmLeaveModal, account]);

  if (!myGroups?.length) {
    return (
      <div className="bg-background p-5 rounded-md h-[80vh] items-center justify-center flex">
        <h3>{"You haven't joined any groups yet!"}</h3>
        {pathname !== "/dashboard/groups" && (
          <Link href={"/dashboard/groups"} className="underline">
            Click here to join groups!
          </Link>
        )}
      </div>
    );
  }

  return (
    <div {...props}>
      <AlertDialogWrapper
        open={confirmLeaveModal.open}
        onOpenChange={(open) => {
          setConfirmLeaveModal((prev) => ({ ...prev, open }));
        }}
        onContinue={leaveGroup}
        description={
          "This action cannot be undone. You will be removed from the study group."
        }
      />
      {myGroups?.length ? (
        <Swiper
          className={cn("h-[80vh] overflow-hidden", swiperClassName)}
          id="myGroupsViewer"
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          onSnapIndexChange={(swiperCore) => {
            const { realIndex } = swiperCore;
            setActiveIndex(realIndex);
          }}
          ref={myGroupsRef}>
          {myGroups.map((group, i) => {
            return (
              <SwiperSlide key={i} className="h-screen">
                <MyGroupContainer
                  setConfirmLeaveModal={setConfirmLeaveModal}
                  group={group}
                  isActive={debouncedIndex === i}
                  isAdmin={group.leader === account?.user_id}
                  isStudy={pathname === "/dashboard/study"}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : null}
    </div>
  );
}
