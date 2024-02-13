import Loading from "./components/atoms/Loading";

export default function MainLoading() {
  return (
    <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Loading />
    </div>
  );
}
