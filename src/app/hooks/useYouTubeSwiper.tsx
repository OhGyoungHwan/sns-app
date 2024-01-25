"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import IconButton from "../components/atoms/IconButton";

export default function useYouTubeSwiper() {
  // 데이터
  const [youTubeIds, setYouTubeIds] = useState<string[]>([]);
  // 계산
  const filterUrls = (currentIdx: number) =>
    setYouTubeIds((pre) => [
      ...pre.filter((youTubeId, idx) => idx !== currentIdx),
    ]);

  const makeYouTubeSwiper = () => {
    return (
      <Swiper spaceBetween={8} slidesPerView={"auto"}>
        {youTubeIds.map((id, idx) => (
          <SwiperSlide
            className="flex relative swiper-auto"
            key={`${id}-${idx}`}
          >
            <Image
              width={160}
              height={90}
              alt={`${idx} 추가 영상`}
              src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
            />
            <div className="group absolute inset-0 hover:backdrop-brightness-50">
              <div className="absolute top-0 right-0 hidden group-hover:block bg-primary rounded-[100px]">
                <IconButton
                  iconName="close"
                  color="text-onPrimary"
                  onClickEvent={() => filterUrls(idx)}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  const addYouTubeSwiper = (url: string) => {
    let match =
      url.match(
        /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/
      ) ||
      url.match(
        /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/
      ) ||
      url.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);
    if (match && match[2].length === 11) {
      const youTubeId = match[2];
      setYouTubeIds((pre) => [...pre, youTubeId]);
    } else {
      alert("올바르지 않은 url입니다.");
    }
  };

  // 액션
  return { makeYouTubeSwiper, addYouTubeSwiper, youTubeIds };
}
