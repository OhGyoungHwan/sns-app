"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import IconButton from "../../atoms/IconButton";
import useScrollEvent from "@/app/hooks/useScrollEvent";

const TopAppBar: React.FC<{ onClickMenu: () => void }> = ({ onClickMenu }) => {
  // 데이터
  const { data: session } = useSession();
  const { isScrollUp } = useScrollEvent();
  // 계산

  // 액션
  const onClickLeftButton = () => onClickMenu();
  const onClickRightButton = () =>
    session?.user ? signOut() : signIn("kakao");

  return (
    <div
      className={`fixed z-50 flex flex-row justify-between items-center h-14 w-full bg-surface gap-1.5 px-1 py-2 border-b border-outlineVariant transition duration-300 ease-in-out ${
        isScrollUp ? "translate-y-0" : "-translate-y-full"
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
  );
};

export default TopAppBar;
