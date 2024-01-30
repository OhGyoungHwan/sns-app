import Monogram from "../../atoms/Monogram";
import { IComment } from "@/app/api/comment/route";
import DeleteCommentButton from "../../molecules/DeleteCommentButton";

const CommentList: React.FC<{ commentList: IComment[] }> = async ({
  commentList,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {commentList.map((comment, idx) => (
        <div
          className="flex flex-row px-1 py-1 gap-4 justify-between items-start"
          key={`${comment.id}comment`}
        >
          <Monogram name={comment.user.name || "익명"} />
          <p className="textBodyMedium text-onSurfaceVariant text-pretty grow">
            {comment.content}
          </p>
          <DeleteCommentButton
            commentId={comment.id}
            postId={comment.postId}
            userId={comment.userId}
          />
        </div>
      ))}
    </div>
  );
};
export default CommentList;
