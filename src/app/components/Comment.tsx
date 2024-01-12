export default function Comment() {
  return (
    <div className="flex flex-col justify-start items-center w-full relative bg-surfaceContainerHigh">
      <div className="flex flex-row justify-between items-start gap-4 w-full pl-4 pr-6 py-3">
        <div className="flex flex-col justify-start items-start relative">
          <div className="w-8 h-8 relative rounded-full bg-primary">
            <p className="w-8 h-8 absolute left-0 top-0 textLabelMediumProminent leading-[30px] text-center text-surface">
              오
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start flex-grow relative overflow-hidden">
          <p className="w-full textBodySmall text-left text-onSurfaceVariant">
            이번 플레이는 확실히 좀 지렸네 ㄷㄷ;;
          </p>
        </div>
      </div>
    </div>
  );
}
