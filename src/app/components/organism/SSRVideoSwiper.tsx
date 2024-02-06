"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import IconButton from "../atoms/IconButton";
import "swiper/css";
import "swiper/css/pagination";

const SSRVideoSwiper: React.FC<{ slideElementList: React.ReactNode[] }> = ({
  slideElementList,
}) => {
  // 데이터
  const [isRow, setIsRow] = useState(false);
  const swiperRef = useRef<SwiperRef>(null);
  const youtubeIframe =
    typeof window === "object"
      ? (document.getElementsByClassName(
          "youtube-iframe"
        ) as HTMLCollectionOf<HTMLIFrameElement>)
      : null;
  // 계산
  const pauseYoutubeIframe = (
    elements: HTMLCollectionOf<HTMLIFrameElement> | null
  ) =>
    elements &&
    Array.from(elements).map((element) =>
      element.contentWindow?.postMessage(
        '{"event":"command","func":"' + "pauseVideo" + '","args":""}',
        "*"
      )
    );
  // 액션
  const onClickPrev = () => (
    swiperRef.current?.swiper.slidePrev(), pauseYoutubeIframe(youtubeIframe)
  );
  const onClickNext = () => (
    swiperRef.current?.swiper.slideNext(), pauseYoutubeIframe(youtubeIframe)
  );
  useEffect(() => {
    const resizeListener = () => {
      if ((window.innerWidth - 32) / 16 > (window.innerHeight - 56) / 9) {
        setIsRow(true);
      } else {
        setIsRow(false);
      }
    };
    window.addEventListener("resize", resizeListener);
  });
  useEffect(() => {
    (window.innerWidth - 32) / 16 > (window.innerHeight - 56) / 9
      ? setIsRow(true)
      : setIsRow(false);
  }, []);
  return (
    <>
      <Swiper
        id="SSRVideoSwiper"
        ref={swiperRef}
        pagination={{
          type: "custom",
          renderCustom: function (swiper, current, total) {
            return `${total}개 중 ${current}번째 Youtube`;
          },
        }}
        modules={[Pagination]}
        className={`z-30 group aspect-video mt-[58px] ${
          isRow ? "h-[100vh]" : "w-[96vw]"
        }`}
        style={{ position: "absolute" }}
      >
        {slideElementList.map((element, idx) => (
          <SwiperSlide key={`YouTube-${idx}`}>{element}</SwiperSlide>
        ))}
        <div className="hidden group-hover:block absolute left-0 top-1/2 -translate-y-1/2 border-[2px] border-outline rounded-[100px] z-40 shadow-md">
          <IconButton
            iconName="arrow_back"
            color="text-primary"
            onClickEvent={onClickPrev}
          />
        </div>
        <div className="hidden group-hover:block absolute right-0 top-1/2 -translate-y-1/2 border-[2px] border-outline rounded-[100px] z-40 shadow-md">
          <IconButton
            iconName="arrow_forward"
            color="text-primary"
            onClickEvent={onClickNext}
          />
        </div>
      </Swiper>
      <div className={`aspect-video ${isRow ? "h-[100vh]" : "w-[96vw]"}`} />
    </>
  );
};
export default SSRVideoSwiper;
