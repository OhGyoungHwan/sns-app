import stc from "string-to-color";

const Monogram: React.FC<{ name: string }> = ({ name }) => {
  const bgColor = stc(name);

  return (
    <div
      className="w-[40px] h-[40px] relative overflow-hidden rounded-full"
      style={{ backgroundColor: bgColor }}
    >
      <p className="w-10 h-10 absolute left-0 top-0 leading-[38px] textTitleMedium text-center text-surface">
        {name[0]}
      </p>
    </div>
  );
};
export default Monogram;
