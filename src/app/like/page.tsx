import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import AccessDenied from "../components/template/AccessDenied";
import Cards from "../components/template/Cards";
import { IPost } from "../api/post/route";

async function getLikePost() {
  const res = await fetch(`${process.env.BASE_URL}/api/like`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function LikePage() {
  const likePosts = (await getLikePost()) as { post: IPost }[];
  const posts = likePosts.map((likePost) => likePost.post) as IPost[];
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return <Cards posts={posts} />;
  }
  return <AccessDenied />;
}
