const TextField: React.FC<{
  changeText: (value: string) => void;
  label?: string;
  text: string;
}> = ({ changeText, label = "제목", text }) => {
  return (
    <div className="w-full h-[56px] rounded-sm border border-outline relative">
      <div className="w-full flex justify-start items-center relative">
        <input
          placeholder="..."
          className="w-full h-[54px] textBodyLarge text-left text-onSurface bg-surface focus:outline-none pl-4"
          onChange={(e) => changeText(e.target.value)}
          value={text}
        />
      </div>
      <div className="flex justify-center items-center absolute left-[8px] top-[-8px] px-1 bg-surface">
        <p className="textLabelMediumProminent text-left text-onSurface">
          {label}
        </p>
      </div>
    </div>
  );
};
export default TextField;
