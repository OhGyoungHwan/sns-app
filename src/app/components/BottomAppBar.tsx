export default function BottomAppBar() {
  return (
    <div className="fixed bottom-0 flex justify-between items-center w-full h-[60px] px-4 bg-surfaceBright">
      <div className="flex justify-start items-center gap-2">
        <div className="flex flex-col justify-center items-center h-12 w-12 gap-2.5">
          <div className="flex justify-center items-center overflow-hidden gap-2.5 rounded-[100px]">
            <div className="flex justify-center items-center relative gap-2.5 p-2">
              <span className="text-onSurface material-symbols-outlined">
                search
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-start overflow-hidden gap-2.5 rounded-2xl">
        <div className="flex justify-center items-center overflow-hidden rounded-2xl bg-secondaryContainer drop-shadow-lg">
          <div className="flex justify-center items-center relative p-4">
            <span className="text-onSecondaryContainer text-[24px] material-symbols-outlined">
              add_circle
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
