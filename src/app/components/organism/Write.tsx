"use client";
import { Category } from "@prisma/client";
import { category2kor } from "@/app/lib/const";
import Select from "../molecules/Select";
import TextField from "../molecules/TextField";
import Sheet from "../molecules/Sheet";
import "react-quill/dist/quill.snow.css";
import TextButton from "../atoms/TextButton";
import useYouTubeSwiper from "@/app/hooks/useYouTubeSwiper";
import { useState } from "react";
import useSubmit from "@/app/hooks/useSubmit";
import { useRouter } from "next/navigation";

const categoryKeys = Object.keys(Category) as Array<keyof typeof Category>;
const categorys = categoryKeys.map((category) => {
  return {
    name: category2kor[category],
    value: category,
  };
});

const Write: React.FC = () => {
  // 데이터
  const router = useRouter();
  const [youTubeUrl, setYouTubeUrl] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("MUSIC");
  const [content, setContent] = useState("");
  const { makeYouTubeSwiper, addYouTubeSwiper, youTubeIds } =
    useYouTubeSwiper();
  const { submitData } = useSubmit("/api/post", "POST");

  // 계산

  // 액션
  const changeSelect = (value: string) => setCategory(value);
  const changeTitle = (value: string) => setTitle(value);
  const changeYouTube = (value: string) => setYouTubeUrl(value);
  const onClickYouTubeAdd = () => (
    addYouTubeSwiper(youTubeUrl), setYouTubeUrl("")
  );
  const changeContent = (value: string) => setContent(value);
  const onClickSubmit = () => {
    const body = {
      title: title,
      content: content,
      category: category,
      videoId: youTubeIds.reduce((pre, current) => pre + `/${current}`),
    };
    submitData(body);
  };
  const onClickCancel = () => router.push("/");

  return (
    <div className="absolute inset-0 flex flex-col gap-4 px-[16px] pt-[72px] pb-[60px]">
      <div className="w-full grid grid-cols-1 medium:grid-cols-2 gap-4">
        <Select
          categorys={categorys}
          label="카테고리"
          changeEvent={changeSelect}
        />
        <TextField label="제목" changeText={changeTitle} text={title} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <TextField
            label="YouTube추가"
            changeText={changeYouTube}
            text={youTubeUrl}
          />
          <TextButton
            text="추가"
            color="text-onSurface"
            border
            onClickEvent={onClickYouTubeAdd}
          />
        </div>
        <div className="w-full">{makeYouTubeSwiper()}</div>
      </div>
      <div className="grow flex flex-col gap-4">
        <Sheet onChangeEvent={changeContent} />
        <div className="flex flex-row gap-4 justify-center">
          <TextButton
            text="등록"
            color="text-onPrimary"
            bgColor="bg-primary"
            onClickEvent={onClickSubmit}
          />
          <TextButton
            text="취소"
            color="text-primary"
            bgColor="bg-surface"
            border
            onClickEvent={onClickCancel}
          />
        </div>
      </div>
    </div>
  );
};
export default Write;
