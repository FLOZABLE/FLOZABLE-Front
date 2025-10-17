import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface AppTrialProps {
  initialSlide?: number;
}

export default function AppTrial({ initialSlide = 0 }: AppTrialProps) {
  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        loop={true}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000 }}
        initialSlide={initialSlide}
        allowTouchMove={true}
        className="w-52 h-[27.5rem] rounded-3xl relative">
        {["home", "leaderboard", "friends", "user", "groups", "study"].map(
          (name) => (
            <SwiperSlide key={name}>
              <Image
                src={`/img/mobile/swiper/${name}.png`}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  backgroundColor: "pink",
                }}
                alt={`background-${name}`}
              />
            </SwiperSlide>
          ),
        )}
      </Swiper>
      <div className="absolute top-[-0.5rem] left-1/2 transform -translate-x-1/2 w-56 h-[28rem] z-10 pointer-events-none">
        <Image
          src="/img/mobile/phone-frame.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt="frame"
        />
      </div>
    </div>
  );
}
