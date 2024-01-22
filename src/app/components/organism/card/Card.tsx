"use client";

import { useState } from "react";

const Card: React.FC<{
  CardHeader: React.ReactNode;
  CardBody: React.ReactNode;
}> = ({ CardHeader, CardBody }) => {
  // 데이터
  const [isOpenBody, setIsOpenBody] = useState(false);
  // 계산
  // 액션
  const onClickHeader = () => setIsOpenBody((pre) => !pre);
  return (
    <div className="w-full flex flex-col gap-[16px] border border-outlineVariant rounded-xl">
      <div className="relative">
        {CardHeader}
        <button className="absolute inset-0" onClick={onClickHeader} />
      </div>
      {isOpenBody && CardBody}
    </div>
  );
};
export default Card;
