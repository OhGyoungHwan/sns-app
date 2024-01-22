const FAB: React.FC<{ iconName: string; onClientEvent: () => void }> = ({
  iconName,
  onClientEvent,
}) => {
  return (
    <button
      onClick={onClientEvent}
      className="flex justify-center items-center overflow-hidden rounded-2xl bg-secondaryContainer shadow-xl"
    >
      <div className="flex justify-center items-center relative p-4">
        <span className="material-symbols-outlined text-onSecondaryContainer">
          {iconName}
        </span>
      </div>
    </button>
  );
};
export default FAB;
