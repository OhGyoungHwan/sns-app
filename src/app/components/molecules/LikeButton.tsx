"use client";

import { useSession } from "next-auth/react";
import IconButton from "../atoms/IconButton";
import useSubmit from "@/app/hooks/useSubmit";
import { useEffect, useState } from "react";
import { ILike } from "@/app/api/like/[postId]/route";

async function getLike(postId: string) {
  const res = await fetch(`/api/like/${postId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const LikeButton: React.FC<{ postId: string }> = ({ postId }) => {
  // 데이터
  const [isLike, setIsLike] = useState(false);
  const { data: session } = useSession();
  const { submitData: submitDataLike } = useSubmit(
    `/api/like/${postId}`,
    "POST",
    `/post/${postId}`
  );
  const { submitData: submitDataUnLike } = useSubmit(
    `/api/like/${postId}`,
    "DELETE",
    `/post/${postId}`
  );
  // 계산

  // 액션
  const onClickButton = () => {
    const body = {};
    isLike ? submitDataUnLike(body) : submitDataLike(body);
    setIsLike((pre) => !pre);
  };
  useEffect(() => {
    const likePromise = getLike(postId);
    likePromise
      .then((data: ILike) => setIsLike(data.isLike))
      .catch((error) => alert(error));
  }, [postId]);

  return session ? (
    <div className="flex flex-col justify-center items-center">
      <IconButton
        iconName={isLike ? "heart_minus" : "heart_check"}
        onClickEvent={onClickButton}
      />
      <p className="textLabelMediumProminent text-onSurface">
        {isLike ? "좋아요 취소" : "좋아요"}
      </p>
    </div>
  ) : (
    <></>
  );
};
export default LikeButton;
