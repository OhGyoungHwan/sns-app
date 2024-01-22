import { IPost } from "./api/post/route";
import HTMLContent from "./components/molecules/HTMLContent";
import TitleCategory from "./components/molecules/TitleCategory";
import Card from "./components/organism/card/Card";
import CardBody from "./components/organism/card/CardBody";
import CardHeader from "./components/organism/card/CardHeader";

async function getPost() {
  const res = await fetch("http://localhost:3000/api/post", {
    next: { revalidate: 600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const posts = (await getPost()) as IPost[];
  return (
    <div className="flex flex-col items-center gap-4 justify-items-stretch">
      {posts.map((post) => (
        <Card
          key={post.id}
          CardHeader={
            <CardHeader
              post={post}
              TitleCategory={
                <TitleCategory title={post.title} category={post.category} />
              }
            />
          }
          CardBody={
            <CardBody
              postId={post.id}
              HTMLContent={<HTMLContent content={post.content} />}
            />
          }
        />
      ))}
    </div>
  );
}
