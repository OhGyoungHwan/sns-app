"use client";
import { IPost } from "@/app/api/post/route";
import IconButton from "../../atoms/IconButton";
import Monogram from "../../../atoms/Monogram";
import Dialog from "../../molecules/Dialog";
import SnackBar from "../../molecules/SnackBar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

// Card헤더 부분으로 인가된 사용자로 부터 삭제, 수정이 가능하다.
const CardHeader: React.FC<{ post: IPost; TitleCategory: React.ReactNode }> = ({
  post,
  TitleCategory,
}) => {
  // 데이터
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);

  // 계산
  const submitData = async () => {
    try {
      const body = { postId: post.id };
      await fetch("/api/post", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  // 액션
  const onClickMoreVert = () => setIsOpenDialog((pre) => !pre);
  const onClickRewrite = () => router.push(`/rewrite/${post.id}`);
  const onClickDelete = () => setIsOpenSnackBar(true);
  const onClickConfirm = () => submitData();
  const onClickCancel = () => (
    setIsOpenDialog(false), setIsOpenSnackBar(false)
  );

  return (
    <div className="flex justify-start items-center self-stretch h-[72px] pl-4 pr-1 py-3">
      <div className="flex justify-start items-center flex-grow relative gap-4">
        <Monogram name={post.author?.name || "익명"} />
        {TitleCategory}
      </div>

      {/* MoreVert */}
      {session?.user.id == post.authorId && (
        <>
          <div className="flex flex-col justify-center items-center relative h-12 w-12 gap-2.5 z-10">
            <IconButton iconName="more_vert" onClickEvent={onClickMoreVert} />
            {isOpenDialog && (
              <div className="absolute bottom-0 left-0 -translate-x-full translate-y-full">
                <Dialog
                  onClickDelete={onClickDelete}
                  onClickRewrite={onClickRewrite}
                />
              </div>
            )}
          </div>
          {/* SnackBar */}
          {isOpenSnackBar && (
            <SnackBar
              SupportingText="정말 삭제 하시겠습니까?"
              onClickCancel={onClickCancel}
              onClickConfirm={onClickConfirm}
            />
          )}
        </>
      )}
    </div>
  );
};
export default CardHeader;
