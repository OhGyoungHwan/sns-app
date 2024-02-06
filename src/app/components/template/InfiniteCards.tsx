"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Cards from "./Cards";
import Loading from "../atoms/Loading";
import { IPost } from "@/app/types/type";

async function getPost(skip?: string) {
  const res = await fetch(`/api/post?skip=${skip}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const InfiniteCards: React.FC<{ defaultSkip: number }> = ({ defaultSkip }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isAllLoad, setIsAllLoad] = useState(false);
  const [skip, setSkip] = useState(defaultSkip + 1);
  const { ref, inView } = useInView({});
  useEffect(() => {
    if (inView) {
      getPost(String(skip))
        .then((tempPosts: IPost[]) => {
          setPosts((pre) => [...pre, ...tempPosts]);
          tempPosts.length < 10
            ? setIsAllLoad(true)
            : setSkip((pre) => pre + 1);
        })
        .catch((error) => alert(error));
    }
  }, [inView]);
  return (
    <>
      <Cards posts={posts} />
      {isAllLoad ? (
        <p className="w-full text-center text-onSurfaceVariant textLabelLargeProminent">
          마지막 컨텐츠 입니다...
        </p>
      ) : (
        <div ref={ref} className="w-full flex justify-center items-center">
          <Loading />
        </div>
      )}
    </>
  );
};
export default InfiniteCards;
