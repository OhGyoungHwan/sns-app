import SSRVideoSwiper from "@/app/components/organism/SSRVideoSwiper";
import { IPost } from "../../api/post/route";
import HTMLContent from "@/app/components/molecules/HTMLContent";
import { category2iconName } from "@/app/lib/const";
import CommentLayout from "@/app/components/organism/comment/CommentLayout";
import Monogram from "@/app/components/atoms/Monogram";
import { IComment } from "@/app/api/comment/[postId]/route";
import Link from "next/link";
import LikeButton from "../molecules/LikeButton";
import MoreButton from "../molecules/MoreButton";
import DeleteButton from "../molecules/DeleteButton";

const PostDetail: React.FC<{
  post: IPost;
  commentList: IComment[];
  isAuthor: boolean;
}> = ({ post, commentList, isAuthor }) => {
  const slideElementList = post.videoId
    .split("/")
    .map((videoId, idx) => (
      <iframe
        key={`${videoId}-${idx}`}
        src={`https://www.youtube.com/embed/${videoId}?showinfo=0`}
        className={`aspect-video size-full`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      />
    ));
  const moreButtonElement = (
    <>
      <Link
        href={`/post/${post.id}/rewrite`}
        className="text-onSurface textLabelLargeProminent px-3 py-2.5"
      >
        수정
      </Link>
      <DeleteButton postId={post.id} />
    </>
  );
  // 계산
  // 액션
  return (
    <article className="flex flex-col gap-4 items-center w-full max-w-[1280px] mx-auto">
      {/* 제목, 카테고리, 수정항목 */}
      <div className="w-full flex flex-row justify-between items-center border-b border-outlineVariant pb-2">
        <div className="flex flex-row gap-4 justify-start items-center grow truncate">
          <Monogram name={post.author?.name || "익명"} />
          <span className={`text-onSurfaceVariant material-symbols-outlined`}>
            {category2iconName[post.category]}
          </span>{" "}
          <h1 className="textTitleLarge text-onSurface truncate">
            {post.title}
          </h1>
        </div>
        <div className="flex flex-row items-center text-nowrap gap-2">
          {isAuthor && <MoreButton element={moreButtonElement} />}
        </div>
      </div>
      {/* 유튜브 Swiper */}
      <SSRVideoSwiper slideElementList={slideElementList} />
      <div className="flex flex-col gap-4 w-full">
        {/* 메인 콘텐츠 */}
        <HTMLContent content={post.content} />
        {/* 좋아요 */}
        <div className="flex w-full justify-center items-center">
          <LikeButton postId={post.id} />
        </div>
        {/* 댓글 */}
        <div className="border-t border-outlineVariant">
          <CommentLayout postId={post.id} commentList={commentList} />
        </div>
      </div>
    </article>
  );
};
export default PostDetail;
