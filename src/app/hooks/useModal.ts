"use client";

import React, { useEffect, useRef } from "react";

export default function useModal(closeCallback?: () => void) {
  // 데이터
  const modalRef = useRef<HTMLDivElement>(null);
  const modalElement =
    typeof window === "object" ? document.getElementById("modal") : null;
  // 계산
  const closeModal = () => modalElement?.style.setProperty("display", "none");
  const openModal = () => modalElement?.style.setProperty("display", "block");
  //   액션
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
        closeCallback && closeCallback();
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [modalRef]);
  return { modalRef, openModal };
}
