import { AuthenticationCheck, authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Create
export async function POST(req: NextRequest) {
  const { postId }: { postId: number } = await req.json();

  const session = await getServerSession(authOptions);

  if (session) {
    const result = await prisma.like.create({
      data: {
        id: `${postId}-${session.user.id}`,
        post: { connect: { id: postId } },
        user: { connect: { id: session?.user.id } },
      },
    });
    const increaseLike = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        like: { increment: 1 },
      },
    });
    return result && increaseLike
      ? NextResponse.json({ message: "성공" })
      : NextResponse.json({ error: "서버 오류" }, { status: 500 });
  } else {
    return NextResponse.json({ error: "로그인 오류" }, { status: 401 });
  }
}

// Delete
export async function DELETE(req: NextRequest) {
  const { postId }: { postId: number } = await req.json();

  const session = await getServerSession(authOptions);
  const authentication = await AuthenticationCheck("like", postId);

  if (authentication) {
    const result = await prisma.like.delete({
      where: {
        id: `${postId}-${session?.user.id}`,
      },
    });
    const reduceLike = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        like: { increment: -1 },
      },
    });
    return result && reduceLike
      ? NextResponse.json({ message: "성공" })
      : NextResponse.json({ error: "서버 오류" }, { status: 500 });
  } else {
    return NextResponse.json({ error: "권한 오류" }, { status: 401 });
  }
}
