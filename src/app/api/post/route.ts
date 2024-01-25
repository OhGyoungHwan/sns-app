import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/prisma";
import { Category } from "@prisma/client";
import { getServerSession } from "next-auth";
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

// Create
export async function POST(req: NextRequest) {
  const { title, content, category, videoId } = await req.json();

  const session = await getServerSession(authOptions);

  const result = await prisma.post.create({
    data: {
      title: title,
      category: category,
      content: content,
      videoId: videoId,
      author: { connect: { id: session?.user.id } },
    },
  });
  return NextResponse.json(result);
}

// Read
export async function GET() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      category: true,
      title: true,
      videoId: true,
    },
    skip: 0,
    take: 10,
  });
  return NextResponse.json(posts);
}

// Update
export async function PUT(req: NextRequest) {
  const { postId, title, content, category } = await req.json();

  const session = await getServerSession(authOptions);

  if (await AuthenticationCheck(postId, session?.user.id)) {
    const result = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title,
        category: category,
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
  const { postId } = await req.json();

  const session = await getServerSession(authOptions);

  if (await AuthenticationCheck(postId, session?.user.id)) {
    const result = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return NextResponse.json(result);
  } else {
    return NextResponse.json({ error: "권한 오류" });
  }
}

const AuthenticationCheck = async (postId: string, userId?: string) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    include: {
      author: true,
    },
  });
  return post?.authorId == userId;
};
