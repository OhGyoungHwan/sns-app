"use client";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
export default function useIsView(
  viewCallBack?: () => void,
  unViewCallBack?: () => void
) {
  const [ref, isView] = useInView();
  useEffect(() => {
    if (isView) {
      viewCallBack && viewCallBack();
    } else {
      unViewCallBack && unViewCallBack();
    }
  }, [isView]);
  return { ref };
}
