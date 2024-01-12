"use client";
import dynamic from "next/dynamic";

const QuillWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>텍스트 에디터 불러오는 중...</p>,
});

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

const ActionButton = () => {
  return (
    <div className="flex flex-col justify-end items-center self-stretch ">
      <div className="flex justify-center items-center self-stretch  gap-2 px-6 pt-4">
        <div className="flex flex-col justify-center items-center  overflow-hidden rounded-[100px] bg-primary">
          <div className="flex justify-center items-center self-stretch  relative gap-2 px-6 py-2.5">
            <p className="textLabelLarge text-center text-onPrimary">저장</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center  overflow-hidden rounded-[100px] border border-[#a08c8a]">
          <div className="flex justify-center items-center self-stretch  relative gap-2 px-6 py-2.5">
            <p className="textLabelLarge text-center text-primary">취소</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Quill() {
  return (
    <div>
      <QuillWrapper theme="snow" formats={formats} />
      <ActionButton />
    </div>
  );
}
