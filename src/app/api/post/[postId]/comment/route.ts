import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Read
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: parseInt(params.postId),
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
  return NextResponse.json(comments);
}
