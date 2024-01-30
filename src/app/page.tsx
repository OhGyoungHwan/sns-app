import { IPost } from "./api/post/route";
import Cards from "./components/template/Cards";

async function getPost() {
  const res = await fetch(`${process.env.BASE_URL}/api/post`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const posts = (await getPost()) as IPost[];
  return <Cards posts={posts} />;
}
