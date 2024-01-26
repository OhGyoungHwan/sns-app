const Loading: React.FC = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span className="textDisplayLarge animate-spin text-primary material-symbols-outlined">
        progress_activity
      </span>
    </div>
  );
};
export default Loading;
