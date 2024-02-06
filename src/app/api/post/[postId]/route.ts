import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Read
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const post = await prisma.post.findFirst({
    where: {
      id: parseInt(params.postId),
    },
    select: {
      id: true,
      category: true,
      title: true,
      content: true,
      videoId: true,
      userId: true,
      like: true,
      view: true,
      user: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  await prisma.post.update({
    where: {
      id: parseInt(params.postId),
    },
    data: {
      view: { increment: 1 },
    },
  });
  return NextResponse.json(post);
}
