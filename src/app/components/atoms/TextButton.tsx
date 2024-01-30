const TextButton: React.FC<{
  text: string;
  color: string;
  bgColor?: string;
  border?: boolean;
  className?: string;
  onClickEvent: () => void;
}> = ({
  text,
  color,
  onClickEvent,
  bgColor = "surface",
  border = false,
  className = "",
}) => {
  return (
    <button
      className={`flex flex-col justify-center items-center overflow-hidden shrink-0 rounded-sm ${bgColor} ${
        border && "border border-outline"
      } ${className}`}
      onClick={onClickEvent}
    >
      <div className="flex justify-center items-center self-stretch relative gap-2 px-3 py-2.5">
        <p
          className={`textLabelLargeProminent text-center text-nowrap ${color}`}
        >
          {text}
        </p>
      </div>
    </button>
  );
};
export default TextButton;
