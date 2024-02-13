"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const AccessDenied: React.FC = () => {
  // 데이터
  const { data: session } = useSession();
  // 계산
  // 액션
  const onClickLoginButton = () => signIn("kakao");
  return (
    <article className="w-full max-w-[840px] mx-auto absolute inset-0 flex flex-col items-center justify-center gap-4">
      <h1 className="textHeadlineMedium text-onSurface">
        {session ? "권한 오류" : "로그인 필요"}
      </h1>
      {session ? (
        <Link href={"/"}>돌아가기</Link>
      ) : (
        <button
          className="textBodyMedium text-onSurfaceVariant"
          onClick={onClickLoginButton}
        >
          로그인
        </button>
      )}
    </article>
  );
};
export default AccessDenied;
