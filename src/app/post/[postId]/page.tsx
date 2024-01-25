import SSRVideoSwiper from "@/app/components/organism/SSRVideoSwiper";
import { IPost } from "../../api/post/route";
import HTMLContent from "@/app/components/molecules/HTMLContent";

async function getPost(postId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/post/${postId}`, {
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
    <div>
      {/* 제목, 카테고리, 수정항목 */}
      {/* 유튜브 Swiper */}
      <SSRVideoSwiper slideElementList={slideElementList} />
      <HTMLContent content={post.content} />
      {/* 댓글 */}
    </div>
  );
}
