import Monogram from "../atoms/Monogram";

const Comment: React.FC<{ name: string; comment: string }> = ({
  name,
  comment,
}) => {
  return (
    <div className="w-full flex flex-row px-[16px] py-[12px] gap-[16px]">
      <Monogram name={name} />
      <p className="text-onSurfaceVariant textBodyMedium text-wrap">
        {comment}
      </p>
    </div>
  );
};
export default Comment;
