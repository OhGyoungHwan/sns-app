"use client";
import useSubmit from "@/app/hooks/useSubmit";
import TextButton from "../atoms/TextButton";

const DeleteButton: React.FC<{ postId: string }> = ({ postId }) => {
  // 데이터
  const { submitData } = useSubmit("/api/post", "DELETE", "/");
  // 계산
  // 액션
  const onClickButton = () => {
    const body = {
      postId: postId,
    };
    submitData(body);
  };
  return (
    <TextButton
      text="삭제"
      color="text-onSurface"
      onClickEvent={onClickButton}
    />
  );
};

export default DeleteButton;
