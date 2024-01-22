"use client";

import { signIn, useSession } from "next-auth/react";
import IconButton from "../../atoms/IconButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TopAppBar: React.FC = () => {
  // 데이터
  const { data: session } = useSession();
  const router = useRouter();
  // 계산

  // 액션
  const onClickButton = () =>
    session?.user ? router.push("/") : signIn("kakao");
  return (
    <div className="fixed flex justify-start items-center w-full h-14 gap-1.5 px-1 py-2 bg-surface z-50">
      <div className="flex flex-col justify-center items-center w-12 h-12 gap-2.5" />
      <Link
        href={"/"}
        className="flex-grow w-[244px] text-[22px] text-center text-onSurface"
      >
        동해 SNS
      </Link>
      <div className="flex flex-col justify-center items-center h-12 w-12 gap-2.5">
        <IconButton
          iconName={session?.user ? "face" : "login"}
          onClickEvent={onClickButton}
        />
      </div>
    </div>
  );
};

export default TopAppBar;
