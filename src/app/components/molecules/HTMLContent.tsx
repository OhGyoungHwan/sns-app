import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const HTMLContent: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify(new JSDOM("<!DOCTYPE html>").window).sanitize(
          content
        ),
      }}
      className="break-words self-stretch text-wrap text-onSurfaceVariant"
    />
  );
};
export default HTMLContent;
