const TextField: React.FC<{
  changeString: (value: string) => void;
  label?: string;
}> = ({ changeString, label = "제목" }) => {
  return (
    <div className="flex flex-col justify-start items-start max-w-[328px] w-full h-14 rounded-tl rounded-tr">
      <div className="flex flex-col justify-start items-start self-stretch flex-grow gap-2.5 rounded border border-outline">
        <div className="flex justify-start items-start self-stretch flex-grow py-1 rounded-tl rounded-tr">
          <div className="flex flex-col justify-center items-start flex-grow h-12 relative py-1">
            <div className="w-full flex justify-start items-center relative">
              <input
                placeholder="..."
                className="w-full h-[48px] textBodyLarge text-left text-onSurface bg-surface focus:outline-none pl-4"
                onChange={(e) => changeString(e.target.value)}
              />
            </div>
            <div className="flex justify-start items-center absolute left-[8px] top-[-12px] px-1 bg-surface">
              <p className="textLabelMediumProminent text-left text-onSurface">
                {label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TextField;
