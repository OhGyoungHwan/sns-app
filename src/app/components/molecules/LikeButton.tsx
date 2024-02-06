"use client";

import { useSession } from "next-auth/react";
import IconButton from "../atoms/IconButton";
import useSubmit from "@/app/hooks/useSubmit";
import { use, useEffect, useState } from "react";
import useLoading from "@/app/hooks/useLoading";

async function getLike(postId: number) {
  const res = await fetch(`/api/post/${postId}/like`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const LikeButton: React.FC<{ postId: number }> = ({ postId }) => {
  // 데이터
  const [isLike, setIsLike] = useState<boolean | undefined>(undefined);
  const { data: session } = useSession();
  const { setIsOnLoading } = useLoading();
  const { submitData: submitDataLike, isError: isLikeError } = useSubmit(
    `/api/like`,
    "POST",
    `/post/${postId}`
  );
  const { submitData: submitDataUnLike, isError: isUnLikeError } = useSubmit(
    `/api/like`,
    "DELETE",
    `/post/${postId}`
  );
  // 계산
  // 액션
  const onClickUnLikeButton = () => {
    submitDataUnLike({ postId: postId });
    !isLikeError && setIsLike(false);
  };
  const onClickLikeButton = () => {
    submitDataLike({ postId: postId });
    !isUnLikeError && setIsLike(true);
  };

  useEffect(() => {
    setIsOnLoading(true);
    const likePromise = getLike(postId);
    likePromise
      .then((data: { isLike: boolean }) => setIsLike(data.isLike))
      .catch((error) => alert(error));
    setIsOnLoading(false);
  }, [postId]);

  return session ? (
    <div className="flex flex-col justify-center items-center">
      {isLike !== undefined && (
        <>
          <IconButton
            iconName={isLike ? "heart_minus" : "heart_check"}
            onClickEvent={isLike ? onClickUnLikeButton : onClickLikeButton}
          />
          <p className="textLabelMediumProminent text-onSurface">
            {isLike ? "좋아요 취소" : "좋아요"}
          </p>
        </>
      )}
    </div>
  ) : (
    <></>
  );
};

export default LikeButton;
