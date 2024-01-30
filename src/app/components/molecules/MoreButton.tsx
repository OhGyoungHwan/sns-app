"use client";

import { useEffect, useRef, useState } from "react";
import IconButton from "../atoms/IconButton";

const MoreButton: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  // 데이터
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  // 계산
  // 액션
  const onClickButton = () => setIsOpen((pre) => !pre);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [buttonRef]);
  return (
    <div ref={buttonRef} className="relative">
      <IconButton iconName="more_vert" onClickEvent={onClickButton} />
      {isOpen && (
        <div className="absolute bottom-0 left-0 z-40 -translate-x-1/2 translate-y-full flex flex-col justify-center items-center gap-2 bg-surface p-2 rounded border border-outline">
          {element}
        </div>
      )}
    </div>
  );
};
export default MoreButton;
