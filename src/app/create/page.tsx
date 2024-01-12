import Quill from "../components/Quill";
import Select from "../components/Select";
import Snackbar from "../components/Snackbar";
import TextFields from "../components/TextFields";
import "react-quill/dist/quill.snow.css";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Select />
      <TextFields />
      <Quill />
      <Snackbar />
    </div>
  );
}
