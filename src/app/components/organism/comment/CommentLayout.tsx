import { IComment } from "@/app/api/comment/[postId]/route";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const CommentLayout: React.FC<{ postId: string; commentList: IComment[] }> = ({
  postId,
  commentList,
}) => {
  // 데이터
  // 계산
  // 액션
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="textTitleLarge text-onSurface p-2">댓글</p>
      <CommentList commentList={commentList} />
      <CommentInput postId={postId} />
    </div>
  );
};
export default CommentLayout;
