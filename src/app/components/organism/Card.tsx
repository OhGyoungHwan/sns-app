"use client";
import { useSession } from "next-auth/react";
import Monogram from "../atoms/Monogram";
import { IPost } from "@/app/api/post/route";
import Image from "next/image";
import { category2iconName } from "@/app/lib/const";
import Link from "next/link";

const Card: React.FC<{ post: IPost }> = ({ post }) => {
  // 데이터
  const youTubeId = post.videoId.split("/")[0];
  // 계산
  // 액션
  return (
    <Link
      href={`/post/${post.id}`}
      className="flex justify-start items-center self-stretch overflow-hidden gap-4 pr-4 border border-outline rounded-xl"
    >
      <Image
        alt={`${post.title} 대표 이미지`}
        width={160}
        height={90}
        src={`https://img.youtube.com/vi/${youTubeId}/mqdefault.jpg`}
      />
      <div className="flex justify-start items-center flex-grow relative gap-4">
        <div className="flex flex-row justify-start items-center flex-grow relative gap-1">
          <span className="text-onSurface material-symbols-outlined mr-2">
            {category2iconName[post.category]}
          </span>
          <h4 className="self-stretch w-full textTitleMedium text-left text-onSurface truncate">
            {post.title}
          </h4>
        </div>
        <Monogram name={post.author?.name || "익명"} />
      </div>
    </Link>
  );
};
export default Card;
