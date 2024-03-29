const IconButton: React.FC<{
  iconName: string;
  color?: string;
  onClickEvent: () => void;
}> = ({ iconName, onClickEvent, color = "text-onSurfaceVariant" }) => {
  return (
    <button
      className="flex justify-center items-center overflow-hidden gap-2.5 rounded-[100px]"
      onClick={onClickEvent}
    >
      <div className="flex justify-center items-center relative gap-2.5 p-2">
        <span className={`${color} material-symbols-outlined`}>{iconName}</span>
      </div>
    </button>
  );
};
export default IconButton;
