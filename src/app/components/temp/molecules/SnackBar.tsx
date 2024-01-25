import TextButton from "../atoms/TextButton";

const SnackBar: React.FC<{
  SupportingText: string;
  onClickConfirm: () => void;
  onClickCancel: () => void;
}> = ({ SupportingText, onClickConfirm, onClickCancel }) => {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-start items-center w-[328px] h-[68px]  px-4 py-2.5 rounded bg-onSurface shadow-2xl">
      <p className="flex-grow w-[204px] h-10">
        <span className="flex-grow w-[204px] h-10 textTitleSmall text-left text-inverseOnSurface">
          {SupportingText}
        </span>
      </p>
      <div className="flex flex-col justify-center items-center h-12 w-12 gap-2.5">
        <TextButton
          text="확인"
          color="inverseOnSurface"
          onClickEvent={onClickConfirm}
        />
      </div>
      <div className="flex flex-col justify-center items-center h-12 w-12 gap-2.5">
        <TextButton
          text="취소"
          color="inverseOnSurface"
          onClickEvent={onClickCancel}
        />
      </div>
    </div>
  );
};
export default SnackBar;
