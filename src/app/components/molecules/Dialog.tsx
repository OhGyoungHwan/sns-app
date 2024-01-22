import TextButton from "../atoms/TextButton";

const Dialog: React.FC<{
  onClickRewrite: () => void;
  onClickDelete: () => void;
}> = ({ onClickRewrite, onClickDelete }) => {
  return (
    <div className="flex flex-col justify-start items-end overflow-hidden rounded-l-[28px] rounded-br-[28px] bg-surfaceContainerHigh">
      <div className="flex flex-col justify-start items-end overflow-hidden">
        <div className="flex justify-start items-center overflow-hidden gap-2 p-4">
          <TextButton
            text="수정 하기"
            color="primary"
            bgColor="surfaceContainerHigh"
            onClickEvent={onClickRewrite}
          />
          <TextButton
            text="삭제 하기"
            color="primary"
            bgColor="surfaceContainerHigh"
            onClickEvent={onClickDelete}
          />
        </div>
      </div>
    </div>
  );
};
export default Dialog;
