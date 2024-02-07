import PostDetail from "@/app/components/template/PostDetail";
import { authOptions } from "@/app/lib/authOptions";
import { ICommentUser, IPost } from "@/app/types/type";
import { getServerSession } from "next-auth";

async function getPost(postId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/post/${postId}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getComments(postId: string) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/post/${postId}/comment`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function PostPostIdPage({
  params,
}: {
  params: { postId: string };
}) {
  const session = await getServerSession(authOptions);
  // 데이터
  const post = (await getPost(params.postId)) as IPost;
  const commentList = (await getComments(params.postId)) as ICommentUser[];
  return (
    <PostDetail
      post={post}
      commentList={commentList}
      isAuthor={session?.user.id == post.user?.id}
    />
  );
}
