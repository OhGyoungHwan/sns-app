const MenuListItem: React.FC<{
  categorys: { name: string; value: string }[];
  changeCategory: (value: string) => void;
}> = ({ categorys, changeCategory }) => {
  return (
    <div className="flex items-center w-[328px] border-b border-outlineVariant relative">
      <select
        name="category"
        id="category"
        className="grow bg-surface text-onSurface px-3 py-2 h-[40px]"
        onChange={(value) => changeCategory(value.target.value)}
      >
        {categorys.map((category) => (
          <option key={category.value} value={category.value}>
            {category.name}
          </option>
        ))}
      </select>
      <span className="text-onSurfaceVariant material-symbols-outlined absolute right-0 pointer-events-none">
        expand_more
      </span>
    </div>
  );
};
export default MenuListItem;
