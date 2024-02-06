import Write from "@/app/components/template/Write";
import { IPost } from "@/app/types/type";

async function getPost(postId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/post/${postId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function PostRewritePostIdPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = (await getPost(params.postId)) as IPost;
  return (
    <Write
      postId={post.id}
      isReWrite
      defaultCategory={post.category}
      defaultContent={post.content}
      defaultTitle={post.title}
      defaultYouTubeUrl={post.videoId}
    />
  );
}
