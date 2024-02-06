import { AuthenticationCheck, authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/prisma";
import { Category } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Create
export async function POST(req: NextRequest) {
  const {
    title,
    content,
    category,
    videoId,
  }: { title: string; content: string; category: Category; videoId: string } =
    await req.json();

  const session = await getServerSession(authOptions);

  if (session) {
    const result = await prisma.post.create({
      data: {
        title: title,
        category: category,
        content: content,
        videoId: videoId,
        user: { connect: { id: session.user.id } },
      },
    });
    return result
      ? NextResponse.json({ message: "성공" })
      : NextResponse.json({ error: "서버 오류" }, { status: 500 });
  } else {
    return NextResponse.json({ error: "로그인 오류" }, { status: 401 });
  }
}

// Read
export async function GET(req: NextRequest) {
  const { skip, category, sort, order } = {
    skip: parseInt(req.nextUrl.searchParams.get("skip") || "0") || 0,
    category: req.nextUrl.searchParams.get("category") as Category | null,
    sort: req.nextUrl.searchParams.get("sort") as "id" | "like" | null,
    order: req.nextUrl.searchParams.get("order") as "asc" | "desc" | null,
  };
  const posts = await prisma.post.findMany({
    where: {
      category: category || undefined,
    },
    select: {
      id: true,
      category: true,
      title: true,
      videoId: true,
      like: true,
      view: true,
      user: {
        select: {
          name: true,
          id: true,
        },
      },
    },
    orderBy: {
      [sort || "id"]: order || "desc",
    },
    skip: skip * 10,
    take: 10,
  });
  return NextResponse.json(posts);
}

// Update
export async function PUT(req: NextRequest) {
  const {
    postId,
    title,
    content,
    category,
    videoId,
  }: {
    postId: number;
    title: string;
    content: string;
    category: Category;
    videoId: string;
  } = await req.json();

  const authentication = await AuthenticationCheck("post", postId);

  if (authentication) {
    const result = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title,
        category: category,
        content: content,
        videoId: videoId,
      },
    });
    return result
      ? NextResponse.json({ message: "성공" })
      : NextResponse.json({ error: "서버 오류" }, { status: 500 });
  } else {
    return NextResponse.json({ error: "권한 오류" }, { status: 401 });
  }
}

// Delete
export async function DELETE(req: NextRequest) {
  const { postId }: { postId: number } = await req.json();

  const authentication = await AuthenticationCheck("post", postId);

  if (authentication) {
    const result = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return result
      ? NextResponse.json({ message: "성공" })
      : NextResponse.json({ error: "서버 오류" }, { status: 500 });
  } else {
    return NextResponse.json({ error: "권한 오류" }, { status: 401 });
  }
}
