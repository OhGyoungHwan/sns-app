"use client";
import { ReactNode } from "react";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Swiper({
  SwiperSlideList,
}: {
  SwiperSlideList: ReactNode[];
}) {
  return (
    <SwiperReact
      spaceBetween={0}
      slidesPerView={"auto"}
      className="w-full border-b border-outline"
    >
      {SwiperSlideList.map((el, idx) => (
        <SwiperSlide key={`${idx}SwiperSlide`}>{el}</SwiperSlide>
      ))}
    </SwiperReact>
  );
}
