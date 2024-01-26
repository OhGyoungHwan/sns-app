import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export interface IComment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  user: {
    id: string;
    name: string | null;
  };
}

// Read
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const posts = await prisma.comment.findMany({
    where: {
      postId: params.postId,
    },
    include: {
      user: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  return NextResponse.json(posts);
}
