"use client";
import { navigationData } from "@/app/lib/const";
import FAB from "../../atoms/FAB";
import IconButton from "../../atoms/IconButton";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { RefObject } from "react";

const NavigationRail: React.FC<{
  isRail: boolean;
  modalRef: RefObject<HTMLDivElement>;
}> = ({ isRail, modalRef }) => {
  // 데이터
  const router = useRouter();
  const pathName = usePathname().split("/")[1];

  // 계산
  const labelIconColor = (url: string) =>
    pathName == url
      ? "text-onSecondaryContainer group-hover:"
      : "text-onSurfaceVariant group-hover:";
  const labelIconBGColor = (url: string) =>
    pathName == url ? "bg-secondaryContainer" : "bg-surface";

  // 액션
  const onClickFAB = () => router.push("/write");

  return (
    <div
      ref={modalRef}
      className={`${
        isRail ? "" : "-translate-x-full"
      } transition duration-150 ease-in-out fixed z-50 left-0 flex flex-col justify-start items-start min-h-screen w-20 overflow-hidden gap-10 pt-14 pb-14 bg-surface`}
    >
      {/* FAB */}
      <div className="flex flex-col justify-start items-center w-20 gap-1">
        <FAB iconName="post_add" onClientEvent={onClickFAB} />
      </div>
      {/* Label */}
      <div className="flex flex-col justify-center items-center w-20 overflow-hidden gap-4 p-[5px] rounded-[5px] bg-surface">
        {navigationData.map((data) => (
          <Link
            href={`/${data.url}`}
            key={data.name}
            className="group flex flex-col justify-start items-center self-stretch h-14 relative gap-0.5"
            prefetch={false}
          >
            <div
              className={`px-1 rounded-[100px] relative overflow-hidden ${labelIconBGColor(
                data.url
              )}`}
            >
              <IconButton
                iconName={data.iconName}
                color={labelIconColor(data.url)}
                onClickEvent={onClickFAB}
              />
              <div className="absolute inset-0 bg-onSurface opacity-0 group-hover:opacity-[0.08]" />
            </div>
            <p
              className={`self-stretch w-[70px] textLabelMediumProminent text-center ${labelIconColor(
                data.url
              )}`}
            >
              {data.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default NavigationRail;
