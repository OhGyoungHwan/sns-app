const Select: React.FC<{
  categorys: { name: string; value: string }[];
  label: string;
  value: string;
  changeEvent: (value: string) => void;
}> = ({ categorys, label, value, changeEvent }) => {
  return (
    <div className="w-full rounded-sm border border-outline relative">
      <select
        name="category"
        id="category"
        className="w-full bg-surface textBodyLarge text-onSurface px-3 py-2 h-[56px] focus:outline-none"
        onChange={(value) => changeEvent(value.target.value)}
        value={value}
      >
        {categorys.map((category) => (
          <option key={category.value} value={category.value}>
            {category.name}
          </option>
        ))}
      </select>
      <span className="text-onSurfaceVariant material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
        expand_more
      </span>
      <div className="flex justify-center items-center absolute left-[8px] top-[-8px] px-1 bg-surface">
        <p className="textLabelMediumProminent text-left text-onSurface">
          {label}
        </p>
      </div>
    </div>
  );
};
export default Select;
