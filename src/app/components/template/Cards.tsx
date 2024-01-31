import { IPost } from "@/app/api/post/route";
import Card from "../organism/Card";

const Cards: React.FC<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <article className="w-full expanded:w-[840px] flex flex-col items-center pt-4 gap-4 mx-auto">
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </article>
  );
};
export default Cards;
