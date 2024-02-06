"use client";
import Monogram from "../atoms/Monogram";
import Image from "next/image";
import { category2iconName } from "@/app/lib/const";
import Link from "next/link";
import { IPost } from "@/app/types/type";

const Card: React.FC<{ post: IPost }> = ({ post }) => {
  // 데이터
  const youTubeId = post.videoId.split("/")[0];
  // 계산
  // 액션
  return (
    <Link
      href={`/post/${post.id}`}
      className="flex justify-start items-center self-stretch overflow-hidden gap-4 pr-4 border border-outline rounded-xl"
      prefetch={false}
      scroll={false}
    >
      <Image
        alt={`${post.title} 대표 이미지`}
        width={160}
        height={90}
        src={`https://img.youtube.com/vi/${youTubeId}/mqdefault.jpg`}
      />
      <div className="flex flex-row justify-start items-center relative gap-1 grow truncate">
        <span className="text-onSurface material-symbols-outlined mr-2">
          {category2iconName[post.category]}
        </span>
        <div className="self-stretch w-full truncate">
          <h4 className="textTitleMedium text-left text-onSurface truncate">
            {post.title}
          </h4>
          <p className="w-full flex flex-row gap-2 text-outlineVariant textLabelMediumProminent">
            <span className="flex flex-row items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                visibility
              </span>
              {post.view}
            </span>
            <span className="flex flex-row items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                favorite
              </span>
              {post.like}
            </span>
          </p>
        </div>
      </div>
      <div>
        <Monogram name={post.user?.name || "익명"} />
      </div>
    </Link>
  );
};
export default Card;
