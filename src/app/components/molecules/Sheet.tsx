"use client";
import { quillModules } from "@/app/lib/const";
import dynamic from "next/dynamic";

const QuillWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surfaceContainer animate-pulse" />
  ),
});

const Sheet: React.FC<{
  onChangeEvent: (value: string) => void;
  content?: string;
}> = ({ onChangeEvent, content = "" }) => {
  return (
    <div className="flex flex-col w-full h-full items-center rounded-sm bg-surface">
      <QuillWrapper
        defaultValue={content}
        theme="snow"
        modules={quillModules}
        onChange={onChangeEvent}
        className="w-full"
      />
    </div>
  );
};
export default Sheet;
