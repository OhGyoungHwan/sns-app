import HorizontalCard from "./components/HorizontalCard";
import SegmentedButton from "./components/SegmentedButton";
import Swiper from "./components/Swiper";

export default function Home() {
  const tempData = [...Array(5).keys()].map((i) => i);
  const tempData2 = [...Array(5).keys()].map((i) => (
    <SegmentedButton key={i} isCheck={i == 0} />
  ));
  return (
    <div className="flex flex-col gap-4">
      <Swiper SwiperSlideList={tempData2} />
      {tempData.map((i) => (
        <HorizontalCard key={i} isFold={i != 0} />
      ))}
    </div>
  );
}
