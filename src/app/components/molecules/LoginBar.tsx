"use client";

import { signIn } from "next-auth/react";

const LoginBar: React.FC<{ text: string }> = ({ text }) => {
  const onClickButton = () => signIn("kakao");
  return (
    <div className="flex flex-row justify-center gap-1 px-1 py-1 w-full h-[56px] rounded-sm border border-outline">
      <button
        className="grow textBodyLarge text-center text-onSurface bg-surface"
        onClick={onClickButton}
      >
        {text}
      </button>
    </div>
  );
};
export default LoginBar;
