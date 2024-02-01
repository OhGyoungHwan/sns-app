"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import IconButton from "../../atoms/IconButton";
import useScrollEvent from "@/app/hooks/useScrollEvent";
import useTimer from "@/app/hooks/useTimer";
import { useEffect, useState } from "react";
import useIsView from "@/app/hooks/useIsView";

const TopAppBar: React.FC<{ onClickMenu: () => void }> = ({ onClickMenu }) => {
  // 데이터
  const [isTop, setIsTop] = useState(true);
  const { data: session } = useSession();
  const { isScrollUp, setIsScrollUp } = useScrollEvent();
  const { onTimer } = useTimer(() => setIsScrollUp(false), 3000);
  // 계산
  const setIsTopTrue = () => setIsTop(true);
  const setIsTopFalse = () => setIsTop(false);
  // 액션
  const { ref } = useIsView(setIsTopTrue, setIsTopFalse);
  const onClickLeftButton = () => onClickMenu();
  const onClickRightButton = () =>
    session?.user ? signOut() : signIn("kakao");
  useEffect(() => {
    isScrollUp && onTimer();
  }, [isScrollUp]);

  return (
    <>
      <div
        className={`fixed z-50 flex flex-row justify-between items-center h-14 w-full bg-surface gap-1.5 px-1 py-2 border-b border-outlineVariant transition duration-300 ease-in-out ${
          isScrollUp || isTop ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col justify-center items-center h-12 w-12 gap-2.5">
          <IconButton iconName="menu" onClickEvent={onClickLeftButton} />
        </div>
        <Link href={"/"} className="text-[22px] text-center text-onSurface">
          유튭뭐봄
        </Link>
        <div className="flex flex-col justify-center items-center h-12 w-12 gap-2.5">
          <IconButton
            iconName={session?.user ? "logout" : "login"}
            onClickEvent={onClickRightButton}
          />
        </div>
      </div>
      <div ref={ref} id="topSpace" className="w-full absolute h-4 top-0 z-50" />
    </>
  );
};

export default TopAppBar;
