import { IPost } from "./api/post/route";
import Card from "./components/organism/Card";

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
  return (
    <article className="w-full expanded:w-[840px] flex flex-col items-center gap-4 mx-auto">
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </article>
  );
}
