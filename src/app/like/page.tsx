import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import AccessDenied from "../components/template/AccessDenied";
import Cards from "../components/template/Cards";
import { IPost } from "../types/type";
import { headers } from "next/headers";

async function getLikePost() {
  const headersList = headers();
  const res = await fetch(`${process.env.BASE_URL}/api/user/like`, {
    cache: "no-store",
    method: "GET",
    headers: headersList,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function LikePage() {
  const session = await getServerSession(authOptions);
  if (session) {
    const likePosts = (await getLikePost()) as { post: IPost }[];
    const posts = likePosts.map((likePost) => likePost.post) as IPost[];
    return <Cards posts={posts} />;
  }
  return <AccessDenied />;
}
