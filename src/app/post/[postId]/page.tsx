import SSRVideoSwiper from "@/app/components/organism/SSRVideoSwiper";
import { IPost } from "../../api/post/route";
import HTMLContent from "@/app/components/molecules/HTMLContent";
import { category2iconName } from "@/app/lib/const";
import CommentLayout from "@/app/components/organism/comment/CommentLayout";
import Monogram from "@/app/components/atoms/Monogram";
import { IComment } from "@/app/api/comment/[postId]/route";

async function getPost(postId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/post/${postId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getComments(postId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/comment/${postId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function PostDetail({
  params,
}: {
  params: { postId: string };
}) {
  // 데이터
  const post = (await getPost(params.postId)) as IPost;
  const commentList = (await getComments(params.postId)) as IComment[];
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
  // 계산
  // 액션
  return (
    <article className="flex flex-col gap-4 items-center w-max mx-auto">
      <div className="w-full">
        {/* 제목, 카테고리, 수정항목 */}
        <div className="flex flex-row gap-4 justify-start items-center border-b border-outlineVariant pb-2">
          <Monogram name={post.author?.name || "익명"} />
          <span className={`text-onSurfaceVariant material-symbols-outlined`}>
            {category2iconName[post.category]}
          </span>{" "}
          <h1 className="textTitleLarge text-onSurface">{post.title}</h1>
        </div>
      </div>
      {/* 유튜브 Swiper */}
      <SSRVideoSwiper slideElementList={slideElementList} />
      <div className="flex flex-col gap-4 w-full">
        {/* 메인 콘텐츠 */}
        <HTMLContent content={post.content} />
        {/* 댓글 */}
        <div className="border-t border-outlineVariant">
          <CommentLayout postId={post.id} commentList={commentList} />
        </div>
      </div>
    </article>
  );
}
