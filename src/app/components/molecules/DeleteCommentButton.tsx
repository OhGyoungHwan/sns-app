"use client";
import useSubmit from "@/app/hooks/useSubmit";
import IconButton from "../atoms/IconButton";
import { useSession } from "next-auth/react";

const DeleteCommentButton: React.FC<{
  commentId: string;
  postId: string;
  userId: string;
}> = ({ commentId, postId, userId }) => {
  // 데이터
  const { data: session } = useSession();
  const { submitData } = useSubmit("/api/comment", "DELETE", `/post/${postId}`);
  // 계산
  // 액션
  const onClickButton = () => {
    const body = {
      commentId: commentId,
    };
    submitData(body);
  };
  return userId == session?.user.id ? (
    <IconButton iconName="delete" onClickEvent={onClickButton} />
  ) : (
    <></>
  );
};

export default DeleteCommentButton;
