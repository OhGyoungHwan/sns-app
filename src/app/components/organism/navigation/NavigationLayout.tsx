"use client";
import { useState } from "react";
import NavigationRail from "./NavigationRail";
import TopAppBar from "./TopAppBar";
import useModal from "@/app/hooks/useModal";

const NavigationLayout: React.FC = () => {
  //   데이터
  const [isRail, setIsRail] = useState(false);
  const { modalRef, openModal } = useModal(() => setIsRail(false));
  // 계산
  // 액션
  const onClickMenu = () => (setIsRail((pre) => !pre), openModal());
  return (
    <>
      <TopAppBar onClickMenu={onClickMenu} />
      <NavigationRail modalRef={modalRef} isRail={isRail} />
    </>
  );
};
export default NavigationLayout;
