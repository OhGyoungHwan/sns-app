"use client";
import { useRouter } from "next/navigation";
import FAB from "../../atoms/FAB";
import IconButton from "../../atoms/IconButton";

const BottomAppBar: React.FC = () => {
  // 데이터
  const router = useRouter();
  const iconNames = ["search"];
  // 계산

  // 액션
  const onClickButton = () => {};
  const onClickFAB = () => router.push("/create");

  return (
    <div className="fixed bottom-0 flex justify-between items-center w-full h-[60px] px-4 bg-surface border-t border-outline">
      {/* IconButtons */}
      <div className="flex justify-start items-center gap-2">
        {iconNames.map((name) => (
          <div
            key={`${name}IconButton`}
            className="flex flex-col justify-center items-center h-12 w-12 gap-2.5"
          >
            <IconButton iconName={name} onClickEvent={onClickButton} />
          </div>
        ))}
      </div>
      {/* FAB */}
      <div className="flex justify-start items-start overflow-hidden rounded-2xl">
        <FAB iconName="post_add" onClientEvent={onClickFAB} />
      </div>
    </div>
  );
};
export default BottomAppBar;
