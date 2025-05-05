import { useGroups } from "@/hooks/groupsHook";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import MyGroupContainer from "./MyGroupContainer";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { ACTIVE_GROUP_DEBOUNCE } from "@/utils/constants";
import { useAccount } from "@/hooks/accountHooks";
import { useJoinGroupModal } from "../structure/ModalProviders";
import socket from "@/utils/sockets/socket";
import mediaSocket from "@/utils/sockets/mediaSocket";

export default function MyGroupsViewer() {
  const myGroupsRef = useRef<SwiperRef>(null);

  const { myGroups } = useGroups();
  const { account } = useAccount();
  const { setJoinGroupModal } = useJoinGroupModal();

  const [activeIndex, setActiveIndex] = useState(-1);

  const [debouncedIndex] = useDebounce(activeIndex, ACTIVE_GROUP_DEBOUNCE);

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

    const group = myGroups[debouncedIndex];
    if (!group) return;

    localStorage.setItem("swiperGroupId", group.group_id);
    //only in study page
    //if (!window.location.href.includes("study")) return;

    socket.emit("group:change", group.group_id);
    mediaSocket.emit("group:change", group.group_id);

    return () => {
      socket.emit("group:change", null);
      mediaSocket.emit("group:change", null);
    };
  }, [debouncedIndex, myGroups?.length]);

  return (
    <div>
      {myGroups?.length ? (
        <Swiper
          className="h-[80vh] overflow-hidden"
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
          ref={myGroupsRef}
        >
          {myGroups.map((group, i) => {
            return (
              <SwiperSlide key={i} className="h-screen">
                <MyGroupContainer
                  group={group}
                  isActive={debouncedIndex === i}
                  isAdmin={group.leader === account?.user_id}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : null}
    </div>
  );
}
