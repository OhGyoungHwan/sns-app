const FAB: React.FC<{ iconName: string; onClientEvent: () => void }> = ({
  iconName,
  onClientEvent,
}) => {
  return (
    <button
      onClick={onClientEvent}
      className="group flex justify-center items-center overflow-hidden rounded-2xl bg-secondaryContainer shadow-xl"
    >
      <div className="flex justify-center items-center relative p-4">
        <span className="material-symbols-outlined text-onSecondaryContainer">
          {iconName}
        </span>
        <div className="absolute inset-0 bg-onSurface opacity-0 group-hover:opacity-[0.08]" />
      </div>
    </button>
  );
};
export default FAB;
