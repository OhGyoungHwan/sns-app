import prisma from "@/app/lib/prisma";
import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export interface IPost {
  id: string;
  category: Category;
  title: string;
  content: string;
  published: boolean;
  videoId: string;
  authorId: string | null;
  author: {
    name: string | null;
  } | null;
  comments: {
    content: string;
    userId: string;
  }[];
}

// Read
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const posts = await prisma.post.findFirst({
    where: {
      id: params.postId,
    },
  });
  return NextResponse.json(posts);
}
