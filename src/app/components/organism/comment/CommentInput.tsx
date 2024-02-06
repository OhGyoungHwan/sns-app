"use client";

import { useState } from "react";
import TextField from "../../molecules/TextField";
import useSubmit from "@/app/hooks/useSubmit";
import { useRouter } from "next/navigation";
import TextButton from "../../atoms/TextButton";

const CommentInput: React.FC<{ postId: number }> = ({ postId }) => {
  // 데이터
  const router = useRouter();
  const [comment, setComment] = useState("");
  const { submitData } = useSubmit("/api/comment", "POST", `/post/${postId}`);
  // 계산
  // 액션
  const onChangeComment = (value: string) => setComment(value);
  const onClickSubmit = () => {
    const body = {
      postId: postId,
      content: comment,
    };
    submitData(body);
    router.push(`/post/${postId}`);
  };
  return (
    <div className="flex flex-row gap-1 px-1 py-1 w-full">
      <TextField label="댓글" text={comment} changeText={onChangeComment} />
      <TextButton
        color="text-onSurface"
        text="등록"
        border
        onClickEvent={onClickSubmit}
      />
    </div>
  );
};
export default CommentInput;
