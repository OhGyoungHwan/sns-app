export default function TextFields() {
  return (
    <div className="flex flex-col justify-start items-start w-full h-14 relative rounded-tl rounded-tr">
      <div className="flex flex-col justify-start items-start self-stretch flex-grow gap-2.5 rounded border border-outline">
        <div className="flex justify-start items-start self-stretch flex-grow pl-4 py-1 rounded-tl rounded-tr">
          <div className="flex flex-col justify-center items-start flex-grow h-12 relative py-1">
            <div className="flex justify-start items-center relative">
              <p className="text-base text-left text-onSurface">...</p>
            </div>
            <div className="flex justify-start items-center absolute left-[-4px] top-[-12px] px-1 bg-surfaceContainerHigh">
              <p className="text-xs text-left text-onSurfaceVariant">
                댓글 쓰기
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center h-12 w-12 gap-2.5">
            <div className="flex justify-center items-center overflow-hidden gap-2.5 rounded-[100px]">
              <div className="flex justify-center items-center relative gap-2.5 p-2">
                <span className="text-onSurfaceVariant material-symbols-outlined">
                  check_circle
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
