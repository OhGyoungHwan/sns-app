export default function TopAppBar() {
  return (
    <div className="flex justify-start items-center w-full h-14 relative gap-1.5 px-1 py-2 bg-surfaceBright">
      <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-12 h-12 gap-2.5" />
      <p className="flex-grow w-full textTitleLarge text-center text-onSurface">
        동해 SNS
      </p>
      <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-12 h-12 gap-2.5" />
    </div>
  );
}
