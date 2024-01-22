"use client";

import { useEffect, useState } from "react";
import TextButton from "../../atoms/TextButton";
import TextField from "../../molecules/TextField";
import { IComment } from "@/app/api/comment/route";
import Comment from "../../molecules/Comment";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

async function getComment(postId: string) {
  const res = await fetch(
    `http://localhost:3000/api/comment?postId=${postId}`,
    {
      next: { revalidate: 600 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const CardBody: React.FC<{ postId: string; HTMLContent: React.ReactNode }> = ({
  postId,
  HTMLContent,
}) => {
  // 데이터
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<IComment[]>([]);
  // 계산
  const submitData = async () => {
    try {
      const body = { postId: postId, content: comment };
      await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };
  // 액션
  const onClickCommentButton = () => setIsOpenComment((pre) => !pre);
  const changeComment = (value: string) => setComment(value);
  const onClickButton = () => submitData();
  const onClickLoginButton = () => signIn("kakao");
  useEffect(() => {
    const commentPromise = getComment(postId);
    commentPromise
      .then((comments: IComment[]) => setCommentList(comments))
      .catch(() => alert("error"));
  }, []);

  return (
    <>
      <div className="flex flex-col justify-start items-start self-stretch relative gap-8 p-4">
        {HTMLContent}
        <div className="flex justify-end items-start self-stretch gap-2">
          <TextButton
            text="댓글"
            color="text-primary"
            bgColor="bg-surface"
            border
            className="px-2"
            onClickEvent={onClickCommentButton}
          />
          <TextButton
            text="취소"
            color="text-onPrimary"
            bgColor="bg-primary"
            className="px-2"
            border
            onClickEvent={onClickCommentButton}
          />
        </div>
      </div>
      {isOpenComment && (
        <div className="flex flex-col items-center pb-[16px]">
          {session?.user ? (
            <div className="w-full flex flex-row px-4">
              <TextField changeString={changeComment} label="댓글" />
              <button
                className="rounded text-onSurface border border-outline text-nowrap px-2"
                onClick={onClickButton}
              >
                등록
              </button>
            </div>
          ) : (
            <TextButton
              text="댓글 작성 로그인 필요..."
              color="text-onSurfaceVariant"
              bgColor="bg-surface"
              className="w-full"
              onClickEvent={onClickLoginButton}
            />
          )}
          {commentList.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment.content}
              name={comment.user.name || ""}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CardBody;
