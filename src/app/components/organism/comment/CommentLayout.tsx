import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { authOptions } from "@/app/lib/authOptions";
import { getServerSession } from "next-auth";
import LoginBar from "../../molecules/LoginBar";
import { ICommentUser } from "@/app/types/type";

const CommentLayout: React.FC<{
  postId: number;
  commentList: ICommentUser[];
}> = async ({ postId, commentList }) => {
  // 데이터
  const session = await getServerSession(authOptions);
  // 계산
  // 액션
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="textTitleLarge text-onSurface p-2">댓글</p>
      <CommentList commentList={commentList} />
      {session ? (
        <CommentInput postId={postId} />
      ) : (
        <LoginBar text="댓글 작성 로그인 필요" />
      )}
    </div>
  );
};
export default CommentLayout;
