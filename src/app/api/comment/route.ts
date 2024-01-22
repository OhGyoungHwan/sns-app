import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

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

// Create
export async function POST(req: NextRequest) {
  const { postId, content } = await req.json();

  const session = await getServerSession(authOptions);

  const result = await prisma.comment.create({
    data: {
      content: content,
      user: { connect: { id: session?.user.id } },
      post: { connect: { id: postId } },
    },
  });
  return NextResponse.json(result);
}

// Read
export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId");
  const comments = postId
    ? await prisma.comment.findMany({
        where: {
          postId: postId,
        },
        include: {
          user: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      })
    : [{}];
  return NextResponse.json(comments);
}

// Update
export async function PUT(req: NextRequest) {
  const { commentId, content } = await req.json();

  const session = await getServerSession(authOptions);

  if (await AuthenticationCheck(commentId, session?.user.id)) {
    const result = await prisma.post.update({
      where: {
        id: commentId,
      },
      data: {
        content: content,
      },
    });
    return NextResponse.json(result);
  } else {
    return NextResponse.json({ error: "권한 오류" });
  }
}

// Delete
export async function DELETE(req: NextRequest) {
  const { commentId } = await req.json();

  const session = await getServerSession(authOptions);

  if (await AuthenticationCheck(commentId, session?.user.id)) {
    const result = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return NextResponse.json(result);
  } else {
    return NextResponse.json({ error: "권한 오류" });
  }
}

const AuthenticationCheck = async (commentId: string, userId?: string) => {
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });
  return comment?.userId == userId;
};
