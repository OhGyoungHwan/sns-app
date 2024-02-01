"use client";

import { useEffect, useState } from "react";

/*
    delay 이후 callback 실행
    return: onTimer 타이머를 실행하는 함수
*/
export default function useTimer(callBack: () => void, delay: number) {
  // 데이터
  const [isOnTimer, setIsOnTimer] = useState(false);
  // 계산
  // 액션
  const onTimer = () => setIsOnTimer(true);
  const offTimer = () => setIsOnTimer(false);
  useEffect(() => {
    if (isOnTimer) {
      setTimeout(() => {
        callBack(), offTimer();
      }, delay);
    } else {
    }
  }, [isOnTimer]);
  return { onTimer };
}
