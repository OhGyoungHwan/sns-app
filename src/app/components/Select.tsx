const Option = ({ value }: { value: string }) => {
  return (
    <option
      value={value}
      className="flex flex-col justify-center items-center w-full text-onSurface textBodyLarge h-14 relative bg-[#1a1110] border-t-0 border-r-0 border-b border-l-0 border-[#a08c8a]"
    >
      <div className="flex-grow-0 flex-shrink-0 w-[328px] h-14 absolute left-0 top-0" />
      <div className="flex justify-start items-center self-stretch flex-grow gap-4 pl-4 pr-6 py-2">
        <div className="flex flex-col justify-center items-start self-stretch flex-grow relative overflow-hidden">
          <p className="self-stretch flex-grow-0 flex-shrink-0 w-72 text-base text-left text-[#f1dedc]">
            {value}
          </p>
        </div>
      </div>
    </option>
  );
};

export default function Select() {
  const tempData = ["게임", "축구", "유튜브"];
  return (
    <div className="w-full flex items-center gap-3 px-3 py-2 border-b border-outlineVariant">
      <select
        id="select"
        name="카테고리"
        className="grow bg-surface h-10 text-onSurface textBodyLarge"
      >
        <option value="카테고리" className="text-onSurface textBodyLarge">
          카테고리
        </option>
        {tempData.map((idx) => (
          <Option key={`option${idx}`} value={`${idx}`} />
        ))}
      </select>
      <label htmlFor="select">
        <span className="text-surfaceVariant material-symbols-outlined">
          chevron_right
        </span>
      </label>
    </div>
  );
}
