"use client";
import dynamic from "next/dynamic";
import TextButton from "../atoms/TextButton";

const QuillWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col justify-start items-start self-stretch flex-grow w-[328px] h-[464px] overflow-hidden bg-surfaceContainer animate-pulse" />
  ),
});

const Sheet: React.FC<{
  onClickSubmit: () => void;
  onClickCancel: () => void;
  changeContent: (value: string) => void;
}> = ({ onClickSubmit, onClickCancel, changeContent }) => {
  return (
    <>
      <div className="flex justify-center items-center w-[328px] h-[464px] overflow-hidden rounded bg-surface border border-outline">
        <QuillWrapper theme="snow" onChange={changeContent} />
      </div>
      <div className="flex flex-col justify-end items-center self-stretch flex-grow-0 flex-shrink-0">
        <div className="flex justify-center items-center self-stretch gap-2 px-6 pt-4">
          <TextButton
            text="등록"
            color="onPrimary"
            bgColor="primary"
            onClickEvent={onClickSubmit}
          />
          <TextButton
            text="취소"
            color="primary"
            onClickEvent={onClickCancel}
          />
        </div>
      </div>
    </>
  );
};

export default Sheet;
