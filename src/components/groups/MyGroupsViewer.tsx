import { useGroups } from "@/hooks/groupsHook";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MyGroupContainer from "./MyGroupContainer";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { ACTIVE_GROUP_DEBOUNCE } from "@/utils/constants";
import { useAccount } from "@/hooks/accountHooks";

export default function MyGroupsViewer() {
  const { myGroups } = useGroups();
  const { account, updateUserInfo } = useAccount();

  const [activeIndex, setActiveIndex] = useState(-1);

  const [debouncedIndex] = useDebounce(activeIndex, ACTIVE_GROUP_DEBOUNCE);

  return (
    <div className="h-screen overflow-hidden">
      {myGroups?.length ? (
        <Swiper
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
        >
          {myGroups.map((group, i) => {
            return (
              <SwiperSlide key={i}>
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
