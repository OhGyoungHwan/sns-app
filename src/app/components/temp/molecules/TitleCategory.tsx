const TitleCategory: React.FC<{ title: string; category: string }> = ({
  title,
  category,
}) => {
  return (
    <div className="flex flex-col justify-start items-start flex-grow relative gap-1">
      <h4 className="self-stretch w-full textTitleMedium text-left text-onSurface">
        {title}
      </h4>
      <p className="w-full textBodyMedium text-left text-onSurface">
        {category}
      </p>
    </div>
  );
};

export default TitleCategory;
