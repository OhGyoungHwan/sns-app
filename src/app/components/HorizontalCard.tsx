import Comment from "./Comment";
import TextFields from "./TextFields";

export default function HorizontalCard({ isFold }: { isFold: boolean }) {
  return (
    <div className="flex flex-col justify-start items-start w-full rounded-xl border bg-surfaceContainerHighest border-outlineVariant overflow-hidden">
      <div className="flex justify-start items-start w-full h-20 relative">
        <div className="self-stretch flex-grow relative overflow-hidden">
          <div className="flex justify-start items-center w-[328px] h-20 absolute left-0 top-0">
            <div className="flex justify-start items-center flex-grow relative gap-4 p-4">
              <div className="w-10 h-10 relative rounded-full bg-primary">
                <p className="w-10 h-10 absolute left-0 top-0 textLabelLargeProminent leading-[38px] text-center text-surface">
                  오
                </p>
              </div>
              <div className="flex flex-col justify-start items-start flex-grow relative gap-1">
                <p className="self-stretch w-40 textBodyLarge text-left text-onSurface">
                  오늘 한 슈퍼 플레이!
                </p>
                <p className="w-full text-sm text-left text-onSurface">
                  <span className="material-symbols-outlined">
                    sports_esports
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isFold && (
        <div className="w-full flex flex-col justify-start items-center gap-2">
          <div className="flex flex-col justify-start items-center w-full">
            <div className="self-stretch flex-grow relative">
              <img src="media.png" className="w-full h-[204px] object-cover" />
            </div>
            <div className="flex flex-col justify-start items-start self-stretch  relative gap-8 p-4">
              <p className="self-stretch  w-[296px] text-sm text-left text-onSurfaceVariant">
                오늘한 슈퍼플레이 와우 어썸!
              </p>
              <div className="flex justify-end items-start self-stretch  gap-2">
                <div className="flex flex-col justify-center items-center  overflow-hidden rounded-[100px] border border-outline">
                  <div className="flex justify-center items-center self-stretch  relative gap-2 px-6 py-2.5">
                    <p className=" text-sm font-medium text-center text-primary">
                      댓글
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center  overflow-hidden rounded-[100px] bg-primary">
                  <div className="flex justify-center items-center self-stretch  relative gap-2 px-6 py-2.5">
                    <p className=" text-sm font-medium text-center text-onPrimary">
                      닫기
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-center gap-4 bg-surfaceContainerHigh">
            <TextFields />
            <Comment />
          </div>
        </div>
      )}
    </div>
  );
}
