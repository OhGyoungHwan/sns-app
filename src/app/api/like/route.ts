import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/prisma";
import { Category } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export interface ILikePost {
  post: {
    id: string;
    category: string;
    title: string;
    videoId: string;
    author: {
      name: string;
      id: string;
    };
  };
}

// Create
export async function POST(req: NextRequest) {
  const { postId } = await req.json();

  const session = await getServerSession(authOptions);

  const result = await prisma.like.create({
    data: {
      post: { connect: { id: postId } },
      user: { connect: { id: session?.user.id } },
    },
  });
  return NextResponse.json(result);
}

// Read
export async function GET() {
  const session = await getServerSession(authOptions);

  const posts = await prisma.like.findMany({
    where: {
      userId: session?.user.id,
    },
    skip: 0,
    take: 10,
    select: {
      post: {
        select: {
          id: true,
          category: true,
          title: true,
          videoId: true,
          author: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json(posts);
}

// Delete
export async function DELETE(req: NextRequest) {
  const { likeId } = await req.json();

  const session = await getServerSession(authOptions);

  if (await AuthenticationCheck(likeId, session?.user.id)) {
    const result = await prisma.like.delete({
      where: {
        id: likeId,
      },
    });
    return NextResponse.json(result);
  } else {
    return NextResponse.json({ error: "권한 오류" });
  }
}

const AuthenticationCheck = async (likeId: string, userId?: string) => {
  const post = await prisma.like.findFirst({
    where: {
      id: likeId,
      userId: userId,
    },
  });
  return post;
};
