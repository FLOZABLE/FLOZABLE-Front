import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { fadeIn } from "@/components/animations/variants";
import AvatarWrapper from "@/components/ui/avatar";

const reviews = [
  {
    name: "Jason Lee",
    description: "Future Zuck",
    review: `
      "FLOZABLE is a total game-changer for studying! I can finally
      connect with my friends and study together, even when we're not
      in the same place. It's like having a virtual study group that
      actually keeps me focused and motivated."
    `,
    imageSrc: "/img/main/testimonial-1.jpg",
  },
  {
    name: "Cameron Jiang",
    description: "Stanford Student",
    review: `
      "OMG, FLOZABLE is my new study BFF! The AI study suggestions are
      surprisingly helpful, and the timer keeps me on track without
      feeling too strict. Plus, the study icon is super cute and makes
      studying feel a little less boring."
    `,
    imageSrc: "/img/main/testimonial-2.jpg",
  },
  {
    name: "Kunlin Zheng",
    description: "TFT Player",
    review: `
      "FLOZABLE is a lifesaver during exams! The study planner helps
      me stay organized and on top of my assignments, while the chat
      feature lets me get quick answers to my questions. It's like
      having a study support group right in my pocket!"
    `,
    imageSrc: "/img/main/testimonial-3.jpg",
  },
  {
    name: "Jinting Jing",
    description: "Chinese",
    review: `
      "I can't get enough of FLOZABLE's YouTube background feature! I
      love setting up my study sessions with my favorite study
      playlists in the background. It's such a vibe and helps me stay
      in the zone."
    `,
    imageSrc: "/img/main/testimonial-4.jpg",
  },
  {
    name: "Zihang Yu",
    description: "Academic Weapon",
    review: `
      "FLOZABLE's YouTube background feature is a game-changer! I can
      play my go-to focus playlists while working, and it keeps me
      productive and in the flow."
    `,
    imageSrc: "/img/main/testimonial-5.jpg",
  },
  {
    name: "Changhoe Choe",
    description: "BLM activist",
    review: `
      "This app makes George Floyd breathe."
    `,
    imageSrc: "/img/main/testimonial-6.jpg",
  },
  {
    name: "Xinzhou Song",
    description: "MIT Quantum Researcher",
    review: `
      "I would marry FLOZABLE if I could! 😉 I can now lock in and feel rewarded for my weeklong research sessions!"
    `,
    imageSrc: "/img/main/testimonial-7.jpg",
  },
];

export default function ReviewsSection() {
  const reviewsRef = useRef<SwiperRef>(null);

  const handleReviewPrev = useCallback(() => {
    if (!reviewsRef.current) return;

    reviewsRef.current.swiper.autoplay.stop();
    const isWorked = reviewsRef.current.swiper.slidePrev(500);
    if (isWorked) return;

    const index = reviewsRef.current.swiper.realIndex - 1;
    reviewsRef.current.swiper.slideToLoop(index, 500);
  }, []);

  const handleReviewNext = useCallback(() => {
    if (!reviewsRef.current) return;

    reviewsRef.current.swiper.autoplay.stop();
    const isWorked = reviewsRef.current.swiper.slideNext(500);
    if (isWorked) return;

    const index = reviewsRef.current.swiper.realIndex + 1;
    reviewsRef.current.swiper.slideToLoop(index, 500);
  }, []);

  return (
    <section className="section-container">
      <motion.div
        className="overflow-x-hidden overflow-y-auto"
        {...fadeIn({ once: true })}
      >
        <div className="text-center">
          <h1 className="heading-lg">What Our Clients Say!</h1>
        </div>

        <div className="absolute -top-20" id="reviews" />
        <Swiper
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay]}
          speed={5000}
          autoplay={{ delay: 0, disableOnInteraction: true }}
          ref={reviewsRef}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            // when window width is >= 769
            769: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i} className="mb-1 !h-auto">
                <Card className="h-full">
                  <CardHeader>
                    <AvatarWrapper
                      src={`/img/main/testimonial-${i + 1}.jpg`}
                      name={review.name}
                    />
                    <CardTitle>{review.name}</CardTitle>
                    <CardDescription>{review.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="h-full">
                    <p>{review.review}</p>
                  </CardContent>
                  <CardFooter>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} fill="#FDDA0D" strokeWidth={0} />
                    ))}
                  </CardFooter>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="flex justify-center gap-2 mt-5">
          <Button onClick={handleReviewPrev}>
            <ChevronLeft />
          </Button>
          <Button onClick={handleReviewNext}>
            <ChevronRight />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
