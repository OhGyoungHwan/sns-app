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
  // 계산
  // 액션
  const onClickPrev = () => swiperRef.current?.swiper.slidePrev();
  const onClickNext = () => swiperRef.current?.swiper.slideNext();
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
    <Swiper
      id="SSRVideoSwiper"
      ref={swiperRef}
      pagination={{
        type: "fraction",
      }}
      modules={[Pagination]}
      className={`group relative aspect-video ${
        isRow ? "h-[calc(100vh-56px)]" : "w-[calc(100vw-32px)]"
      }`}
    >
      {slideElementList.map((element, idx) => (
        <SwiperSlide key={`YouTube-${idx}`}>{element}</SwiperSlide>
      ))}
      <div className="hidden group-hover:block absolute left-0 top-1/2 -translate-y-1/2 border-[2px] border-outline rounded-[100px] z-40">
        <IconButton iconName="arrow_back" onClickEvent={onClickPrev} />
      </div>
      <div className="hidden group-hover:block absolute right-0 top-1/2 -translate-y-1/2 border-[2px] border-outline rounded-[100px] z-40">
        <IconButton iconName="arrow_forward" onClickEvent={onClickNext} />
      </div>
    </Swiper>
  );
};
export default SSRVideoSwiper;
