import { IPost } from "./api/post/route";
import Cards from "./components/template/Cards";
import InfiniteCards from "./components/template/InfiniteCards";

async function getPost(skip?: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/post?skip=${skip}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

type TProps = {
  params: {};
  searchParams: { [key: string]: string | undefined };
};

export default async function Home(props: TProps) {
  const skip = props.searchParams["skip"];
  const posts = (await getPost(skip)) as IPost[];
  return (
    <>
      <Cards posts={posts} />
      <InfiniteCards defaultSkip={parseInt(skip || "0")} />
    </>
  );
}
