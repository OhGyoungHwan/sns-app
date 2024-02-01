"use client";

import React, { useEffect, useRef } from "react";

export default function useModal(closeCallback?: () => void) {
  // 데이터
  const modalRef = useRef<HTMLDivElement>(null);
  const modalElement =
    typeof window === "object" ? document.getElementById("modal") : null;
  // 계산
  const closeElement = (element: HTMLElement | null) =>
    element?.style.setProperty("display", "none");
  const openElement = (element: HTMLElement | null) =>
    element?.style.setProperty("display", "block");
  //   액션
  const openModal = () => openElement(modalElement);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeElement(modalElement);
        closeCallback && closeCallback();
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [modalRef]);
  return { modalRef, openModal };
}
