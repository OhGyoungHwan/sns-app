"use client";

import { useEffect, useState } from "react";

/*
    setIsOnLoading ture설정 시 로딩온, false설정 시 로딩오프
*/
export default function useLoading() {
  // 데이터
  const [isOnLoading, setIsOnLoading] = useState(false);
  const loadingElement =
    typeof window === "object" ? document.getElementById("loading") : null;
  // 계산
  const closeElement = (element: HTMLElement | null) =>
    element?.style.setProperty("display", "none");
  const openElement = (element: HTMLElement | null) =>
    element?.style.setProperty("display", "block");
  // 액션
  useEffect(() => {
    if (isOnLoading) {
      openElement(loadingElement);
    } else {
      closeElement(loadingElement);
    }
  }, [isOnLoading]);
  return { setIsOnLoading };
}
