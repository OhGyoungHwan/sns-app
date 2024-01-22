"use client";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import MenuListItem from "../../molecules/MenuListItem";
import TextField from "../../molecules/TextField";
import Sheet from "../../molecules/Sheet";
import { useRouter } from "next/navigation";

const PostCard: React.FC = () => {
  // 데이터
  const router = useRouter();
  const categorys = [
    { name: "게임", value: "GAME" },
    { name: "유튜브", value: "YOUTUBE" },
    { name: "축구", value: "SOCCER" },
    { name: "기타", value: "ETC" },
  ];
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("ETC");

  // 계산
  const submitData = async () => {
    try {
      const body = { title: title, content: content, category: category };
      let els = document.createElement("div");
      els.innerHTML = content;
      console.log(els.getElementsByTagName("img"));
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  // 액션
  const changeCategory = (value: string) => setCategory(value);
  const changeTitle = (value: string) => setTitle(value);
  const changeContent = (value: string) => setContent(value);
  const onClickSubmit = () => submitData();
  const onClickCancel = () => router.push("/");

  return (
    <div className="flex flex-col gap-[16px] items-center">
      <MenuListItem categorys={categorys} changeCategory={changeCategory} />
      <TextField changeString={changeTitle} />
      <Sheet
        changeContent={changeContent}
        onClickSubmit={onClickSubmit}
        onClickCancel={onClickCancel}
      />
    </div>
  );
};

export default PostCard;
