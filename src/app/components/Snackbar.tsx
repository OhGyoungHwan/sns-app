import Image from "next/image";

export default function Snackbar() {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-start items-center w-[328px] pl-4 py-2.5 rounded bg-onSurface">
      <p className="flex-grow h-10 text-sm text-left text-inverseOnSurface leading-[38px] basis-[248px]">
        <span className="flex-grow w-[204px] h-10 text-sm text-left text-inverseOnSurface">
          로그인 후 이용가능 한 서비스 입니다.
        </span>
      </p>
      <div className="flex flex-col justify-center items-center h-12 w-12 gap-2.5 basis-[48px]">
        <div className="flex justify-center items-center overflow-hidden gap-2.5 rounded-[100px]">
          <div className="flex justify-center items-center relative gap-2.5 p-2">
            <span className="text-inverseOnSurface material-symbols-outlined">
              close
            </span>
          </div>
        </div>
      </div>
      <Image
        alt="카카오 로그인 작은사이즈"
        width={60}
        height={30}
        src="/kakao_login_small.png"
        className="object-cover"
      />
    </div>
  );
}
