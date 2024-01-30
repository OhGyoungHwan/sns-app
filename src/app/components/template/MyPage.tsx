"use client";
import { useSession } from "next-auth/react";
import TextField from "../molecules/TextField";
import { useState } from "react";
import TextButton from "../atoms/TextButton";
import useSubmit from "@/app/hooks/useSubmit";

const MyPage: React.FC = () => {
  // 데이터
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user.name || "");
  const { submitData } = useSubmit("/api/user", "PUT", "/my");
  // 계산
  // 액션
  const changeName = (value: string) => setName(value);
  const onClickSubmit = () => {
    const body = {
      name: name,
    };
    submitData(body);
  };
  return (
    <article className="w-full max-w-[840px] flex flex-col justify-start items-center gap-4 mx-auto">
      <h1 className="textTitleMedium text-onSurface">내 정보</h1>
      <div className="w-full flex flex-row p-4">
        <TextField label="이름 변경" text={name} changeText={changeName} />
        <TextButton
          text="변경"
          color="text-onSurface"
          border
          className="h-[56px]"
          onClickEvent={onClickSubmit}
        />
      </div>
    </article>
  );
};
export default MyPage;
