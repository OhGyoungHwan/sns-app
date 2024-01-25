"use client";
import { useEffect, useState } from "react";
import { throttle } from "lodash";

export default function useScrollEvent() {
  // 데이터
  const [isScrollUp, setIsScrollUp] = useState(true);
  // 계산
  // 액션
  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setIsScrollUp(scrollY > lastScrollY ? false : true);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      console.log("!!!!!");
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };
    const scrollFunc = throttle(onScroll, 500);

    window.addEventListener("scroll", scrollFunc);

    return () => window.removeEventListener("scroll", scrollFunc);
  }, [isScrollUp]);

  return { isScrollUp };
}
