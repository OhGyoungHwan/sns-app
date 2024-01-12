export default function SegmentedButton({ isCheck }: { isCheck: boolean }) {
  return (
    <div className="flex justify-center items-center w-[100px] h-12 overflow-hidden space-x-[-1px]">
      <div className="flex justify-center items-center flex-grow h-12 py-1">
        <div
          className={`flex flex-col justify-center items-center self-stretch flex-grow overflow-hidden ${
            isCheck && "bg-secondaryContainer"
          }`}
        >
          <div className="flex justify-center items-center self-stretch flex-grow relative gap-2 px-3 py-2.5">
            {isCheck && (
              <span className="text-onPrimaryContainer material-symbols-outlined">
                check
              </span>
            )}
            <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-onPrimaryContainer">
              Label
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
