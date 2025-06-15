import { postGroupLeave } from "@/apis/groupApi";
import { useAccount } from "@/hooks/accountHooks";
import { useGroups, useMyGroups } from "@/hooks/groupHook";
import { useRemoveSearchParams } from "@/hooks/otherHooks";
import {
  useGroupsUpdater,
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
  useMemo,
  useRef,
  useState,
} from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useDebounce } from "use-debounce";

import { useJoinGroupModal } from "../structure/ModalProviders";
import { AlertDialogWrapper } from "../ui/alert-dialog";
import MyGroupContainer from "./MyGroupContainer";

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

  const { groups } = useGroups();
  const { myGroups } = useMyGroups();
  const { account } = useAccount();

  const { setJoinGroupModal } = useJoinGroupModal();

  const [activeIndex, setActiveIndex] = useState(-1);

  const [debouncedIndex] = useDebounce(activeIndex, ACTIVE_GROUP_DEBOUNCE);

  const searchParams = useSearchParams();
  const studyGroupId = searchParams.get("study_group");

  const removeSearchParams = useRemoveSearchParams();

  const updateMyGroups = useMyGroupsUpdater();
  const updateGroups = useGroupsUpdater();

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

    const groupId = myGroups[debouncedIndex];
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
        (groupId) => groupId === swiperGroupId,
      );
      if (groupIndex === -1) return;
      myGroupsRef.current?.swiper.slideTo(groupIndex);
    }, 600);
  }, [myGroups?.length]);

  useEffect(() => {
    if (!studyGroupId || !myGroups?.length) return;
    setTimeout(() => {
      const groupIndex = myGroups.findIndex(
        (groupId) => groupId === studyGroupId,
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

    updateMyGroups((prev) => prev.filter((_groupId) => _groupId !== groupId));
    updateGroups((prev) => {
      const groupIndex = prev.findIndex((group) => group.group_id === groupId);
      if (groupIndex === -1) return prev;

      const newGroups = [...prev];
      newGroups[groupIndex] = {
        ...newGroups[groupIndex],
        members: newGroups[groupIndex].members.filter(
          (memberId) => memberId !== account?.user_id,
        ),
      };
      return newGroups;
    });
  }, [myGroups, confirmLeaveModal, account]);

  const myGroupsInfo = useMemo(() => {
    if (!groups) return [];
    if (!myGroups) return [];

    const groupMap = new Map(groups.map((g) => [g.group_id, g]));

    return myGroups
      .map((id) => groupMap.get(id))
      .filter((group): group is Group => group !== undefined);
  }, [groups, myGroups]);

  if (!myGroups?.length) {
    return (
      <div className="bg-background p-5 rounded-md">
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
          {myGroupsInfo.map((group, i) => {
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
